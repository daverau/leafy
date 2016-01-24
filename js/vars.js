// # Global variables (more like constants)
var vars = {};

// debugger
vars.$log = document.getElementById('log');

// setup
vars.ratio = window.devicePixelRatio || 1;

// world
// many game variables are based on this number
// trees, bees, and blue leaves, oh, hey!
vars.worldSize = window.innerWidth*3;

// gaps
vars.gapHeight = 90;

// bee speed
vars.beeSpeed = 370;