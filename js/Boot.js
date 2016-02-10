// # Global variables (more like constants)
var vars = {};

// runmode,always run tothe right?
vars.runmode = false;

// setup
vars.ratio = window.devicePixelRatio || 1;

// world
// many game variables are based on this number
// trees, bees, and blue leaves, oh, hey!
vars.worldSize = window.innerWidth*2;

// platforms
vars.platforms = 8; // [todo] refine, magic number, smaller doesn't move platforms fast enough to the front
vars.platformHeight = 90;

// bee speed
vars.beeSpeed = 370;

// track deaths
vars.triesScore = 0;


// # Phaser global
// [question] is this leaking or causing bloat since it's global?
BasicGame = {
 score: 0, // unused
 music: null, // to be used
 orientated: false // unused
};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

  init: function () {
    // # Setup
    this.stage.disableVisibilityChange = true;
    this.stage.smoothed = false;
    this.time.advancedTiming = true; // [todo] need this?
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  },

  preload: function () {
    // # Preload images
    this.load.image('preloaderBar', 'img/preloaderbar.png');
    this.load.image('bgnight', 'img/bg-night.png');
  },

  create: function () {
    this.state.start('Preloader');
  },

  gameResized: function (width, height) {

  },

  enterIncorrectOrientation: function () {
    BasicGame.orientated = false;
    document.getElementById('orientation').style.display = 'block';
  },

  leaveIncorrectOrientation: function () {
    BasicGame.orientated = true;
    document.getElementById('orientation').style.display = 'none';
  }

};

// Utilities, to be moved once I have more here...
// # Basic overlap check without physics, useful for owl check, etc
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
function resetMove(item) {
  if ( (game.leafy.x - (item.x+item.width)) > game.width * 1.1 ) {
    //console.log('resetMove() ' + item.key);
    //console.log('--move--');
    item.alpha = 1;
    item.pickedup = false;
    item.y = game.height - vars.platformHeight;
    item.x = game.leafy.x + Math.floor(Math.random()*(game.width * 3)+(game.width * 1.5));
  }
}
