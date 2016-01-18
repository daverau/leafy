// # Preload
function preload() {

  game.load.spritesheet('leafy', 'img/leafy-v2.png', 128, 128);
  game.load.image('ground', 'img/ground.png');
  game.load.image('bgnight', 'img/bg-night.png');
  game.load.image('gap', 'img/gap.png');

  // just using the color for now...
  game.load.image('tree', 'img/tree.png');

  // blue leaf pickup assets
  game.load.image('blueleaf', 'img/blueleaf.png');
  game.load.audio('ding', 'audio/pickup.wav');

  // flower
  game.load.image('flower', 'img/flower.png');

  // owl
  game.load.spritesheet('owl', 'img/sprite-owl.png', 256, 256);
  game.load.audio('hoot', 'audio/hoot.wav');
  game.load.audio('bgnoise', 'audio/bgnoise.wav');

  // bee
  game.load.spritesheet('bee', 'img/sprite-bee.png', 256, 256);
  game.load.audio('buzz', 'audio/bee.wav');

  // will replace with code-generated trees at some point...
  game.load.image('treestump', 'img/treestump.png');
  game.load.image('tree1', 'img/tree1.png');
  game.load.image('tree2', 'img/tree2.png');
  game.load.image('tree3', 'img/tree3.png');
  game.load.image('tree4', 'img/tree4.png');
  game.load.image('tree5', 'img/tree5.png');
  game.load.image('tree6', 'img/tree6.png');
  game.load.image('tree7', 'img/tree7.png');
  game.load.image('tree8', 'img/tree8.png');
  game.load.image('tree9', 'img/tree9.png');
  game.load.image('tree10', 'img/tree10.png');

  // motion paths
  //game.owlpath = [null,{"type":0,"closed":false,"x":[0,128,256,399,512,640],"y":[267,391,249,224,35,100]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[111,141,163,57,263,265]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[252,176,372,316,378,63]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[161,272,306,39,396,389]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[41,218,53,389,344,109]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[360,317,355,329,355,242]},{"type":0,"closed":false,"x":[0,128,256,384,512,640],"y":[179,221,342,388,89,46]},{"type":1,"closed":false,"x":[111,128,293,253,514,453],"y":[-4,184,354,82,104,415]}];
}
