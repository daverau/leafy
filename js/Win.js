BasicGame.Win = function (game) {

  this.music = null;
  this.playButton = null;

};
BasicGame.Win.prototype = {

  preload: function () {
    // # Music
    //this.music = this.add.audio('titleMusic');
    //this.music.play();

    document.getElementById('ui').classList.add('hide');


    // giant leafy
    game.leafy.animations.play('happy');

    // # gameoverScores group
    this.gameoverScores = this.add.group();

    // gameover
    this.gameoverText = this.add.sprite( game.width*0.24, 160-game.height, 'gameoverText');
    this.gameoverScores.add(this.gameoverText);

  },

  create: function () {

    //drawBG('AEE0F9', '6fb0d1');
    drawBG('AEE0F9', 'AEE0F9');
    //drawBG('61C13C', '2D541A');

    this.rainbow = this.add.sprite(game.width/2, game.height/2, 'rainbow');
    this.rainbow.scale.setTo(0.5);
    this.rainbow.anchor.setTo(0.5);
    this.rainbow.alpha = 0;
    // animation
    this.winTween = this.add.tween(this.rainbow).to({
      alpha: 1
    }, 600, Phaser.Easing.Cubic.Out);

    this.rainbow.inputEnabled = true;
    this.rainbow.events.onInputDown.add(this.startGame, this);

    this.winTween.start();
  },

  // button menu
  startGame: function() {
    game.sfxbutton.play();
    this.state.start('MainMenu');
  },

  update: function () {
    if ( game.cursors.up.isDown) {
      this.state.start('MainMenu');
    }
  }
};
