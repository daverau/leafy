// Platforms
function addPlatform(id) {
  // Create a pipe at the position x and y
  var platform = game.add.sprite(0, game.height - vars.platformHeight, 'platform');
  platform.scale.setTo(0.5);
  platform.id = id;

  // Add the pipe to our previously created group
  game.platforms.add(platform);

  // Enable physics on the pipe
  game.physics.arcade.enable(platform);

  // Add velocity to the pipe to make it move left
  platform.body.velocity.x = vars.gameSpeed;
  platform.body.immovable = true;

  platform.update = function () {
    if ( offCamera(this) ) {
      //console.log('--move platform ' + this.id + '--');
      var level = isLevelX( vars.score + vars.worldSize );
      var lastX = getLastPlatformX();

      // reset touch
      this.touched = false;

      // random width
      this.width = vars.platformWidths[vars.platformLevels[level].widths[Math.floor(Math.random()*vars.platformLevels[level].widths.length)] -1];

      // random height
      this.y = game.height -  (vars.platformHeights[vars.platformLevels[level].heights[Math.floor(Math.random()*vars.platformLevels[level].heights.length)] -1]);

      // set new X position based on last X
      this.x = lastX + vars.platformGaps[vars.platformLevels[level].gaps[Math.floor(Math.random()*vars.platformLevels[level].gaps.length)] -1];

      // coins?
      this.yesCoins = vars.coinLuck[Math.floor(Math.random()*vars.coinLuck.length)];
      if (this.yesCoins === 1) {
        if (platform.width > 50) {
          placeCoins(this);
        }

      // coin rings
      } else if (this.yesCoins === 2) {
        this.width = 360;
        placeRing(this);

      // coin ring jump
      } else if (this.yesCoins === 3) {
        this.width = 360;
        //this.x = this.x - this.width;
        placeRingJump(this);
        //lastX
      }

      // set level text if ready
      setLevelText();
    }
  }
}

// coin platforms
function placeCoins(platform) {
  var coinCount = Math.floor( (platform.width-120) / 60);
  //console.log('--platform with: ' + coinCount + ' coins--');
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  for (i = 0; i <= coinCount; i++) {
    var coin = game.coinstoRecycle[i];
    if (coin) {
      resetMove(
        coin,
        platform.x + 60 + (i * 60),
        platform.y - 60
      );
      coin.body.velocity.x = vars.gameSpeed;
    } else {
      console.log('!!! 0 coins for platform ' + platform.x + ' !!!');
    }
  }
}

// acorn coin ring, was the old blueleaf ring
function placeRing(platform) {
  var coinCount = Math.floor( (platform.width-120) / 60);

  //console.log('coin ring: ' + coinCount);
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  for (i = 0; i <= coinCount; i++) {
    var coin = game.coinstoRecycle[i];
    if (coin) {
      resetMove(
        coin,
        platform.x + 60 + (i * 60),
        platform.y - 160 - (i * 30)
      );
      if (i === 0 || i === 4) {
        coin.y = platform.y - 90;
      }
      if (i === 1 || i === 3) {
        coin.y = platform.y - 130;
      }
      if (i === 2) {
        coin.y = platform.y - 150;
      }
      coin.body.velocity.x = vars.gameSpeed;
    } else {
      console.log('0 coins for ring');
    }
  }
}


// acorn ring jump with another platform to land on afterwards
function placeRingJump(platform) {
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  for (i = 0; i <= 5; i++) {
    var coin = game.coinstoRecycle[i];
    if (coin) {
      //coin.tint = Math.random() * 0xffffff;

      resetMove(
        coin,
        (platform.x) - 60 - (i * 60),
        platform.y - 160 - (i * 30)
      );

      if (i === 0 || i === 4) {
        coin.y = platform.y - 90;
      }
      if (i === 1 || i === 3) {
        coin.y = platform.y - 130;
      }
      if (i === 2) {
        coin.y = platform.y - 150;
      }
      coin.alpha = 0.65;
      coin.body.velocity.x = vars.gameSpeed;
    } else {
      console.log('0 coins for ring');
    }
  }

  // set landing platform
  //var nextPlatform = getLastPlatform();
  //console.log(nextPlatform);
  //nextPlatform.x = platform.x - platform.width;
  //nextPlatform.y = 100;
}

// platform helper to get last X coordinate
function getLastPlatformX() {
  var maxPlatformX = 0;
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x + platform.width,maxPlatformX);
  });
  return maxPlatformX;
}

// platform helper to get last platform object
function getLastPlatform() {
  var maxPlatformX = 0;
  var plat = {};
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x + platform.width, maxPlatformX);
    if (platform.x + platform.width >= maxPlatformX) {
      plat = platform;
    }
  });
  return plat;
}

// # Leafy collide with platform
function platformTouch(leafy, platform) {
  //console.log('fn() platformTouch');
  game.leafy.position.x = vars.leafyXposition;
  if (!platform.touched) {
    platform.touched = true;

    // random color platform on jump
    // cool effect, saving this for later...
    //leafy.tint = Math.random() * 0xffffff;

    // platform jump score
    // touchPlatformScore(leafy, platform.score);
  }
}

// final platform with doorway
function addFinalPlatform() {
  console.log('+ final platform');

  // get an offcamera platform from left or right (both)
  var platforms = game.platforms.children.filter( offCameraBoth );
  platforms[0].x = game.width;
  platforms[0].y = game.height-vars.platformHeight;
  platforms[0].width = game.width;

  game.doorwaytree = new DoorwayTree(game, platforms[0].x + 300, game.height-vars.platformHeight);
  game.trees.add(game.doorwaytree);
}
