BasicGame.GameOver = function (game) {

  this.music = null;
  this.playButton = null;

};
BasicGame.GameOver.prototype = {

  preload: function () {
    //this.music = this.add.audio('titleMusic');
    //this.music.play();

    // # Background images
    this.bggameover = this.add.sprite(0,0, 'bggameover');
    this.bggameover.width = game.width;
    this.bggameover.height = game.height;
    this.bggameover.alpha = 0.5;

    // # gameoverScores group
    this.gameoverScores = this.add.group();

    // gameover
    this.gameoverText = this.add.sprite( game.width*0.1, 160-game.height, 'gameoverText');
    this.gameoverScores.add(this.gameoverText);

    // your score
    this.gameoverYourScore = this.add.text( game.width*0.1, 175-game.height, game.leafy.score, { font: (72*vars.ratio)+"px AvenirNext-Heavy", fill: '#F5A623' });
    this.gameoverScores.add(this.gameoverYourScore);

    // best score
    this.gameoverBestjump = this.add.text( game.width*0.1, 410-game.height, game.leafy.bestScore, { font: (24*vars.ratio)+"px AvenirNext-Heavy", fill: '#85BFD2' });
    this.gameoverScores.add(this.gameoverBestjump);

    // running leafy
    // this.gameoverLeafy = this.add.sprite(0, game.height*2, 'gameover');
    // this.gameoverLeafy.anchor.setTo(0.5);
    // this.gameoverLeafytween = this.add.tween(this.gameoverLeafy).to({
    //   y: game.height-(game.height/3),
    // }, 1000, Phaser.Easing.Cubic.Out);

    // menu button
    this.menuButton = this.add.button( game.width*0.1, 500 - game.height, 'menuButton', this.startGame, this, 1, 0, 2);
    this.menuButton.scale.setTo(0.5);
    this.gameoverScores.add(this.menuButton);

    // retry
    this.playButton = this.add.button( game.width - (game.width*0.1), (game.height/2) - (game.height - 130), 'playButton', this.retryGame, this, 1, 0, 2);
    this.playButton.anchor.setTo(1,0);
    this.gameoverScores.add(this.playButton);
    

    // animation
    this.gameoverTween = this.add.tween(this.gameoverScores).to({
      y: game.height,
    }, 1000, Phaser.Easing.Cubic.Out);
  },


  create: function () {
    //this.gameoverLeafytween.start();
    this.gameoverTween.start();
  },

  // button play
  retryGame: function() {
    game.sfxbutton.play();
    this.state.start('Game');
  },

  // button menu
  startGame: function() {
    game.sfxbutton.play();
    this.state.start('MainMenu');
  },

  update: function () {

    //console.log('update');
    // if ( this.input.activePointer.isDown || this.jumpButton.isDown) {
    //   this.retryGame();
    // }

  }

};
