// # Clouds

function resetCloud(cloud) {
  // position
  cloud.body.x = game.width + cloud.width;
  cloud.body.y = game.rnd.between(20, 200);
  cloud.scale.setTo('.' + game.rnd.between(15,45));
  cloud.alpha = '.' + game.rnd.between(20,60);

  if (game.state.current === 'Win') {
    cloud.body.y = game.rnd.between(20, game.height);
    cloud.scale.setTo('.' + game.rnd.between(15,55));
    cloud.alpha = '.' + game.rnd.between(20,60);
  }

  // speed
  cloud.body.velocity.x = game.rnd.between(Math.ceil(vars.gameSpeed / 9), Math.ceil(vars.gameSpeed / 4));

}

Cloud = function (game, x, y) {
  //console.log('+ cloud');
  Phaser.Sprite.call(this, game, x, y, 'cloud');
  this.anchor.setTo(0.5,1);
  game.physics.arcade.enable(this);
  resetCloud(this);
};

Cloud.prototype = Object.create(Phaser.Sprite.prototype);
Cloud.prototype.constructor = Cloud;
Cloud.prototype.update = function() {
  if ( offCamera(this) ) {
    resetCloud(this);
  }
};

function genClouds() {
  //console.log('clouds: ' + vars.cloudCount);
  game.clouds = game.add.group();
  game.clouds.enableBody = true;
  for (var i=0; i<vars.cloudCount; i++) {
    var cloud = new Cloud(game, game.rnd.between(0, game.width), game.rnd.between(20, 200));
    game.clouds.add(cloud);
  }
}
