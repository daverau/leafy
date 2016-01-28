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
    this.bggameover.alpha = .5;

    // # gameoverScores group
    this.gameoverScores = this.add.group();

    // gameover
    this.gameoverText = this.add.sprite( game.width*.1, 140-game.height, 'gameoverText');
    this.gameoverScores.add(this.gameoverText);

    // your score
    this.gameoverYourScore = this.add.text( game.width*.1+190, 250-game.height, game.leafy.score, { font: (24*vars.ratio)+"px Arial", fill: '#F5A623' });
    this.gameoverScores.add(this.gameoverYourScore);

    // best score
    this.gameoverBestjump = this.add.text( game.width*.1+190, 320-game.height, game.leafy.bestScore, { font: (24*vars.ratio)+"px Arial", fill: '#85BFD2' });
    this.gameoverScores.add(this.gameoverBestjump);

    // giantleafy
    this.gameoverLeafy = this.add.sprite(game.width-(game.width/8), game.height*2, 'gameover');
    this.gameoverLeafy.anchor.setTo(.5);
    this.gameoverLeafy.scale.setTo(-.5,.5);
    this.gameoverLeafytween = this.add.tween(this.gameoverLeafy).to({
      y: game.height-(game.height/3),
    }, 1000, Phaser.Easing.Cubic.Out);

    // retry
    this.playButton = this.add.button( game.width*.1, 420-game.height, 'playButton', this.retryGame, this);
    this.gameoverScores.add(this.playButton);
    
    this.menuButton = this.add.button( game.width*.1+350, 420-game.height, 'menuButton', this.startGame, this);
    this.gameoverScores.add(this.menuButton);

    // animation
    this.gameoverTween = this.add.tween(this.gameoverScores).to({
      y: game.height*1.05,
    }, 1000, Phaser.Easing.Cubic.Out);
  },


  create: function () {

    this.gameoverLeafytween.start();
    this.gameoverTween.start();

  },

  retryGame: function() {
    this.state.start('Game');
  },

  startGame: function() {
    this.state.start('MainMenu');
  },

  update: function () {

    //console.log('update');
    // if ( this.input.activePointer.isDown || this.jumpButton.isDown) {
    //   this.retryGame();
    // }

  }

};
