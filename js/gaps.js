// Gaps

function createGaps() {
  var gapCount = game.gaps.children.length;
  console.log('gaps: '+gapCount);
  for (var i=0; i<gapCount; i++) {
    //console.log('--GAP:'+(i+1)+'--');

    var maxGapX = getLastGapX();
    var gapw = Math.floor(Math.random() * 230) + 100;
    var nextX = maxGapX + gapw;

    // first should be 0
    if (i === 0) {
      nextX = 0;
    }

    // get from pool
    var gap = game.gaps.getFirstDead();
    //gap.score = gapw;

    // randomize width
    // [todo] weighted
    var w = Math.floor(Math.random() * 400) + 50;

    // apply gap
    gap.reset(nextX, game.height-90);
    gap.width = w;
    gap.height = vars.gapHeight;

    //console.log('width: '+w);
    //console.log('x: '+nextX);
    //console.log('gap: '+gapw);
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
  game.gaps.forEach(function(gap) {
    gap.kill();
    gap.x=0;
  });
}