// random sound playbackrate
game.sfxding._sound.playbackRate.value = Math.random()*1.2+.9;


// rain
game.physics.arcade.overlap(game.leafy, game.emitter, passRain, null, this);
if (checkOverlap(game.leafy, game.emitter)) {
  console.log('raindrop');
  //passRain();
}

function passRain(leafy, leaf) {
  console.log('rain');
  if (!leaf.played) {
    //console.log('drop');
    leaf.played=true;
    game.blueLeafCount += 1;
    game.sfxding.play();
    game.blueLeafText.text = game.blueLeafCount;

    // [todo] match tween y value from blueLeaf pickup function
    leaf.tween = game.add.tween(leaf)
      .to({
        alpha: 0
      }, 1000, Phaser.Easing.Cubic.Out);
    leaf.tween.onComplete.add(function(leaf, tween) {
      leaf.kill();
    });
    leaf.tween.start();
  }
}


// # tween colors
// http://www.html5gamedevs.com/topic/7162-tweening-a-tint/?p=42712
// tweenTint(sprite, 0xff0000, 0x0000ff, 2000);
function tweenTint(obj, startColor, endColor, time) {
    // create an object to tween with our step value at 0
    var colorBlend = {step: 0};

    // create the tween on this object and tween its step property to 100
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);
    
    // run the interpolateColor function every time the tween updates, feeding it the
    // updated value of our tween each time, and set the result as our tint
    colorTween.onUpdateCallback(function() {
      obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);   
    });
    
    // set the object to the start color straight away
    obj.tint = startColor;    
    
    // start the tween
    colorTween.start();
}