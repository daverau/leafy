// Leafy setup
function playerMove(leafy) {

  if (cursors.left.isDown) {

    leafy.body.velocity.x = (leafy.playerSpeed * -1); // [todo] speed boost variable
    if (leafy.facing != 'left') {
      leafy.facing = 'left';
      leafy.scale.x = -1; //flipped
    }

  } else if (cursors.right.isDown) {

    leafy.body.velocity.x = leafy.playerSpeed;
    if (leafy.facing != 'right') {
      leafy.scale.x = 1; //default direction
      leafy.facing = 'right';
    }

  } else if (leafy.facing != 'idle') {
    
    leafy.animations.play('turn');
    if (leafy.facing == 'left') {
      leafy.frame = 0;
    } else {
      leafy.frame = 5;
    }
    leafy.facing = 'idle';
  }

  // walk when moving left or right (correctly continues playing)
  if (cursors.left.isDown || cursors.right.isDown && (leafy.body.onFloor() || leafy.body.touching.down)) {
    leafy.animations.play('walk');
  }

  // walk when moving left or right (correctly continues playing)
  if (plantButton.isDown) {
    plantTree(leafy);
  }

  // player jump
  if (jumpButton.isDown && (leafy.body.onFloor() || leafy.body.touching.down)) {
      leafy.animations.play('jump');
      leafy.body.velocity.y = leafy.jumpHeight;
  }

}


function plantTree(leafy) {
  if (!leafy.planting) {
    leafy.planting = true;
    console.log('plant tree');

    // ## dynamic drawn "trees" as rectangles
    var r = randTree();
    var t = game.playerTrees.create(leafy.x, game.height-(r.height+58), 'tree');
    t.scale.setTo(.5);
    t.alpha = .9;
    t.height = r.height;
    t.width = r.width;
    t.evolve = r.img;
    t.walkedPassed = false;

    console.log('w:'+t.width);
    console.log('h:'+t.height);

    //block = game.playerTrees.create(leafy.x, 0, 'tree9');
    //block.y = game.world.height - (block.height + 58); // magic number based on ~ground.height
    
    //block.alpha = .9;

    //block.body.immovable = true;
    //block.body.collideWorldBounds = true;
    //block.body.velocity.x = 400;

  }
}

function respawn(leafy) {
  //console.log('respawn');
  leafy.body.position.x = vars.worldSize/2;
  leafy.body.position.y = -100;
  leafy.body.velocity.x = 0;
  leafy.body.velocity.y = 0;
  leafy.playerSpeed = 150 * vars.ratio;
  leafy.revive();
}


function passBlueleaf(leafy, leaf) {
  if (!leaf.pickedup) {
    //console.log('pass blue leaf');
    leaf.pickedup=true;
    game.blueLeafCount += 1;
    game.sfxding.play();
    game.blueLeafText.text = game.blueLeafCount;
    leaf.tween.start();
  }
  //game.sfxding._sound.playbackRate.value = Math.random()*1.2+.9;
}

function passTree(leaf, tree) {
  if (!tree.walkedPassed) {
    console.log(tree.key+ ' says hi!');
    console.log(tree);
    tree.walkedPassed = true;
  }
  //tree.tint = '0xcccccc'
  //vars.playerSpeed += (vars.playerSpeed * .01);
  //tree.alpha = Math.random()*.9+.1;
}
