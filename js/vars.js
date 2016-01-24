// # Variables and setup
var vars = {};

vars.$log = document.getElementById('log');

// setup
vars.ratio = window.devicePixelRatio || 1;

// world
vars.worldSize = window.innerWidth*3; // 50000 default
//vars.worldSize = window.innerWidth*3; // 50000 default
vars.gapHeight = 90;

// bee speed
vars.beeSpeed = 370;


// utility
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}

// # Phaser global
// [question] is this leaking or causing bloat since it's global?
BasicGame = {
 score: 0, // unused
 music: null, // to be used
 orientated: false // unused
};
