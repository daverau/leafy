// # Global variables (more like constants)
var vars = {};

// debugger
vars.$log = document.getElementById('log');

// setup
vars.ratio = window.devicePixelRatio || 1;

// world
// many game variables are based on this number
// trees, bees, and blue leaves, oh, hey!
vars.worldSize = window.innerWidth*2;

// platforms
// should probably call this platforms, not platforms
vars.platforms = 8; // [todo] refine, magic number, smaller doesn't move platforms fast enough to the front
vars.platformHeight = 90;

// bee speed
vars.beeSpeed = 370;