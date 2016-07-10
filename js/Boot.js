// # Global variables
var vars = {
  version: '1.7.3', // Leafy game version
  autoStart: false, // testing/auto start

  // levels
  levelEveryX: 10000, // 1,000 score == 10,000 pixels
  //levelEveryX: 2200 // test

  // leafy/player
  leafyJumps: 2,
  leafySpeed: 160,
  //leafySpeed: 0, // test
  leafyJumpVelocityY: -750, // pixels/second (negative y is up)
  leafyJumpConstant: 210,
  leafyGravity: 3000,
  leafyMaxVelocityX: 500,
  leafyMaxVelocityY: 4000,

  // platforms
  platforms: 7,
  platformHeight: 90,

  // coins
  coinTotal: 15,
  blueRingTotal: 4,

  // bees
  startBees: 1, // 1
  beeSpeed: 300,

  // setup
  ratio: window.devicePixelRatio || 1,
  worldSize: window.innerWidth*2,

  // track deaths
  triesScore: 0,

};

// platforms
vars.platformHeights = [
  90,
  250,
  400
];
vars.platformGaps = [
  100,
  150,
  200,
  250,
  300
];
vars.platformWidths = [
  360,
  240,
  180,
  90,
  50,
];

// game level settings
vars.platformLevels = {
  1: {
    widths: [1, 2, 3],
    heights: [1],
    gaps: [1, 1, 2]
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
  x = x || game.leafy.x + Math.floor(Math.random()*(game.width * 3)+(game.width * 1.5));
  y = y || game.height - vars.platformHeight;
  //console.log('resetMove() ' + item.key);
  //console.log('--move--');
  item.alpha = 1;
  item.pickedup = false;
  item.y = y;
  item.x = x;
}
function isLevel(x) {
  if (x > 0) {
    return Math.min( Math.ceil(x/vars.levelEveryX), 5 );
  } else if (game.leafy) {
    return Math.min( Math.ceil(game.leafy.x/vars.levelEveryX), 5 );
  }
}
