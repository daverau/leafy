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

      // [todo] place trees for this platform

    } else {
      //console.log('no dead platforms, move around first...');
    }
  }
}

// recycle rings as they fall off camera
function placeBluering(platform) {
  //console.log('ringstoRecycle: '+game.ringstoRecycle.length);
  //console.log('platformstoRecycle: '+game.platformstoRecycle.length);
  game.ringstoRecycle = game.bluerings.children.filter( offCamera );

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

function moveFarPlatforms() {
  //console.log('fn() moveFarPlatforms');

  game.platformstoRecycle.forEach(function(platform) {
    platform.kill();
    platform.x = 0;
  });
}

// # Leafy collide with platform
function platformTouch(leafy, platform) {
  if (!platform.touched) {
    platform.touched = true;

    // platform jump score
    touchPlatformScore(leafy, platform.score);

    // shuffle platforms if possible
    game.platformstoRecycle = game.platforms.children.filter( offCamera );

    moveFarPlatforms();
    placePlatforms();
    moveFarTrees();
  }
}
