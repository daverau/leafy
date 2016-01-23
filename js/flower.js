// # Blue leaf pickups
function genBlueleaves() {
  game.blueleaves = game.add.group();
  game.blueleaves.enableBody = true;
  
  // generate leaves
  // var blueLeafTotal = vars.worldSize * .01;
  var blueLeafTotal = 20;
  console.log('blue leaves: '+blueLeafTotal);
  
  for (var i=0; i<blueLeafTotal; i++) {
    var leaf = new Blueleaf(game, game.rnd.integerInRange(0, vars.worldSize), game.height-vars.gapHeight);
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
  // this.tween.onComplete.add(function() {
  //   this.kill();
  // });
};

Blueleaf.prototype = Object.create(Phaser.Sprite.prototype);
Blueleaf.prototype.constructor = Blueleaf;
Blueleaf.prototype.update = function() {
};

function passBlueleaf(leafy, leaf) {
  if (!leaf.pickedup) {
    //console.log('pass blue leaf');
    leaf.pickedup=true;
    game.leafy.blueLeafCount += 1;
    game.sfxding.play();
    game.sfxding._sound.playbackRate.value = .6;
    leaf.tween.start();
  }
}


// # Flowers
function genFlowers() {
  game.flowers = game.add.group();
  game.flowers.enableBody = true;
  var fcount = Math.ceil(vars.worldSize * .005);
  console.log('flowers: '+fcount);
  for (x=0; x<fcount; x++) {
   var flower = new Flower(game, game.rnd.integerInRange(0, vars.worldSize), game.height-vars.gapHeight);
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
};

function passFlower(leafy, flower) {
  if (!flower.pickedup) {
    game.leafy.flowers += 1;
    flower.pickedup = true;
    game.sfxding.play();
    game.sfxding._sound.playbackRate.value = .3;
    flower.tween.start();
  }
}