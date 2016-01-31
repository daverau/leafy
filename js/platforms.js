// Platforms

function placePlatforms() {
  var platformCount = game.platforms.children.length;
  //console.log('fn: placePlatforms(): '+platformCount);

  for (var i=0; i<platformCount; i++) {

    var maxPlatformX = getLastPlatformX();
    var platformw = Math.floor(Math.random() * 230) + 100;
    var nextX = maxPlatformX + platformw ;

    // first pillar should be at x:0
    if (i === 0) {
      nextX = 0;
    }

    // get from pool
    var platform = game.platforms.getFirstDead();
    if (platform) {
      platform.score = platformw;
      platform.touched = false;

      // randomize width
      // [todo] weighted
      var w = Math.floor(Math.random() * 400) + 150;

      // apply platform
      platform.reset(nextX, game.height-90);
      platform.width = w;
      platform.height = vars.platformHeight;

      // removed these since we're doing our own checks
      // but keeping around if we want later
      //game.platforms.setAll('checkWorldBounds', true);
      //game.platforms.setAll('outOfBoundsKill', true);

      //console.log('---platform'+i+1+'---');
      //console.log(w+'w ('+platformw+')');
      // console.log('x: '+nextX);
      // console.log('last pillar x: '+maxPlatformX);
    } else {
      //console.log('no dead platforms, move around first...');
    }
  }
}

function getLastPlatformX() {
  //console.log('fn: getLastPlatformX()');
  // find max x value
  var maxPlatformX = 0;
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x+platform.width,maxPlatformX);    
  });
  return maxPlatformX;
}

function resetPlatforms() {
  //console.log('fn() resetPlatforms');
  game.platforms.forEach(function(platform, index, array) {
    // [question] why are index & array null?
    // should be able to shiftPlatform(index)
    platform.kill();
    platform.x = 0;
    //platform.alpha = 1;
  });
}

function moveFarPlatforms() {
  //console.log('fn() moveFarPlatforms');
  game.platforms.forEach(function(platform, index, array) {
    if ( (game.leafy.x - (platform.x + platform.width)) > game.width * 1.5 ) {
      platform.kill();
      platform.x = 0;
      //platform.alpha = 1;
    }
  });
}

function shiftPlatform(index) {
  //console.log('fn() shiftPlatform');
  var index = index || 0;
  game.platforms[index].kill();
  //game.platforms[index].alpha = 1;
  game.platforms[index].x = 0;
}


// # Leafy collide with platform
function platformTouch(leafy, platform) {
  if (!platform.touched) {
    //console.log('fn() platform touch');
    leafy.leafyText.tween.stop();
    leafy.leafyText.tween.pendingDelete = false; // http://www.html5gamedevs.com/topic/16641-restart-tween/
    platform.touched = true;
    
    if (game.leafy.score === 0) {
      // runmode,always run tothe right?
      vars.runmode = true;
      game.leafy.score = 1;
    } else {
      game.leafy.score = Number(platform.score) + Number(game.leafy.score);
      leafy.leafyText.setText( platform.score );
    }

    // set jump score so it follows Leafy around
    leafy.leafyText.alpha = 1;
    leafy.leafyText.x = ((game.leafy.x/2) * vars.ratio);
    leafy.leafyText.y = (game.leafy.y/2 - 80) * vars.ratio;
    leafy.leafyText.tween.delay(140).start();
    
    // [todo] animate platform
    //platform.alpha = .5;

    leafy.jumpsScore++;

    // shuffle platforms if possible
    moveFarPlatforms();
    placePlatforms();
    moveFarTrees();
  }
}


function genEasyPlatorms() {

  game.easyPlatorms = game.add.physicsGroup();

  var ground = game.add.tileSprite(0 , game.height-120, 500, 60, 'gap');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);

  ground = game.add.tileSprite(600 , game.height-250, 500, 60, 'gap');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);

  ground = game.add.tileSprite(900 , game.height-380, 500, 60, 'gap');
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  ground.body.allowGravity = false;
  game.easyPlatorms.add(ground);


}
