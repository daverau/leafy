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
BasicGame.Game = function (game) {
  this.game;   // a reference to the currently running game
  this.add;    // used to add sprites, text, groups, etc
  this.camera;  // a reference to the game camera
  this.cache;   // the game cache
  this.input;   // the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load;   // for preloading assets
  this.math;   // lots of useful common math operations
  this.sound;   // the sound manager - add a sound, play one, set-up markers, etc
  this.stage;   // the game stage
  this.time;   // the clock
  this.tweens;  // the tween manager
  this.world;   // the game world
  this.particles; // the particle manager
  this.physics;  // the physics manager
  this.rnd;    // the repeatable random number generator
  // You can use any of these from any function within this State.
  // But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};