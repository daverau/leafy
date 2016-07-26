// # Global variables
var vars = {
  // meta
  version:         '1.7.3', // Leafy game version
  autoStart:         false, // testing/auto start

  // world setup
  ratio: window.devicePixelRatio || 1,
  worldSize: window.innerWidth,
  treeCount:             6, // total trees to generate/display

  // levels
  levelEveryX:        1000, // make platforms harder every X score

  // leafy/player
  leafyXposition:      240, // x left start position
  leafyJumps:            2, // could be upgradable
  gameSpeed:          -270, // could be upgradable
  leafyJumpVelocityY: -750, // pixels per second negative y is up
  leafyJumpConstant:   210, // jump numbers are magic
  leafyGravity:       3000,
  leafyMaxVelocityX:   500,
  leafyMaxVelocityY:  4000,

  // platforms
  platforms:             7, // based on a small width
  platformHeight:       90,

  // coins
  coinTotal:            15,
  blueRingTotal:         4,

  // bees
  startBees:             1, // 1
  beeSpeed:            440,

  // track deaths
  score:                 0, // overall distance score
  triesScore:            0, // number of tries

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
    this.time.advancedTiming = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.input.maxPointers = 2; // for mobile touch
    this.input.addPointer();
    this.input.addPointer();
  },

  preload: function () {
    // # Preload images
    this.load.image('preloaderBar', 'img/preloaderbar.png');
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
  //console.log('overlap check');
  return Phaser.Rectangle.intersects(spriteA.getBounds(), spriteB.getBounds());
}

// check off camera (to the left) for object pooling and reuse
function offCamera(item) {
  //console.log('off camera check');
  return (item.x + item.width) < 0;
}

function resetMove(item, x, y) {
  //console.log('resetMove() ' + item.key);
  item.alpha = 1;
  item.pickedup = false;
  item.y = y || game.height - vars.platformHeight;
  item.x = x || game.leafy.x + Math.floor(Math.random()*(game.width * 3)+(game.width * 1.5));
}

// check current level based on vars setting
function isLevel() {
  //console.log('level check');
  return Math.min( Math.ceil(vars.score/vars.levelEveryX), 5 );
}
