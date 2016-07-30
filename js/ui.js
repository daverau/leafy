// # UI
function genUI() {
  game.ui = game.add.group();

  // leaves
  game.blueLeafIcon = game.ui.create(game.width-110, 26, 'blueleaf');
  game.blueLeafText = game.add.text( game.width-70, 50, '-', { font: (11*vars.ratio)+"px AvenirNext-Medium", fill: '#B1F1D9' });
  game.ui.add(game.blueLeafText);

  // flowers
  game.flowersIcon = game.ui.create(game.width-210, 30, 'flower');
  game.flowersIcon.scale.setTo(0.35);
  game.flowersText = game.add.text( game.width-175, 50, '-', { font: (11*vars.ratio)+"px AvenirNext-Medium", fill: '#F7E53B' });
  game.ui.add(game.flowersText);

  // score
  game.scoreText = game.add.text( game.width/2, 45, '0', { font: (15*vars.ratio)+"px AvenirNext-Heavy", fill: '#F5A623' });
  game.ui.add(game.scoreText);

  // fps
  // game.fps = game.add.text( game.width-90, game.height-50, '-', { font: (11*vars.ratio)+"px AvenirNext-Medium", fill: '#000' });
  // game.fps.alpha = 0.2;
  // game.ui.add(game.fps);

  game.ui.deathTween = game.add.tween(game.ui).to({
    alpha: 0,
  }, 500, Phaser.Easing.Cubic.Out);

}

function pause() {
  if ( !game.paused ) {
    game.paused = true;
    document.getElementById('pause').innerHTML = 'Paused';
  } else {
    game.paused = false;
    document.getElementById('pause').innerHTML = 'Pause';
  }
}

function genLevelText() {
  var level = isLevel();
  if (level === 0) {
    level = 1;
  }
  game.levelText = game.add.text( game.width - 500, game.height - (vars.platformHeight + 144), 'Level ' + level, { font: (72*vars.ratio)+"px AvenirNext-Heavy", fill: '#F5A623' });
  game.levelText.alpha = 0.3;

  game.physics.arcade.enable(game.levelText);
  game.levelText.body.velocity.x = vars.gameSpeed;
}

// show upcoming level marker
function setLevelText() {
  //console.log('setLevelText()');
  if (offCamera(game.levelText) && vars.score > (isLevel() * vars.levelEveryX) - (game.width / (2 * vars.ratio))) {
    game.levelText.x = game.width;
    game.levelText.text = 'Level ' + (isLevel() + 1);
    //console.log('move level ' + (isLevel() + 1) + ' text to: ' + game.levelText.x);
  }
}

function genPause() {
  // Create a label to use as a button


  function unpause(event){
    if (game.paused){
    } else {
      game.paused = false;
    }
  }
}

function updateUI() {
  game.flowersText.setText(game.leafy.flowers);
  game.blueLeafText.setText(game.leafy.blueLeafCount);
  //game.fps.setText(game.time.fps + "fps");
  if (game.leafy.alive) {
    vars.score += 1;
    game.scoreText.setText(vars.score);
  }
}

function updateScore() {
  game.scoreText.setText(vars.score);
}
