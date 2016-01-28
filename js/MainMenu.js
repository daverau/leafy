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


    // # Background images
    game.bgnight = game.add.sprite(0,0, 'bgnight');

    this.bigleafy = this.add.sprite(50, game.height/2, 'bigleafy');
    this.bigleafy.scale.setTo(.5);
    this.bigleafy.anchor.setTo(0,.5);
    this.playButton = this.add.button(game.width/1.45, game.height/2, 'playButton', this.startGame, this);
    this.playButton.scale.setTo(.5);

    //this.startGame();

  },

  update: function () {

    //console.log( this.input.activePointer.isDown );

    // if ( this.input.activePointer.isDown || this.jumpButton.isDown) {
    //   this.startGame();
    // }

  },

  render: function () {

    //console.log('render');
    //game.debug.pointer( game.input.activePointer );

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    //this.music.stop();

    //  And start the actual game
    this.state.start('Game');

  }

};
