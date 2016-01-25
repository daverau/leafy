// # Moon
function drawMoon() {
  
  // draw the shape
  var bmd = game.add.bitmapData(512,512);
  bmd.ctx.beginPath();
  bmd.ctx.arc(bmd.width / 2, bmd.height / 2, 256, 0, 2 * Math.PI, true);
  bmd.ctx.fillStyle = '#ffffff';
  bmd.ctx.fill();

  // create the sprite
  game.moon = game.add.sprite(500, 200, bmd);
  game.moon.anchor.setTo(0.5);
  game.moon.fixedToCamera = true;

  game.moon.deathTween = game.add.tween(game.moon).to({
    alpha: 0,
    y: 0
  }, 500, Phaser.Easing.Cubic.Out);

}

// # Rain particle emitter
function genRain() {
  game.emitter = game.add.emitter(game.width/2, 0, 500);
  game.emitter.fixedToCamera = true;
  game.emitter.width = game.width * 1.4; // magic number
  game.emitter.makeParticles('tree'); // use a dark color
  game.emitter.minParticleScale = 0.1;
  game.emitter.maxParticleScale = 0.7;
  game.emitter.setYSpeed(500, 700);
  game.emitter.setXSpeed(-5, 5);
  game.emitter.minRotation = 0;
  game.emitter.maxRotation = 0;
  game.emitter.start(false, 2400, 5, 0); // go
}