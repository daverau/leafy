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
    genClouds();

    // base platform
    game.platforms = game.add.group();
    addPlatform(1);
    game.platforms.children[0].x = 0;
    game.platforms.children[0].body.velocity = 0;
    game.platforms.children[0].width = game.width;

    drawMoon();
    genTrees();
    game.moon.alpha=0.3;
    //game.leafy = genLeafy();

    //layering order
    this.titleText = game.add.text( game.width/2, game.height*0.4, 'Leafy’s Trip', { font: "170px AvenirNext-Heavy", fill: '#fff' });
    this.titleText.anchor.setTo(0.5);

    this.verText = game.add.text( game.width - 100, game.height - 60, 'v'+vars.version, { font: (11*vars.ratio)+"px Avenir-Medium", fill: '#000000' });
    this.verText.alpha = 0.3;

    genStump(); // move
    genOwl();   // move

    // playful menu
    game.owl.inputEnabled = true;
    game.owl.events.onInputDown.add(owlFlyaway, this);

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

    game.physics.arcade.collide(game.leafy, game.platforms, platformTouch, null, this);

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
