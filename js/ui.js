// # UI
function genUI() {
  game.ui = game.add.group();

  // leaves
  game.blueLeafIcon = game.ui.create(game.width-100, 50, 'blueleaf');
  game.blueLeafIcon.fixedToCamera = true;
  game.blueLeafText = game.add.text( game.width-50, 50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#B1F1D9' });
  game.blueLeafText.fixedToCamera = true;
  game.ui.add(game.blueLeafText);

  // flowers
  game.flowersIcon = game.ui.create(game.width-210, 30, 'flower');
  game.flowersIcon.scale.setTo(0.50);
  game.flowersIcon.fixedToCamera = true;
  game.flowersText = game.add.text( game.width-160, 50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#F5A623' });
  game.flowersText.fixedToCamera = true;
  game.ui.add(game.flowersText);

  // fps
  game.fps = game.add.text( game.width-90, game.height-50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  game.fps.fixedToCamera = true;
  game.fps.alpha = 0.2;
  game.ui.add(game.fps);

  game.ui.deathTween = game.add.tween(game.ui).to({
    alpha: 0,
  }, 500, Phaser.Easing.Cubic.Out);

}


function dbug(msg) {
  vars.$log.innerHTML = msg;
}