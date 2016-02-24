// Platforms

function placePlatforms() {
  var platformCount = game.platforms.children.length;
  //console.log('placePlatforms(): '+platformCount);

  for (var i=0; i<platformCount; i++) {

    var maxPlatformX = getLastPlatformX();
    //console.log('maxPlatformX:'+maxPlatformX);

    // gaps
    var gapw = Math.floor(Math.random() * 50) + 100;
    //var gapw = 100;
      if (game.leafy.x/10 > 1000) {
        // level 2
        var gapw = Math.floor(Math.random() * 150) + 100;
        //console.log('level 2 platforms');
      }
      if (game.leafy.x/10 > 2000) {
        // level 3
        var gapw = Math.floor(Math.random() * 230) + 100;
        //console.log('level 3 platforms');
      }
    //console.log('gap: '+gapw);
    //var gapws = ['200', '330'];
    //var gapw = gapws[Math.floor(Math.random()*gapws.length)];
    //console.log('gapw:'+gapw);

    var nextX = maxPlatformX + gapw ;
    //console.log('nextX:'+nextX);

    // get from pool
    var platform = game.platforms.getFirstDead();
    if (platform) {
      platform.score = gapw;
      platform.touched = false;

      // set a platform ID, for state tracking ... bleh
      if (!platform.i) {
        platform.i = i;
      }

      // randomize width
      //var w = Math.floor(Math.random() * 400) + 150;

      // weighted platform widths
      // easy game mechanic value to adjust over time based on leafy.x
      var widths = ['250', '550'];
      if (game.leafy.x/10 > 1000) {
        // level 2
        var widths = ['80', '150', '250'];
        //console.log('level 2 platforms');
      }
      if (game.leafy.x/10 > 2000) {
        // level 3
        var widths = ['50', '90', '150'];
        //console.log('level 3 platforms');
      }
      var w = widths[Math.floor(Math.random()*widths.length)];

      // apply platform
      platform.reset(nextX, game.height-90);
      platform.width = w;
      platform.nextX = nextX;
      platform.height = vars.platformHeight;

      //console.log('+ move ring for platform: '+platform.i + ' at x: ' + platform.x);
      placeBluering(platform);

      // [todo] place trees for this platform

    } else {
      //console.log('...no dead platforms...');
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

function resetFarPlatforms() {
  //console.log('fn() resetFarPlatforms');

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

    resetFarPlatforms();
    placePlatforms();
    moveFarTrees();
  }
}
