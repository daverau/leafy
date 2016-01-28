BasicGame.GameOver = function (game) {

  this.music = null;
  this.playButton = null;

};
BasicGame.GameOver.prototype = {

  create: function () {

    //this.music = this.add.audio('titleMusic');
    //this.music.play();

    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // # Background images
    game.bgnight = game.add.sprite(0,0, 'bgnight');
    this.gameoverTitle = this.add.sprite(game.width/2, game.height/2, 'gameover');
    this.gameoverTitle.anchor.setTo(.5, 0);
    this.gameoverTitle.scale.setTo(.5);

    //this.startGame('MainMenu');

  },

  update: function () {

    //console.log('update');
    if ( this.input.activePointer.isDown || this.jumpButton.isDown) {
      this.state.start('Game');
      //this.state.start('MainMenu');
    }

  }

};
