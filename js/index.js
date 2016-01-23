var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');

    //  Create Phaser game
    //var w = 568;
    //var h = 320;
    var w = window.innerWidth*window.devicePixelRatio;
    var h = window.innerHeight*window.devicePixelRatio;
    game = new Phaser.Game(w,h, Phaser.CANVAS, 'game');

    //  States
    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Game', BasicGame.Game);

    //  Start
    game.state.start('Boot');

  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    // var parentElement = document.getElementById(id);
    // var listeningElement = parentElement.querySelector('.listening');
    // var receivedElement = parentElement.querySelector('.received');

    // listeningElement.setAttribute('style', 'display:none;');
    // receivedElement.setAttribute('style', 'display:block;');

    // console.log('Received Event: ' + id);
  }
};
