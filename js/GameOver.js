BasicGame.GameOver = function (game) {

  this.music = null;
  this.playButton = null;

};
BasicGame.GameOver.prototype = {

  preload: function () {
    //this.music = this.add.audio('titleMusic');
    //this.music.play();

    // # Background images
    game.bgnight = this.add.sprite(0,0, 'bgnight');

    // # gameoverScores group
    this.gameoverScores = this.add.group();

    // gameover
    this.gameoverText = this.add.sprite(game.width/2, 150-game.height, 'gameoverText');
    this.gameoverText.anchor.setTo(.5);
    this.gameoverText.scale.setTo(.5);
    this.gameoverScores.add(this.gameoverText);

    // your score
    this.gameoverYourScore = this.add.text( game.width/2, 250-game.height, 'your score: '+game.leafy.score, { font: (15*vars.ratio)+"px Arial", fill: '#000' });
    this.gameoverYourScore.anchor.setTo(.5);
    this.gameoverScores.add(this.gameoverYourScore);

    // best score
    this.gameoverBestjump = this.add.text( game.width/2, 340-game.height, 'your high score: '+game.leafy.bestScore, { font: (15*vars.ratio)+"px Arial", fill: '#000' });
    this.gameoverBestjump.anchor.setTo(.5);
    this.gameoverScores.add(this.gameoverBestjump);

    // giantleafy
    this.gameoverLeafy = this.add.sprite(game.width/2, game.height*2, 'gameover');
    this.gameoverLeafy.anchor.setTo(.5, 0);
    this.gameoverLeafy.scale.setTo(.5);
    this.gameoverLeafytween = this.add.tween(this.gameoverLeafy).to({
      y: game.height/2,
    }, 1000, Phaser.Easing.Cubic.Out);

    // retry
    this.retryButton = this.add.button(game.width/1.45, game.height-(game.height/2), 'retryButton', this.retryGame, this);
    this.retryButton.scale.setTo(.5);

    // animation
    this.gameoverTween = this.add.tween(this.gameoverScores).to({
      y: game.height,
    }, 1000, Phaser.Easing.Cubic.Out);
  },

  create: function () {



    this.gameoverLeafytween.start();
    this.gameoverTween.start();

  },

  retryGame: function() {
    this.state.start('Game');
  },

  update: function () {

    //console.log('update');
    // if ( this.input.activePointer.isDown || this.jumpButton.isDown) {
    //   this.retryGame();
    // }

  }

};
