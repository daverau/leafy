// Gaps

function placeGaps() {
  var gapCount = game.gaps.children.length;
  console.log('placeGaps: '+gapCount);

  for (var i=0; i<gapCount; i++) {

    var maxGapX = getLastGapX();
    var gapw = Math.floor(Math.random() * 230) + 100;
    var nextX = maxGapX + gapw ;

    // first pillar should be at x:0
    if (i === 0) {
      nextX = 0;
    }

    // get from pool
    var gap = game.gaps.getFirstDead();
    if (gap) {
      gap.score = gapw;
      gap.touched = false;

      // randomize width
      // [todo] weighted
      var w = Math.floor(Math.random() * 400) + 150;

      // apply gap
      gap.reset(nextX, game.height-90);
      gap.width = w;
      gap.height = vars.gapHeight;

      // removed these since we're doing our own checks
      // but keeping around if we want later
      //game.gaps.setAll('checkWorldBounds', true);
      //game.gaps.setAll('outOfBoundsKill', true);

      console.log('+++ pillar '+(i+1));
      console.log('width: '+w);
      console.log('gap: '+gapw);
      // console.log('x: '+nextX);
      // console.log('last pillar x: '+maxGapX);
    } else {
      //console.log('no dead gaps, move around first...');
    }
  }
}

function getLastGapX() {
  console.log('getLastGapX');
  // find max x value
  var maxGapX = 0;
  game.gaps.forEach(function(gap) {
    maxGapX = Math.max(gap.x+gap.width,maxGapX);    
  });
  return maxGapX;
}

function resetGaps() {
  console.log('resetGaps');
  game.gaps.forEach(function(gap, index, array) {
  //game.gaps.forEach(function(gap, index, array) {
    // [question] why are index & array null?
    // should be able to shiftGap(index)
    gap.kill();
    gap.x = 0;
    gap.alpha = 1;
  });
}

function moveFarGaps() {
  console.log('moveFarGaps');
  game.gaps.forEach(function(gap, index, array) {
    if ( (game.leafy.x - (gap.x + gap.width)) > game.width * 1.5 ) {
      gap.kill();
      gap.x = 0;
      gap.alpha = 1;
    }
  });
}

function shiftGap(index) {
  console.log('shiftGap');
  var index = index || 0;
  game.gaps[index].kill();
  game.gaps[index].alpha = 1;
  game.gaps[index].x = 0;
}


// # Leafy collide with gap
function gapTouch(leafy, gap) {
  if (!gap.touched) {
    console.log('gap touch');
    gap.touched = true;
    game.leafy.score += gap.score;
    game.leafyText.setText( gap.score +'in');

    // set jump score so it follows Leafy around
    game.leafyText.alpha = 1;
    game.leafyText.x = ((game.leafy.x/2) * vars.ratio);
    game.leafyText.y = (game.leafy.y/2 - 100) * vars.ratio;

    game.leafyText.tween.delay(500).start();
    
    // [todo] animate gap
    gap.alpha = .5;

    // shuffle gaps if possible
    moveFarGaps();
    placeGaps();
  }
}


