var liveServer = require("live-server");

var params = {
    ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 300 // Waits for all changes, before reloading. Defaults to 0 sec.
};

liveServer.start(params);