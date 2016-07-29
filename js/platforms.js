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
    if ( (this.position.x + this.width) < -10) {
      //console.log('--platform ' + this.id + '--');
      var level = isLevel();

      // reset touch
      this.touched = false;

      // random width
      this.width = vars.platformWidths[vars.platformLevels[level].widths[Math.floor(Math.random()*vars.platformLevels[level].widths.length)] -1];

      // random height
      this.y = game.height -  (vars.platformHeights[vars.platformLevels[level].heights[Math.floor(Math.random()*vars.platformLevels[level].heights.length)] -1]);

      // set new X position based on last X
      this.x = getLastPlatformX() + vars.platformGaps[vars.platformLevels[level].gaps[Math.floor(Math.random()*vars.platformLevels[level].gaps.length)] -1];

      // coins?
      var yesCoins = vars.coinLuck[Math.floor(Math.random()*vars.coinLuck.length)];
      if (yesCoins === 1) {
        //console.log(platform.width);
        if (platform.width > 50) {
          placeCoins(platform);
        }
      // coin rings
      } else if (yesCoins === 2) {
          //placeBluering(platform);
      }

      // set level text if ready
      setLevelText();
    }
  }
}

function getLastPlatformX() {
  var maxPlatformX = 0;
  game.platforms.forEach(function(platform) {
    maxPlatformX = Math.max(platform.x+platform.width,maxPlatformX);
  });
  return maxPlatformX;
}

// coin platforms
function placeCoins(platform) {
  var coinCount = Math.floor( (platform.width-120) / 60);
  //console.log('long platform with coins: ' + coinCount);
  game.coinstoRecycle = game.coins.children.filter( offCamera );
  //console.log(game.coinstoRecycle);
  for (i = 0; i <= coinCount; i++) {
    var coin = game.coinstoRecycle[i];
    //console.log(coin);
    if (coin) {
      coin.pos.y = platform.y - 60;
      resetLeaf(coin);
      coin.reset( platform.x + 60 + (i * 60), platform.y - 60 );
      coin.body.velocity.x = vars.gameSpeed;
    } else {
      //console.log('0 coins');
    }
  }
}

// recycle rings as they fall off camera
function placeBluering(platform) {
  game.ringstoRecycle = game.bluerings.children.filter( offCamera );
  var ring = game.ringstoRecycle[0];
  if (ring) {
    ring.platformId = platform.id;
    ring.x = platform.x + platform.width;
    ring.y = platform.y - 190;
    console.log('place ring: ' + ring.x);
    ring.children.forEach(function(blueleaf) {
      resetLeaf(blueleaf);
    });

    ring.update = function () {
      this.x = game.platforms.children[this.platformId - 1].body.x;
      if (this.x + this.width < - 10) {
        console.log('reset this ring');
      }
    }

  } else {
    console.log('!!! 0 rings !!!');
  }
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
  game.platforms.children[1].x = game.width;
  game.platforms.children[1].y = game.height-vars.platformHeight;
  game.platforms.children[1].width = game.width;

  game.doorwaytree = new DoorwayTree(game, game.platforms.children[1].x + 300, game.height-vars.platformHeight);
  game.trees.add(game.doorwaytree);
}
