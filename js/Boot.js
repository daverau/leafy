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

function genPause() {
  // Create a label to use as a button
  game.pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
  game.pause_label.inputEnabled = true;
  game.pause_label.events.onInputUp.add(function () {
    // When the pause button is pressed, we pause the game
    game.paused = true;

    // Then add the menu
    //menu = game.add.sprite(w/2, h/2, 'menu');
    //menu.anchor.setTo(0.5, 0.5);

    // And a label to illustrate which menu item was chosen. (This is not necessary)
    choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
    choiseLabel.anchor.setTo(0.5, 0.5);
  });

  // Add a input listener that can help us return from being paused
  game.input.onDown.add(unpause, self);

  // And finally the method that handels the pause menu
  function unpause(event){
    // Only act if paused
    if(game.paused){
      // Calculate the corners of the menu
      var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
        y1 = h/2 - 180/2, y2 = h/2 + 180/2;

      // Check if the click was inside the menu
      if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
        // The choicemap is an array that will help us see which item was clicked
        var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

        // Get menu local coordinates for the click
        var x = event.x - x1,
          y = event.y - y1;

        // Calculate the choice 
        var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

        // Display the choice
        choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
      }
      else{
        // Remove the menu and the label
        menu.destroy();
        choiseLabel.destroy();

        // Unpause the game
        game.paused = false;
      }
    }
  };
}