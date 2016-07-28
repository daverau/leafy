BasicGame.GameOver = function (game) {

  this.music = null;
  this.playButton = null;

};
BasicGame.GameOver.prototype = {

  preload: function () {
    // # Music
    //this.music = this.add.audio('titleMusic');
    //this.music.play();

    document.getElementById('ui').classList.add('hide');

    // # Background images
    this.bggameover = this.add.sprite(0,0, 'bggameover');

    // giant leafy
    this.gameoverLeafy = this.add.sprite(-game.width, 160+game.height, 'gameover');
    this.gameoverLeafy.anchor.setTo(0,1);
    this.gameoverLeafy.scale.setTo(0.5);

    // # gameoverScores group
    this.gameoverScores = this.add.group();

    // gameover
    this.gameoverText = this.add.sprite( game.width*0.24, 160-game.height, 'gameoverText');
    this.gameoverScores.add(this.gameoverText);

    // your score
    this.gameoverYourScore = this.add.text( game.width*0.24, 175-game.height, vars.score, { font: (72*vars.ratio)+"px AvenirNext-Heavy", fill: '#F5A623' });
    this.gameoverScores.add(this.gameoverYourScore);

    // high score
    this.gameoverBestjump = this.add.text( game.width*0.41, 344-game.height, game.leafy.bestScore, { font: (24*vars.ratio)+"px AvenirNext-Heavy", fill: '#526675' });
    this.gameoverScores.add(this.gameoverBestjump);

    // tries
    // this.gameoverTriesscore = this.add.text( game.width*0.41, 415-game.height, vars.triesScore, { font: (20*vars.ratio)+"px AvenirNext-Medium", fill: '#526675' });
    // this.gameoverScores.add(this.gameoverTriesscore);

    // jumps
    // this.gameoverJumpsscore = this.add.text( game.width*0.405, 476-game.height, game.leafy.jumpsScore, { font: (20*vars.ratio)+"px AvenirNext-Medium", fill: '#526675' });
    // this.gameoverScores.add(this.gameoverJumpsscore);

    // blue acorn counts
    // game.blueLeafIcon = this.gameoverScores.create(game.width-110, 26-game.height, 'blueleaf');
    // game.blueLeafText = game.add.text( game.width-70, 50-game.height, game.leafy.blueLeafCount, { font: (11*vars.ratio)+"px Avenir-Medium", fill: '#B1F1D9' });
    // game.blueLeafText.fixedToCamera = true;
    // this.gameoverScores.add(game.blueLeafText);

    // menu button
    this.menuButton = this.add.button( game.width - (game.width*0.1), 50-game.height, 'menuButton', this.startGame, this, 1, 0, 2);
    this.menuButton.scale.setTo(0.5);
    this.menuButton.anchor.setTo(1,0);
    this.gameoverScores.add(this.menuButton);

    // play button
    this.playButton = this.add.button( game.width - (game.width*0.1), (game.height- (game.height*0.28)) - (game.height), 'playButton', this.retryGame, this, 1, 0, 2);
    this.playButton.anchor.setTo(1,1);
    this.gameoverScores.add(this.playButton);

    // running leafy
    this.leafy = game.add.sprite( this.playButton.x - (this.playButton.width/2), (this.playButton.y/2)-(game.leafy.height*1.3), 'leafy'); // [todo] fix sloppy positioning
    this.leafy.anchor.setTo(0.5, 1); //flip at middle point
    this.leafy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true);
    this.leafy.animations.play('walk');
    this.gameoverScores.add(this.leafy);

    // continue button
    if ( (isLevel() > 1) && (isLevel() * 10 <= game.leafy.blueLeafCount) ) {
      this.continueGameText = this.add.text( this.playButton.x-50, this.playButton.y+80, 'Continue Level:  ' + isLevel() * 10, { font: (16*vars.ratio)+"px AvenirNext-Medium", fill: '#B1F1D9' });
      this.continueGameText.anchor.setTo(1, 1);
      this.gameoverScores.add(this.continueGameText);

      this.continueButton = this.add.button( this.continueGameText.x + 12, this.continueGameText.y - 50, 'blueleaf', this.continueGame, this, 1, 0, 2);
      //this.continueButton.scale.setTo(0.5);
      this.gameoverScores.add(this.continueButton);
    }

    // animation
    this.gameoverLeafytween = this.add.tween(this.gameoverLeafy).to({
      x: -this.gameoverLeafy.width/2.3,
    }, 600, Phaser.Easing.Cubic.Out);
    this.gameoverTween = this.add.tween(this.gameoverScores).to({
      y: game.height,
    }, 600, Phaser.Easing.Cubic.Out);
  },


  create: function () {
    this.gameoverLeafytween.start();
    this.gameoverTween.start();

    // continue?
    if (isLevel() > 1 && isLevel() * 10 <= game.leafy.blueLeafCount) {
      this.continueButton.inputEnabled = true;
      this.continueButton.events.onInputDown.add(this.continueGame, this);
    }

  },

  // button play
  retryGame: function() {
    game.sfxbutton.play();
    this.state.start('Game');
    vars.score = 0;
  },

  // continue button
  continueGame: function() {
    var continueLevel = isLevel();
    var howMuch = continueLevel * 10;
    vars.score = continueLevel * vars.levelEveryX;

    // subtract for continue cost
    localStorage.setItem("leafyblueLeafCount", game.leafy.blueLeafCount - howMuch);

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
    if ( game.cursors.up.isDown) {
      this.retryGame();
    }

  }

};
