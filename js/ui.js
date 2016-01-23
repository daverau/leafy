// # UI
function genUI() {
  game.ui = game.add.group();

  // leaves
  game.blueLeafIcon = game.ui.create(game.width-100, 50, 'blueleaf');
  game.blueLeafIcon.fixedToCamera = true;
  game.blueLeafText = game.add.text( game.width-50, 50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#B1F1D9' });
  game.blueLeafText.fixedToCamera = true;

  // flowers
  game.flowersIcon = game.ui.create(game.width-210, 30, 'flower');
  game.flowersIcon.scale.setTo(.50);
  game.flowersIcon.fixedToCamera = true;
  game.flowersText = game.add.text( game.width-160, 50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#F5A623' });
  game.flowersText.fixedToCamera = true;


  // distance
  // game.distanceText = game.add.text( game.width-100, game.height-40, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  // game.distanceText.fixedToCamera = true;
  // game.distanceText.alpha = .2;

  // fps
  game.fps = game.add.text( game.width-220, game.height-50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  game.fps.fixedToCamera = true;
  game.fps.alpha = .2;

  // wraps
  game.wrapsText = game.add.text( game.width-100, game.height-50, '-', { font: (11*vars.ratio)+"px Arial", fill: '#000' });
  game.wrapsText.fixedToCamera = true;
  game.wrapsText.alpha = .2;
}


function dbug(msg) {
  vars.$log.innerHTML = msg;
}