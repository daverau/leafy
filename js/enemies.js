// Enemies

Enemy = function (game, x, y, direction, speed) {
  Phaser.Sprite.call(this, game, x, y, "bee");
  this.anchor.setTo(0.5,1);
  this.scale.setTo(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.xSpeed = direction*speed*-1;

  // animations
  this.animations.add('fly', [0,1,2,3,4], 30, true);
  this.animations.play('fly');
  this.startX = x;
};
  
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
  this.body.velocity.x = this.xSpeed;
  moveEnemy(this);
};

function moveEnemy(enemy){
  if (enemy.xSpeed<0 && ((enemy.startX - enemy.body.position.x) > 600) || enemy.xSpeed>0 && ((enemy.startX - enemy.body.position.x) < -600)) {
    enemy.xSpeed*=-1;
    enemy.scale.x*=-1;
  }
}