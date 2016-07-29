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

    // # gameoverScores group
    this.gameoverScores = this.add.group();

    // gameover
    this.gameoverText = this.add.sprite( game.width*0.24, 160-game.height, 'gameoverText');
    this.gameoverScores.add(this.gameoverText);

    // reset scores
    vars.score = 1;

  },

  create: function () {

    drawBG('AEE0F9', 'AEE0F9');

    // rainbow
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

    // clouds
    game.clouds = game.add.group();
    game.clouds.enableBody = true;
    for (var i=0; i<9; i++) {
      var cloud = new Cloud(game, game.rnd.between(0, game.width), game.rnd.between(0, game.height));
      game.clouds.add(cloud);
    }

    // owl
    genOwl();   // move
    game.owl.x = game.width - (game.width / 3);

    // floating leafy
    game.leafy = genLeafy();
    game.leafy.animations.play('happy');
    game.leafy.body.gravity = 0;
    game.leafy.x = game.width / 2;
    game.leafy.y = game.height / 2;

  },

  // button menu
  startGame: function() {
    game.sfxbutton.play();
    this.state.start('MainMenu');
  },

  update: function () {
    // if ( game.cursors.up.isDown) {
    //   this.state.start('MainMenu');
    // }
  }
};
