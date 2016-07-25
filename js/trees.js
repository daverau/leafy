// # Trees

Tree = function (game, x, y) {
  var treeimg = 'tree' + Math.floor(Math.random() * 10 + 1);
  console.log('+ tree');
  Phaser.Sprite.call(this, game, x, y, treeimg);
  this.anchor.setTo(0.5,1);
  this.scale.setTo(0.5);
  if (game.state.current === 'Game') {
    game.physics.arcade.enable(this);
    this.body.velocity.x = vars.gameSpeed;
  }
};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.update = function() {
  if ( offCamera(this) ) {
    resetMove(
      this,
      Math.floor(Math.random() * (game.width * 1.5) + (game.width * 2.5)));
  }
};

function genTrees() {
  console.log('trees: ' + vars.treeCount);
  game.trees = game.add.group();
  game.trees.enableBody = true;
  for (var i=0; i<vars.treeCount; i++) {
    var tree = new Tree(game, game.rnd.between(0, game.width), game.height-vars.platformHeight);
    game.trees.add(tree);
  }
}


// # Stump for owl
function genStump() {
  game.stump = game.add.sprite(0,0, 'treestump');
  game.stump.anchor.setTo(0.5,0);
  game.stump.x = (vars.worldSize / 2) + (game.width/3);
  game.stump.y = game.height - (game.stump.height + vars.platformHeight);
  game.stump.enableBody = true;
}
