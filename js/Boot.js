// # Global variables
var vars = {
  version: '1.7.1', // Leafy game version

  ratio: window.devicePixelRatio || 1,

  // world
  // many game variables are based on this number
  // trees, bees, and blue leaves, oh, hey!
  worldSize: window.innerWidth*2,
  
  // platforms
  platforms: 8, // [todo] refine, magic number, smaller doesn't move platforms fast enough to the front
  platformHeight: 90,

  // bee speed
  beeSpeed: 300,

  // track deaths
  triesScore: 0,
  
  // testing/auto start
  autoStart: false,

  levelEveryX: 10000, // every 1,000 score or 10,000 pixels
  //levelEveryX: 5000 // test
};

// platform heights
vars.platformHeights = [
  90,
  180,
  360
];
vars.platformGaps = [
  100, 
  150, 
  200, 
  250, 
  300
];
vars.platformWidths = [
  350,
  250,
  150,
  90,
  50,
];
vars.platformLevels = {
  1: {
    widths: [1, 2],
    heights: [1],
    gaps: [1]
  },
  2: {
    widths: [2, 3, 4],
    heights: [1, 2],
    gaps: [1, 2, 2, 3]
  },
  3: {
    widths: [3, 3, 3, 4, 4, 5],
    heights: [1, 1, 2, 3, 3],
    gaps: [1, 2, 2, 3, 3, 3, 4, 4, 4, 5]
  },
  4: {
    widths: [3, 4, 4, 5, 5],
    heights: [1, 2, 3, 3, 3],
    gaps: [1, 2, 3, 3, 3, 4, 4, 4, 5, 5]
  },
  5: {
    widths: [2, 4, 4, 5, 5],
    heights: [1, 3, 3],
    gaps: [4, 5, 5]
  }
};

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
  return (item.x + item.width) < game.camera.x;
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
function isLevel() {
  if (game.leafy) {
    return Math.min( 
      Math.ceil(game.leafy.x/vars.levelEveryX),
      5
      );
  }
}