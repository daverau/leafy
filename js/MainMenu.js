BasicGame.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;

};
BasicGame.MainMenu.prototype = {

  create: function () {

    // show refresh, hide pause
    document.getElementById('refresh').classList.remove('hide');
    document.getElementById('ui').classList.add('hide');

    // # Title/start screen
    // [todo] put some design time into this to make it nice with music and a button
    //this.music = this.add.audio('titleMusic');
    //this.music.play();

    game.cursors = this.input.keyboard.createCursorKeys();

    // # Background images
    //drawBG('D3F4FF', '31BCF3');
    drawBG('80AFBE', '261B28');
    this.ground = this.add.tileSprite(0 , game.height-90, game.width, 90, 'tree');

    drawMoon();
    //genTrees();
    game.moon.alpha=0.3;
    //genLeafy();

    // this.bg = game.add.sprite(game.width/2, game.height/2, 'title');
    // this.bg.anchor.setTo(.5);
    // this.bg.width = game.width;
    // this.bg.height = game.height;

    // this.bigleafy = this.add.sprite(50, game.height/2, 'bigleafy');
    // this.bigleafy.scale.setTo(.5);
    // this.bigleafy.anchor.setTo(0,.5);

    //layering order
    this.titleText = game.add.text( game.width/2, game.height*0.4, 'Leafy’s Trip', { font: "170px AvenirNext-Heavy", fill: '#fff' });
    this.titleText.anchor.setTo(0.5);

    this.verText = game.add.text( game.width - 100, game.height - 60, 'v'+vars.version, { font: (11*vars.ratio)+"px Avenir-Medium", fill: '#000000' });
    this.verText.alpha = 0.3;

    genStump(); // move
    genOwl();   // move

    this.playButton = this.add.button(game.width/2, game.height*0.6, 'playButton', this.startGame, this, 1, 0, 2);
    this.playButton.anchor.setTo(0.5,0);
    game.sfxbutton = game.add.audio('button');

    genBees(1);

    if (vars.autoStart) {
        this.state.start('Game');
    }

  },

  update: function () {

    //console.log( this.input.activePointer.isDown );
    //this.physics.arcade.collide(game.leafy, this.ground, null, null, this);

    if ( game.cursors.up.isDown) {
      this.startGame();
    }

  },

  render: function () {

    //console.log('render');
    //game.debug.pointer( game.input.activePointer );

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    //this.music.stop();

    //  And start the actual game
    game.sfxbutton.play();
    this.state.start('Game');

  }

};
