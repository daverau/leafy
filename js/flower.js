// # Blue leaf pickups
function genBlueleaves() {
  game.blueleaves = game.add.group();
  game.blueleaves.enableBody = true;
  
  // generate leaves
  //var blueLeafTotal = vars.worldSize * .01;
  var blueLeafTotal = 9;
  console.log('blue leaves: '+blueLeafTotal);
  
  for (var i=0; i<blueLeafTotal; i++) {
    var x = game.rnd.integerInRange(0, vars.worldSize);
    var y = game.rnd.integerInRange(0, game.height-vars.platformHeight);
    var leaf = new Blueleaf(game, x, y);
    game.blueleaves.add(leaf);
  }
}

Blueleaf = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "blueleaf");
  this.anchor.setTo(0.5,1);
  this.pickedup = false;
  this.pos = {'x': x, 'y': y};

  // animations
  this.tween = game.add.tween(this).to({
    alpha: 0,
    y: (this.y - 400),
  }, 1000, Phaser.Easing.Cubic.Out);
};

Blueleaf.prototype = Object.create(Phaser.Sprite.prototype);
Blueleaf.prototype.constructor = Blueleaf;
Blueleaf.prototype.update = function() {
  //resetLeaf(this);
  // moved to platforms.js blue ring stuff
};

function genBlueRings() {
  game.bluerings = game.add.group();
  game.bluerings.enableBody = true;

  var blueRingTotal = 5;
  for (var i=0; i<blueRingTotal; i++) {
    var x = game.rnd.integerInRange(0, vars.worldSize);
    var bluering = game.add.group();
    bluering.enableBody = true;

    // 5 leaves
    var leaf = new Blueleaf(game, 0, 0);
    bluering.add(leaf);

    leaf = new Blueleaf(game, 70, 20);
    bluering.add(leaf);
    leaf = new Blueleaf(game, -70, 20);
    bluering.add(leaf);
    leaf = new Blueleaf(game, 66*2, 30*2);
    bluering.add(leaf);
    leaf = new Blueleaf(game, -66*2, 30*2);
    bluering.add(leaf);

    bluering.y = game.height - 280;
    bluering.x = -2000;

    game.bluerings.add(bluering);
  }
}

function passBlueleaf(leafy, leaf) {
  if (!leaf.pickedup) {
    //console.log('pass blue leaf');
    leaf.pickedup = true;
    leafy.blueLeafCount = Number(leafy.blueLeafCount) + 1;
    game.sfxding.play();

    // [todo] upgrade/timer boost based on pickups
    // if (leafy.body.gravity.y > 300) {
    //   leafy.body.gravity.y -= 20;
    // }
    game.sfxding._sound.playbackRate.value = 0.6;
    leaf.tween.start();
  }
}

function resetLeaf(item) {
  //console.log('resetMove() ' + item.key);
  item.alpha = 1;
  item.pickedup = false;
  item.y = item.pos.y;
}

// # Flowers
function genFlowers() {
  game.flowers = game.add.group();
  game.flowers.enableBody = true;
  var fcount = 1;
  console.log('flowers: '+fcount);
  for (x=0; x<fcount; x++) {
    var worldx = game.leafy.x + Math.floor(Math.random()*(game.width * 4)+(game.width * 2.5));
    var flower = new Flower(game, worldx, game.height-vars.platformHeight);
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
  if ( offCamera(this) ) {
    var worldx = game.leafy.x + Math.floor(Math.random()*(game.width * 9)+(game.width * 3.5));
    resetMove(this, worldx);
  }
};

function passFlower(leafy, flower) {
  if (!flower.pickedup) {
    leafy.flowers = Number(leafy.flowers) + 1;
    flower.pickedup = true;
    game.sfxding.play();
    game.sfxding._sound.playbackRate.value = 0.3;
    flower.tween.start();
  }
}