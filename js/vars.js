// # Variables and setup
var vars = {};

// setup
vars.ratio = window.devicePixelRatio || 1;

// world
vars.worldSize = 50000;

// pickups
vars.blueLeafTotal = 60;
vars.plantDelay = 1000;

// bee speed
vars.beeSpeed = 370;


// utility
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
