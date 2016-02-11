// # Blue leaf pickups
function genBlueleaves() {
  game.blueleaves = game.add.group();
  game.blueleaves.enableBody = true;
  
  // generate leaves
  //var blueLeafTotal = vars.worldSize * .01;
  var blueLeafTotal = 9;
  console.log('blue leaves: '+blueLeafTotal);
  
  for (var i=0; i<blueLeafTotal; i++) {
    var y = game.rnd.integerInRange(0, game.height-vars.platformHeight);
    var leaf = new Blueleaf(game, game.rnd.integerInRange(0, vars.worldSize), y);
    game.blueleaves.add(leaf);
  }
}

Blueleaf = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "blueleaf");
  this.anchor.setTo(0.5,1);
  this.pickedup = false;
  
  // animations
  this.tween = game.add.tween(this).to({
    alpha: 0,
    y: (this.y - 400),
  }, 1000, Phaser.Easing.Cubic.Out);
};

Blueleaf.prototype = Object.create(Phaser.Sprite.prototype);
Blueleaf.prototype.constructor = Blueleaf;
Blueleaf.prototype.update = function() {
  resetMove(this);
};

function passBlueleaf(leafy, leaf) {
  if (!leaf.pickedup) {
    //console.log('pass blue leaf');
    leaf.pickedup=true;
    game.leafy.blueLeafCount += 1;
    game.sfxding.play();
    // [todo] play test this value
    //console.log(leafy.body.gravity.y);
    if (leafy.body.gravity.y > 300) {
      leafy.body.gravity.y -= 20;
    }
    game.sfxding._sound.playbackRate.value = 0.6;
    leaf.tween.start();
  }
}

function resetLeaf(item) {
  if ( (game.camera.x - (item.x+item.width)) > game.width * 1.1 ) {
    //console.log('resetMove() ' + item.key);
    //console.log('--move--');
    item.alpha = 1;
    item.pickedup = false;
    item.y = game.height - vars.platformHeight;
    item.x = game.camera.x + Math.floor(Math.random()*(game.width * 2.5)+(game.width * 1.5));
  }
}


// # Flowers
function genFlowers() {
  game.flowers = game.add.group();
  game.flowers.enableBody = true;
  //var fcount = Math.ceil(vars.worldSize * 0.005);
  var fcount = 2;
  console.log('flowers: '+fcount);
  for (x=0; x<fcount; x++) {
   var flower = new Flower(game, game.rnd.integerInRange(0, vars.worldSize), game.height-vars.platformHeight);
   game.flowers.add(flower);
   //console.log('flower created at x:'+flower.x);
  }
}

Flower = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "flower");
  this.anchor.setTo(0.5,1);
  this.scale.setTo(0.5);
  this.pickedup = false;
  // animations
  this.tween = game.add.tween(this).to({
    alpha: 0,
    y: (this.y - 400),
  }, 1000, Phaser.Easing.Cubic.Out);
  // this.tween.onComplete.add(function() {
  //   this.kill();
  // });
};

Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.prototype.constructor = Flower;
Flower.prototype.update = function() {
  // [question] how to refactor this?
  resetMove(this);
};

function passFlower(leafy, flower) {
  if (!flower.pickedup) {
    game.leafy.flowers += 1;
    flower.pickedup = true;
    game.sfxding.play();
    game.sfxding._sound.playbackRate.value = 0.3;
    flower.tween.start();
  }
}