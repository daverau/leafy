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
        this.x = lastX + 360;
        placeRingJump(this);
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
    if (!coin) {
      // console.log('!!! 0 coins for platform ' + platform.x + ' !!!');
      //console.log('+1 coins (' + game.coins.children.length + ')');
      coin = new Blueleaf(game, -100, 0);
      game.coins.add(coin);
    }

    resetMove(
      coin,
      platform.x + 60 + (i * 60),
      platform.y - 60
    );
    coin.body.velocity.x = vars.gameSpeed;
  }
}

// acorn coin ring, was the old blueleaf ring
function placeRing(platform) {
  var coinCount = Math.floor( (platform.width-120) / 60);

  //console.log('coin ring: ' + coinCount);
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  for (i = 0; i <= coinCount; i++) {
    var coin = game.coinstoRecycle[i];
    if (!coin) {
      // console.log('!!! 0 coins for ring ' + platform.x + ' !!!');
      // console.log('+1 coins (' + game.coins.children.length + ')');
      coin = new Blueleaf(game, -100, 0);
      game.coins.add(coin);
    }

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
  }
}


// acorn ring jump with another platform to land on afterwards
function placeRingJump(platform) {
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  for (i = 0; i <= 4; i++) {
    var coin = game.coinstoRecycle[i];
    if (!coin) {
      console.log('!!! 0 coins for ringJump ' + platform.x + ' !!!');
      console.log('+1 coins (' + game.coins.children.length + ')');
      coin = new Blueleaf(game, -100, 0);
      game.coins.add(coin);
    }

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
    coin.body.velocity.x = vars.gameSpeed;
  }
}

// platform helper to get last X coordinate
function getLastPlatformX() {
  var maxPlatformX = 0;
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x + platform.width,maxPlatformX);
  });
  return maxPlatformX;
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
  }
}

// final platform with doorway
function addFinalPlatform() {
  console.log('+ final platform');

  // generate final platform in case one isn't available offCamera
  addPlatform(10);
  game.platforms.children[9].x = game.width;
  game.platforms.children[9].y = game.height-vars.platformHeight;
  game.platforms.children[9].width = game.width;

  game.doorwaytree = new DoorwayTree(game, game.platforms.children[9].x + 300, game.height-vars.platformHeight);
  game.trees.add(game.doorwaytree);
}
