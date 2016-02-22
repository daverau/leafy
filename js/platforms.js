// Platforms

function placePlatforms() {
  var platformCount = game.platforms.children.length;
  //console.log('fn: placePlatforms(): '+platformCount);

  for (var i=0; i<platformCount; i++) {

    //console.log('--placePlatforms--'+i);
    var maxPlatformX = getLastPlatformX();
    //console.log('maxPlatformX:'+maxPlatformX);
    var platformw = Math.floor(Math.random() * 230) + 100;
    //console.log('platformw:'+platformw);
    var nextX = maxPlatformX + platformw ;
    //console.log('nextX:'+nextX);

    // first pillar should be at x:0
    if (i === 0) {
      nextX = 0;
    }

    // get from pool
    var platform = game.platforms.getFirstDead();
    if (platform) {
      platform.score = platformw;
      platform.touched = false;

      // set a platform ID, for state tracking ... bleh
      if (!platform.i) {
        platform.i = i;
      }

      // randomize width
      // [todo] weighted
      var w = Math.floor(Math.random() * 400) + 150;

      // apply platform
      platform.reset(nextX, game.height-90);
      platform.width = w;
      platform.nextX = nextX;
      platform.height = vars.platformHeight;

      //console.log('+ move ring for platform: '+platform.i + ' at x: ' + platform.x);
      placeBluering(platform);

      // place trees for this platform

    } else {
      //console.log('no dead platforms, move around first...');
    }
  }
}

// helper
function offCamera(item) {
  return item.x < game.camera.x;
}

// recycle rings as they fall off camera
function placeBluering(platform) {
  game.ringstoRecycle = game.bluerings.children.filter( offCamera );
  game.platformstoRecycle = game.platforms.children.filter( offCamera );
  //console.log('ringstoRecycle: '+game.ringstoRecycle.length);
  //console.log('platformstoRecycle: '+game.platformstoRecycle.length);

  var ring = game.ringstoRecycle[0];
  if (ring) {
    ring.x = platform.x + platform.width + (platform.nextX/2);
    ring.children.forEach(function(blueleaf) {
      resetLeaf(blueleaf);
    });
  }
}

function getLastPlatformX() {
  // find max x value
  var maxPlatformX = 0;
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x+platform.width,maxPlatformX);    
  });
  return maxPlatformX;
}

function resetPlatforms() {
  game.platforms.forEach(function(platform, index, array) {
    // [question] why are index & array null?
    // should be able to shiftPlatform(index)
    platform.kill();
    platform.x = 0;
  });
}

function moveFarPlatforms() {
  //console.log('fn() moveFarPlatforms');
  game.platforms.forEach(function(platform, index, array) {
    if ( (game.leafy.x - (platform.x + platform.width)) > game.width * 1.5 ) {
      platform.kill();
      platform.x = 0;
    }
  });
}

function shiftPlatform(index) {
  var index = index || 0;
  game.platforms[index].kill();
  game.platforms[index].x = 0;
}

// # Leafy collide with platform
function platformTouch(leafy, platform) {
  if (!platform.touched) {
    leafy.leafyText.tween.stop();
    leafy.leafyText.tween.pendingDelete = false; // http://www.html5gamedevs.com/topic/16641-restart-tween/
    platform.touched = true;
    
    leafy.leafyText.setText( platform.score );
    // # jump-based scoring, consider bonus points later or highscore best jump
    // if (game.leafy.score === 0) {
    //   game.leafy.score = 1;
    // } else {
    //   game.leafy.score = Number(platform.score) + Number(game.leafy.score);
    // }

    // set jump score so it follows Leafy around
    leafy.leafyText.alpha = 1;
    leafy.leafyText.x = ((game.leafy.x/2) * vars.ratio);
    leafy.leafyText.y = (game.leafy.y/2 - 80) * vars.ratio;
    leafy.leafyText.tween.delay(140).start();
    leafy.jumpsScore++;

    // shuffle platforms if possible
    moveFarPlatforms();
    placePlatforms();
    moveFarTrees();
  }
}

function genEasyPlatorms() {
  game.easyPlatorms = game.add.physicsGroup();

  var ground = game.add.tileSprite(0 , game.height-120, 500, 60, 'platform');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);

  ground = game.add.tileSprite(600 , game.height-250, 500, 60, 'platform');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);

  ground = game.add.tileSprite(900 , game.height-380, 500, 60, 'platform');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);
}
