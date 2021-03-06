// # Blue acorn pickups

function genCoins() {
  game.coins = game.add.group();
  game.coins.enableBody = true;
  for (var i = 0; i < vars.coinTotal; i++) {
    var coin = new Blueleaf(game, -100, game.height - vars.platformHeight);
    game.coins.add(coin);
  }
}

Blueleaf = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "blueleaf");
  this.anchor.setTo(0.5, 1);
  this.pickedup = false;
  this.enableBody = true;
  game.physics.arcade.enable(this);
  this.body.velocity.x = vars.gameSpeed;
  this.angle = 5;

  // animations
  this.tween = game.add.tween(this).to({
    alpha: 0,
    x: (game.width - 100),
    y: (100),
  }, 1000, Phaser.Easing.Cubic.Out);
  tweenRotation(this);
};

// nice resuable tween function
// from http://www.html5gamedevs.com/topic/17632-rotate-back-and-forth-using-tween/
function tweenRotation(object) {
  var randomDelay = game.rnd.between(0, 900);
  var amountRotation = 5;
  object.angle = amountRotation * -1;
  object.anchor.set(.5);
  var move = game.add.tween(object).to({
    angle: amountRotation,
  }, 800, Phaser.Easing.Quadratic.InOut, true, randomDelay, -1, true);
}

Blueleaf.prototype = Object.create(Phaser.Sprite.prototype);
Blueleaf.prototype.constructor = Blueleaf;
// Blueleaf.prototype.update = function() {
//resetLeaf(this);
// moved to platforms.js blue ring stuff

// [todo] magnet so coins move toward leafy when he's close
// if ( game.physics.arcade.distanceBetween(game.leafy, this) < 100 ) {
//   game.physics.arcade.moveToObject( this, game.leafy, 200);
// }

// };

function genBlueRings() {
  game.bluerings = game.add.group();
  game.bluerings.enableBody = true;

  for (var i = 0; i < vars.blueRingTotal; i++) {
    var bluering = game.add.group();
    bluering.enableBody = true;

    // manual placement of 5 leaves to form a ring
    var leaf = new Blueleaf(game, 0, 0);
    bluering.add(leaf);

    leaf = new Blueleaf(game, 70, 20);
    bluering.add(leaf);

    leaf = new Blueleaf(game, -70, 20);
    bluering.add(leaf);

    leaf = new Blueleaf(game, 66 * 2, 30 * 2);
    bluering.add(leaf);

    leaf = new Blueleaf(game, -66 * 2, 30 * 2);
    bluering.add(leaf);

    bluering.y = game.height - 280;
    bluering.x = -500;

    game.bluerings.add(bluering);
  }
}

function passBlueleaf(leafy, leaf) {
  if (!leaf.pickedup) {
    //console.log('pass blue leaf');
    leaf.pickedup = true;
    leafy.blueLeafCount = Number(leafy.blueLeafCount) + 1;
    game.sfxding.play();
    game.blueLeafText.setText(game.leafy.blueLeafCount);

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
}

// # Flowers
function genFlowers() {
  game.flowers = game.add.group();
  game.flowers.enableBody = true;
  //console.log('flowers: '+fcount);
  for (x = 0; x < vars.flowerCount; x++) {
    var worldx = Math.floor(Math.random() * (game.width * 4) + (game.width * 2.5));
    var flower = new Flower(game, worldx, game.height - vars.platformHeight);
    game.flowers.add(flower);
    //console.log('flower created at x:'+flower.x);
  }
}

Flower = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "flower");
  this.anchor.setTo(0.5, 1);
  this.scale.setTo(0.5);
  game.physics.arcade.enable(this);
  this.body.velocity.x = vars.gameSpeed;
  this.pickedup = false;

  // animations
  this.tween = game.add.tween(this).to({
    alpha: 0,
    x: (game.width - 200),
    y: (100),
  }, 1000, Phaser.Easing.Cubic.Out);
};

Flower.prototype = Object.create(Phaser.Sprite.prototype);
Flower.prototype.constructor = Flower;
Flower.prototype.update = function() {
  if (offCamera(this)) {
    //console.log('move a flower...');
    resetMove(
      this,
      game.leafy.x + Math.floor(Math.random() * (game.width * 9) + (game.width * 3.5)));
  }
};

function passFlower(leafy, flower) {
  if (!flower.pickedup) {
    leafy.flowers = Number(leafy.flowers) + 1;
    flower.pickedup = true;
    game.sfxding.play();
    game.sfxding._sound.playbackRate.value = 0.3;
    flower.tween.start();
    game.flowersText.setText(game.leafy.flowers); // update UI
  }
}
