// # Preload
function preload() {

  // # Retina/high-dpi scaling
  // https://tristandunn.com/2014/01/24/rendering-svg-on-canvas/
  var canvas  = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  canvas.style.width  = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  canvas.width  *= vars.ratio;
  canvas.height *= vars.ratio;

  game.load.spritesheet('leafy', 'assets/walkcycle4x.png', 256, 256);
  game.load.image('ground', 'assets/ground.png');
  
  // just using the color for now...
  game.load.image('tree', 'assets/tree.png');

  // will replace with code-generated trees at some point...
  game.load.image('tree1', 'assets/tree1.png');
  game.load.image('tree2', 'assets/tree2.png');
  game.load.image('tree3', 'assets/tree3.png');
  game.load.image('tree4', 'assets/tree4.png');
  game.load.image('tree5', 'assets/tree5.png');
  game.load.image('tree6', 'assets/tree6.png');

}
