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
  onDeviceReady: function() {
    app.receivedEvent('deviceready');

    // # GA Event tracking
    // [todo] build this out more
    // total play time
    // high score
    // x continues
    // acorns earned
    // acorns spent
    // ...
    if (window.ga) {
      console.log('--ga--');
      window.ga.startTrackerWithId('UA-5536882-24');
      window.ga.trackView('Boot');
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
    game.state.add('Win', BasicGame.Win);

    // start
    game.state.start('Boot'); // start it up, yo
  },
  receivedEvent: function(id) {
  }
};
