BasicGame.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;

};
BasicGame.MainMenu.prototype = {

  create: function () {

    // # Title/start screen
    // [todo] put some design time into this to make it nice with music and a button
    //this.music = this.add.audio('titleMusic');
    //this.music.play();
    this.bigleafy = this.add.sprite(0, 0, 'bigleafy');
    this.bigleafy.scale.setTo(.5);
    this.playButton = this.add.button(0,0, 'playButton', this.startGame, this);
    this.playButton.scale.setTo(.5);

    //this.startGame();

  },

  update: function () {

    //  Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    //this.music.stop();

    //  And start the actual game
    this.state.start('Game');

  }

};
