// Gaps

function placeGaps() {

  var gapCount = game.gaps.children.length;
  console.log('pillars: '+gapCount);

  for (var i=0; i<gapCount; i++) {

    var maxGapX = getLastGapX();
    var gapw = Math.floor(Math.random() * 230) + 100;
    var nextX = maxGapX + gapw ;

    // first should be 0
    if (i === 0) {
      nextX = 0;
    }

    // get from pool
    var gap = game.gaps.getFirstDead();
    gap.score = gapw;
    gap.touched = false;

    // randomize width
    // [todo] weighted
    var w = Math.floor(Math.random() * 400) + 50;

    // apply gap
    gap.reset(nextX, game.height-90);
    gap.width = w;
    gap.height = vars.gapHeight;

    // removed these since we're doing our own checks
    // but keeping around if we want later
    //game.gaps.setAll('checkWorldBounds', true);
    //game.gaps.setAll('outOfBoundsKill', true);

    console.log('--pillar:'+(i+1)+'--');
    console.log('width: '+w);
    console.log('x: '+nextX);
    console.log('gap width: '+gapw);
    console.log('last pillar x: '+maxGapX);
  }
}

function getLastGapX() {
  // find max x value
  var maxGapX = 0;
  game.gaps.forEach(function(gap) {
    maxGapX = Math.max(gap.x+gap.width,maxGapX);    
  });
  return maxGapX;
}

function resetGaps() {
  game.gaps.forEach(function(gap, index, array) {
    // [question] why are index & array null?
    // should be able to shiftGap(index)
    gap.kill();
    gap.x = 0;
    gap.alpha = 1;
  });
}

function shiftGap(index) {
  var index = index || 0;
  game.gaps[index].kill();
  game.gaps[index].alpha = 1;
  game.gaps[index].x = 0;
}