// Leafy setup
function playerMove(leafy) {

  if (cursors.left.isDown || (game.input.pointer1.x < vars.worldSize/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
    leafy.body.velocity.x = (leafy.playerSpeed * -1); // [todo] speed boost variable
    if (leafy.facing != 'left') {
      leafy.facing = 'left';
      leafy.scale.x = -1; //flipped
    }

  } else if (cursors.right.isDown || (game.input.pointer1.x > vars.worldSize/2 && game.input.pointer1.isDown) ) {

    leafy.animations.play('walk');
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
      console.log('jump: '+leafy.jumpHeight);
      leafy.body.velocity.y = leafy.jumpHeight;
  }

}


function plantTree(leafy) {
  if (game.time.now > vars.plantDelay) {
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

    game.physics.arcade.enable(t);
    t.enableBody = true;
    t.body.moves = false;
    t.body.immovable = true;

    console.log('w:'+t.width);
    console.log('h:'+t.height);

    vars.plantDelay = game.time.now + 400;


    //var gap = new Gap();
    //game.gaps.add(gap);

    //block = game.playerTrees.create(leafy.x, 0, 'tree9');
    //block.y = game.world.height - (block.height + 58); // magic number based on ~ground.height
    
    //block.body.immovable = true;

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
    game.leafy.blueLeafCount += 1;
    game.sfxding.play();
    leaf.tween.start();
    console.log('jump height: '+ leafy.jumpHeight );
    //leafy.jumpHeight += leafy.jumpHeight*.1;
    leafy.body.gravity.y -= 20;
  }
  //game.sfxding._sound.playbackRate.value = Math.random()*1.2+.9;
}

function passTree(leaf, tree) {
  if (!tree.walkedPassed) {
    //console.log(tree.key+ ' says hi!');
    //console.log(tree);
    tree.walkedPassed = true;
  }
  //tree.tint = '0xcccccc'
  //vars.playerSpeed += (vars.playerSpeed * .01);
  //tree.alpha = Math.random()*.9+.1;
}
