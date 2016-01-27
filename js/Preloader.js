
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		this.preloadBar.y = this.world.height/2 - (this.preloadBar.height/2);
		this.load.setPreloadSprite(this.preloadBar);

		// load everything else...
		this.load.image('playButton', 'img/startbutton.png');
		
		this.load.spritesheet('leafy', 'img/leafy-v2.png', 128, 128);
		this.load.image('bgnight', 'img/bg-night.png');
		this.load.image('platform', 'img/platform.png');
		this.load.audio('bgnoise', 'audio/bgnoise.wav');
		this.load.audio('fall', 'audio/fall2.wav');

		// just using the color for now...
		this.load.image('tree', 'img/tree.png');

		// blue leaf pickup assets
		this.load.image('blueleaf', 'img/blueleaf.png');
		this.load.audio('ding', 'audio/pickup.wav');

		// flower
		this.load.image('flower', 'img/flower.png');

		// owl
		this.load.spritesheet('owl', 'img/sprite-owl.png', 256, 256);
		this.load.audio('hoot', 'audio/hoot.wav');

		// bee
		this.load.spritesheet('bee', 'img/sprite-bee.png', 256, 256);
		this.load.audio('buzz', 'audio/bee.wav');

		// will replace with code-generated trees at some point...
		this.load.image('treestump', 'img/treestump.png');
		this.load.image('tree1', 'img/tree1.png');
		this.load.image('tree2', 'img/tree2.png');
		this.load.image('tree3', 'img/tree3.png');
		this.load.image('tree4', 'img/tree4.png');
		this.load.image('tree5', 'img/tree5.png');
		this.load.image('tree6', 'img/tree6.png');
		this.load.image('tree7', 'img/tree7.png');
		this.load.image('tree8', 'img/tree8.png');
		this.load.image('tree9', 'img/tree9.png');
		this.load.image('tree10', 'img/tree10.png');

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('bgnoise') && this.ready === false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
