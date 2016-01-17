function drawMoon() {
  var bmd = game.add.bitmapData(512,512);
  bmd.ctx.beginPath();
  bmd.ctx.arc(bmd.width / 2, bmd.height / 2, 256, 0, 2 * Math.PI, true);
  bmd.ctx.fillStyle = '#ffffff';
  bmd.ctx.fill(); 
  game.moon = game.add.sprite(500, 200, bmd);
  game.moon.anchor.setTo(0.5);

  game.moon.fixedToCamera = true;

}
