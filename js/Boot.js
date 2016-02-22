// # Global variables
var vars = {};

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
    this.input.maxPointers = 2; // for mobile
    this.input.addPointer();
    this.input.addPointer();

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
// helper
function offCamera(item) {
  return item.x < game.camera.x;
}
function resetMove(item,x,y) {
  var x = x || game.leafy.x + Math.floor(Math.random()*(game.width * 3)+(game.width * 1.5));
  var y = y || game.height - vars.platformHeight;
  //console.log('resetMove() ' + item.key);
  //console.log('--move--');
  item.alpha = 1;
  item.pickedup = false;
  item.y = y;
  item.x = x;
}
