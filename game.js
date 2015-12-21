// # Leafy
// a phaser game experiment
// by dave rau

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'leafy', { preload: preload, create: create } );


// # Preload
function preload() {

  game.load.spritesheet('leafy', 'img/leafy.png', 128, 128);

}


// # Create
function create() {

  game.stage.backgroundColor = 0xF4F4F4;

  var leafy = game.add.sprite( game.world.width / 2 , game.world.height / 2, 'leafy');
  var walk = leafy.animations.add('walk');
  leafy.animations.play('walk', 15, true);

}

