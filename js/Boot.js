BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

  init: function () {

    var canvas = document.getElementById('game');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    this.input.maxPointers = 2;
    this.stage.disableVisibilityChange = true;

    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    //this.scaleMode = Phaser.ScaleManager.USER_SCALE;
    //this.scale.setUserScale(0.5, 0.5);

  },

  preload: function () {

    // Here we load the assets required for our preloader (in this case a background and a loading bar)
    this.load.image('preloaderBackground', 'img/tree.png');
    this.load.image('preloaderBar', 'img/preloaderbar.png');

  },

  create: function () {

    this.state.start('Preloader');

  },

  gameResized: function (width, height) {

    // This could be handy if you need to do any extra processing if the game resizes.
    // A resize could happen if for example swapping orientation on a device or resizing the browser window.
    // Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

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