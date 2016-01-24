// # Phaser global
// [question] is this leaking or causing bloat since it's global?
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
    this.input.maxPointers = 2;
    this.stage.disableVisibilityChange = true;
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
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