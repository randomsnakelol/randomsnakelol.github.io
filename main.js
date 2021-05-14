var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.addEventListener("keydown", this.check, false);
// here to
var onHostClick = function () {
  var peer = new Peer(document.getElementById("channel").value);
  peer.on("connection", function (conn) {
    conn.on("data", function (data) {
      // Will print 'hi!'
      console.log(data);
    });
  });
};
var clickerButton = document.getElementById("connor7341");
clickerButton.addEventListener("click", onHostClick);
var onJoinClick = function () {
  var peer = new Peer();
  peer.on("open", function () {
    var conn = peer.connect(document.getElementById("channel").value);
    conn.on("open", function () {
      conn.send(document.getElementById("channel").value);
    });
  });

  console.log(document.getElementById("channel").value);
};

/////////////////////////////////////////////////////////////////////

var onHostClick = function () {
  var peer = new Peer(document.getElementById("channel").value);
  peer.on("connection", function (conn) {
    conn.on("data", function (data) {
      // Will print 'hi!'
      console.log("Received message", data);
    });
  });
  console.log(document.getElementById("channel").value, "Is the channel name");
};
var clickerButton = document.getElementById("connor7341");
clickerButton.addEventListener("click", onHostClick);

var onJoinClick = function () {
  var peer = new Peer();
  peer.on("open", function () {
    var conn = peer.connect(document.getElementById("channel").value);
    conn.on("open", function () {
      conn.send(document.getElementById("messages").value);
    });
  });

  console.log(document.getElementById("messages").value);
};

var onSendClick = function () {
  var peer = new Peer();
  peer.on("open", function () {
    var conn = peer.connect(document.getElementById("messages").value);
    conn.on("open", function () {
      conn.send(document.getElementById("messages").value);
    });
  });

  console.log(document.getElementById("messages").value);
  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50);
};
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
var clickButton = document.getElementById("ponnor7341");
clickButton.addEventListener("click", onJoinClick);
