// # UI
function genUI() {
  game.ui = game.add.group();

  // leaves
  game.blueLeafIcon = game.ui.create(game.width-110, 26, 'blueleaf');
  game.blueLeafIcon.fixedToCamera = true;
  game.blueLeafText = game.add.text( game.width-70, 50, '-', { font: (11*vars.ratio)+"px Avenir-Medium", fill: '#B1F1D9' });
  game.blueLeafText.fixedToCamera = true;
  game.ui.add(game.blueLeafText);

  // flowers
  game.flowersIcon = game.ui.create(game.width-210, 30, 'flower');
  game.flowersIcon.scale.setTo(0.35);
  game.flowersIcon.fixedToCamera = true;
  game.flowersText = game.add.text( game.width-175, 50, '-', { font: (11*vars.ratio)+"px Avenir-Medium", fill: '#F7E53B' });
  game.flowersText.fixedToCamera = true;
  game.ui.add(game.flowersText);

  // score
  // { font: (72*vars.ratio)+"px AvenirNext-Heavy", fill: '#F5A623' }
  game.scoreText = game.add.text( game.width/2, 45, '0', { font: (15*vars.ratio)+"px AvenirNext-Heavy", fill: '#F5A623' });
  game.scoreText.fixedToCamera = true;
  game.ui.add(game.scoreText);

  // fps
  game.fps = game.add.text( game.width-90, game.height-50, '-', { font: (11*vars.ratio)+"px Avenir-Medium", fill: '#000' });
  game.fps.fixedToCamera = true;
  game.fps.alpha = 0.2;
  game.ui.add(game.fps);

  game.ui.deathTween = game.add.tween(game.ui).to({
    alpha: 0,
  }, 500, Phaser.Easing.Cubic.Out);

}

function genLevelText() {
  game.levelText = game.add.text( 50, game.height - (vars.platformHeight + 144), 'Level 1', { font: (72*vars.ratio)+"px AvenirNext-Heavy", fill: '#ffffff' });
  // #63434B platform color
  game.levelText.alpha = 0.3;
}

function setLevelText() {
  if ( (game.levelText.x + game.levelText.width) < game.camera.x) {
    game.levelText.x = isLevel() * vars.levelEveryX;
    game.levelText.text = 'Level ' + (isLevel() + 1); // show upcoming level marker
  }
}