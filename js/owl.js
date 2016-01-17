
function passOwl(leafy, owl) {
  // console.log('Owl says hi!');
  // owl should fly away if you don't have enough blue leaves yet...
  if (!game.owl.flying) {
    //console.log('go fly');
    game.owl.flying = true;
    owlFlyaway(leafy, owl);
  }
}
function owlFlyaway(leafy, owl) {
  //console.log('flying');
  game.sfxhoot.play();
  game.owl.animations.play('flap');
  var randomx = (Math.random()*2000+1); // magic number
  randomx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  var t = game.add.tween(game.owl).to( { x: (game.stump.x + randomx ), y: (game.stump.y - 1500) }, 3000, null, true); // [todo] move out once I build new interactions for later play
  t.onComplete.add(owlFlytostump, this);
}

function owlFlytostump() {
  game.owl.animations.play('flap');
  var t = game.add.tween(game.owl).to( { x: (game.stump.x - 55), y: (game.stump.y - 90) }, 10000, null, true); // [todo] move out once I build new interactions for later play
  t.onComplete.add( stopOwl , this);
}

function stopOwl() {
  game.owl.animations.play('sit');
  game.owl.flying = false;
}
