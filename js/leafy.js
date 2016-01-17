// Leafy setup
function playerMove(leafy) {

  if (cursors.left.isDown) {

    leafy.body.velocity.x = (leafy.playerSpeed * -1); // [todo] speed boost variable
    if (leafy.facing != 'left') {
      leafy.facing = 'left';
      leafy.scale.x = -1; //flipped
    }

  } else if (cursors.right.isDown) {

    leafy.body.velocity.x = leafy.playerSpeed;
    if (leafy.facing != 'right') {
      leafy.scale.x = 1; //default direction
      leafy.facing = 'right';
    }

  } else if (leafy.facing != 'idle') {
    
    leafy.animations.play('turn');
    if (leafy.facing == 'left') {
      leafy.frame = 0;
    } else {
      leafy.frame = 5;
    }
    leafy.facing = 'idle';
  }

  // walk when moving left or right (correctly continues playing)
  if (cursors.left.isDown || cursors.right.isDown && (leafy.body.onFloor() || leafy.body.touching.down)) {
    leafy.animations.play('walk');
  }

  // walk when moving left or right (correctly continues playing)
  if (plantButton.isDown) {
    plantTree(leafy);
  }

  // player jump
  if (jumpButton.isDown && (leafy.body.onFloor() || leafy.body.touching.down)) {
      leafy.animations.play('jump');
      leafy.body.velocity.y = leafy.jumpHeight;
  }

}


function plantTree(leafy) {
  if (!leafy.planting) {
    leafy.planting = true;
    console.log('plant tree');
  }
  // var bomb, bomb_name, bomb_position, bomb_properties;
  // // get the first dead bomb from the pool
  // bomb_name = this.name + "_bomb_" + this.game_state.groups.bombs.countLiving();
  // bomb_position = new Phaser.Point(this.x, this.y);
  // bomb_properties = {"texture": "bomb_spritesheet", "group": "bombs", bomb_radius: 3};
  // bomb = Bomberman.create_prefab_from_pool(this.game_state.groups.bombs, Bomberman.Bomb.prototype.constructor, this.game_state, bomb_name, bomb_position, bomb_properties);
}


function respawn(leafy) {
  //console.log('respawn');
  leafy.body.position.x = vars.worldSize/2;
  leafy.body.position.y = -100;
  leafy.body.velocity.x = 0;
  leafy.body.velocity.y = 0;
  leafy.playerSpeed = 150 * vars.ratio;
  leafy.revive();
}
