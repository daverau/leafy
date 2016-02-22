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
    this.bg = this.add.sprite(game.width,game.height, 'bgnight');
    this.bg.anchor.setTo(1);

    this.ground = this.add.tileSprite(0 , game.height-90, game.width, 90, 'tree');
    // this.physics.arcade.enable(this.ground);
    // this.ground.body.immovable = true;
    // this.ground.body.allowGravity = false;

    drawMoon();
    genTrees();
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
    this.titleText = game.add.text( game.width/2, game.height*0.4, 'LEAFY', { font: "288px AvenirNext-Heavy", fill: '#fff' });
    this.titleText.anchor.setTo(0.5);

    genStump(); // move
    genOwl();   // move

    this.playButton = this.add.button(game.width/2, game.height*0.6, 'playButton', this.startGame, this, 1, 0, 2);
    this.playButton.anchor.setTo(0.5,0);
    game.sfxbutton = game.add.audio('button');

    genBees(1);

    //this.state.start('Game');

  },

  update: function () {

    //console.log( this.input.activePointer.isDown );
    //this.physics.arcade.collide(game.leafy, this.ground, null, null, this);      

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
    game.sfxbutton.play();
    this.state.start('Game');

  }

};
