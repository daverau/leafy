var app = {
  initialize: function() {
    this.bindEvents();
  },
  // # Bind Event Listeners
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);

    // # pause/resume
    var $pause = document.getElementById("pause");
    $pause.addEventListener("touchstart", gamePause, false);
    function gamePause(e) {
      if (!game.paused) {
        game.paused = true;
        $pause.classList.add('paused');
        game.raf.stop();
      } else {
        game.paused = false;
        $pause.classList.remove('paused');
        game.raf.start();
      }
    }

  },
  // # deviceready Event Handler
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');

    // # GA Event tracking
    if (window.analytics) {
      window.analytics.startTrackerWithId('UA-5536882-24');
      window.analytics.trackView('playing');
    }

    // # Create Phaser game
    // retina full-screen canvas, y'all
    var w = window.innerWidth*window.devicePixelRatio;
    var h = window.innerHeight*window.devicePixelRatio;
    game = new Phaser.Game(w,h, Phaser.CANVAS, 'game');

    // # Game states
    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Game', BasicGame.Game);
    game.state.add('GameOver', BasicGame.GameOver);

    game.state.start('Boot'); // start it up, yo

  },
  // # Update DOM on a Received Event
  receivedEvent: function(id) {

    // var parentElement = document.getElementById(id);
    // var listeningElement = parentElement.querySelector('.listening');
    // var receivedElement = parentElement.querySelector('.received');

    // listeningElement.setAttribute('style', 'display:none;');
    // receivedElement.setAttribute('style', 'display:block;');

    // console.log('Received Event: ' + id);
  }
};
