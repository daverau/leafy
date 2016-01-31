document.write("<script src='lib/gyro.js'><\/script>"); // hacky!

var Leafy = function() {};
var player = {};

Leafy.Jumper = function() {};
Leafy.Jumper.prototype = {

  preload: function() {

    this.load.spritesheet('leafy', 'img/leafy-v2.png', 128, 128);
    this.load.image( 'pixel', 'img/1px.png' );
    this.load.image('bgnight', 'img/bg-night.png');
    this.load.audio('boing', 'audio/woosh.wav');
    this.load.audio('fall', 'audio/fall.wav');

  },

  create: function() {
    // background color
    this.bgnight = this.add.sprite(0,0, 'bgnight');
    this.bgnight.fixedToCamera = true;
    this.sfxboing = this.add.audio('boing');
    this.sfxfall = this.add.audio('fall');

    // scaling
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var w = window.innerWidth*window.devicePixelRatio;
    var h = window.innerHeight*window.devicePixelRatio;
    this.scale.maxWidth = w;
    this.scale.maxHeight = h;

    // physics
    this.physics.startSystem( Phaser.Physics.ARCADE );

    // camera and platform tracking vars
    this.cameraYMin = 99999;
    this.platformYMin = 99999;

    // draw stuff
    drawMoon();
    this.platformsCreate();
    this.heroCreate();

    // controls
    this.cursor = this.input.keyboard.createCursorKeys();
    game.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    game.jumptimer = 0;

  },

  update: function() {
    // this is where the main magic happens
    // the y offset and the height of the world are adjusted
    // to match the highest point the hero has reached
    this.world.setBounds( 0, -player.yChange, this.world.width, this.game.height + player.yChange );

    // the built in camera follow methods won't work for our needs
    // this is a custom follow style that will not ever move down, it only moves up
    this.cameraYMin = Math.min( this.cameraYMin, player.y - this.game.height * 0.75 );
    this.camera.y = this.cameraYMin;

    // hero collisions and movement
    this.physics.arcade.collide( player, this.platforms );
    this.heroMove();

    // for each plat form, find out which is the highest
    // if one goes below the camera view, then create a new one at a distance from the highest one
    // these are pooled so they are very performant
    this.platforms.forEachAlive( function( elem ) {
      this.platformYMin = Math.min( this.platformYMin, elem.y );
      if( elem.y > this.camera.y + this.game.height ) {
        elem.kill();
        this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 150 ), this.platformYMin - 200, 150 );
      }
    }, this );
  },

  shutdown: function() {
    // reset everything, or the world will be messed up
    this.world.setBounds( 0, 0, this.game.width, this.game.height );
    this.cursor = null;
    player.destroy();
    player = {};
    this.platforms.destroy();
    this.platforms = null;
  },

  platformsCreate: function() {
    // platform basic setup
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple( 10, 'pixel' );

    // create the base platform, with buffer on either side so that the hero doesn't fall through
    this.platformsCreateOne( -24, this.world.height - 24, this.world.width + 24 );
    // create a batch of platforms that start to move up the level
    for( var i = 0; i < 9; i++ ) {
      this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 150 ), this.world.height - 200 - 200 * i, 150 );
    }
  },

  platformsCreateOne: function( x, y, width ) {
    // this is a helper function since writing all of this out can get verbose elsewhere
    var platform = this.platforms.getFirstDead();
    platform.reset( x, y );
    platform.scale.x = width;
    platform.scale.y = 24;
    platform.body.immovable = true;
    return platform;
  },

  heroCreate: function() {
    // basic hero setup
    player = game.add.sprite( this.world.centerX, 0, 'leafy' );
    player.y = this.world.height - player.height;
    player.anchor.set( 0.5 );
    
    // track where the hero started and how much the distance has changed from that point
    player.yOrig = player.y;
    player.yChange = 0;

    // hero collision setup
    // disable all collisions except for down
    game.physics.arcade.enable( player );
    player.body.gravity.y = 1000;
    player.body.setSize(50, 110, 0, -4); // hitbox adjusted

    player.body.checkCollision.up = false;
    player.body.checkCollision.left = false;
    player.body.checkCollision.right = false;
    player.body.maxVelocity.x = 800;

    // gyro movements
    gyro.frequency = 10;
    // start gyroscope detection
    gyro.startTracking(function(o) {
      // updating player velocity
      if (player.body) {
        player.body.velocity.x += o.gamma*10;
      }
    });   


  },

  heroMove: function() {
    // handle the left and right movement of the hero
    if( this.cursor.left.isDown ) {
      player.body.velocity.x = -400;
    } else if( this.cursor.right.isDown ) {
      player.body.velocity.x = 400;
    } else {
      player.body.velocity.x = 0;
    }
    // handle hero jumping
    // auto jump  this.cursor.up.isDown && 
    if( player.body.touching.down ) {
      this.sfxboing.play();
      player.body.velocity.y = -700;
    } 
    
    // // jump attempt 2, sucks
    // player.body.velocity.y = 0;
    // if (game.jumpKey.isDown) {
    //   this.sfxboing.play();
    //   player.body.velocity.y = -700;
    // }

    // if (this.cursor.up.isDown && player.body.touching.down) {
    //   game.jumptimer = game.time.time;
    //   player.body.velocity.y = -750;
    // } else if (this.cursor.up.isDown && (game.jumptimer != 0)) {
    //   if (game.jumptimer > 600) {
    //     game.jumptimer = 0;
    //   } else {
    //     player.body.velocity.y = -250;
    //   }
    // } else if (game.jumptimer != 0) {
    //   game.jumptimer = 0;
    // }


    // wrap world coordinated so that you can warp from left to right and right to left
    this.world.wrap( player, player.width / 2, false );

    // track the maximum amount that the hero has travelled
    player.yChange = Math.max( player.yChange, Math.abs( player.y - player.yOrig ) );
    
    // if the hero falls below the camera view, gameover
    if( player.y > this.cameraYMin + this.game.height && player.alive ) {
      this.sfxfall.play();
      this.state.start( 'Jumper' );
    }
  }
}

