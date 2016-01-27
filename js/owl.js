// # Owl
function genOwl() {
  game.owl = game.add.sprite( game.stump.x - 55, game.stump.y - 90, 'owl');
  game.owl.scale.setTo(0.5, 0.5);
  game.sfxhoot = game.add.audio('hoot');
  // animations
  game.owl.animations.add('sit', [0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 10, true);
  game.owl.animations.add('blink', [0,1,2,0], 10, false);
  game.owl.animations.add('look', [0,3,4,4,4,4,4, 5,6,7,8,8,8,8,8,8,7,0], 10, false);
  game.owl.animations.add('flap', [0,10,11,12,13,14], 20, true);
  game.owl.animations.play('sit');
}

// # Leafy and owl collide
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
  var randomx = (Math.random()*(game.height+game.owl.height+1)); // magic number
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
