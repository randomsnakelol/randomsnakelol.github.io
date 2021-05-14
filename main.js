var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var drawCar = function (x, y) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.fillRect(0 + x, 0 + y, 50, 50);
}
var carX = 0;
var carY = 0;
var speedX = 0;
var speedY = 0;

window.addEventListener('keydown', this.check, false);
// here to
var onHostClick = function () {
  var peer = new Peer(document.getElementById("channel").value);
  peer.on('connection', function (conn) {
    conn.on('data', function (data) {
      // Will print 'hi!'
      console.log(data);
    });
  })
}
var clickerButton = document.getElementById("connor7341");
clickerButton.addEventListener("click", onHostClick);
var onJoinClick = function () {
  var peer = new Peer();
  peer.on("open", function () {
    var conn = peer.connect(document.getElementById("channel").value);
    conn.on('open', function () {
      conn.send(document.getElementById("channel").value);
    });
  });

  console.log(document.getElementById("channel").value);
};

/////////////////////////////////////////////////////////////////////

var onHostClick = function () {
  var peer = new Peer(document.getElementById("channel").value);
  peer.on('connection', function (conn) {
    conn.on('data', function (data) {
      // Will print 'hi!'
      console.log(data);
    });
  })
  console.log(document.getElementById("channel").value, "Is the channel name");
};
var clickerButton = document.getElementById("connor7341");
clickerButton.addEventListener("click", onHostClick);

var onJoinClick = function () {
  var peer = new Peer();
  peer.on("open", function () {
    var conn = peer.connect(document.getElementById("channel").value);
    conn.on('open', function () {
      conn.send(document.getElementById("messages").value);
    });
  });

  console.log(document.getElementById("messages").value);
};
///////////////////////////////////////////////////////////////////////////
 var canvas = document.getElementById("ponner7341");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);
//////////////////////////////////////////
var clickButton = document.getElementById("ponnor7341");
clickButton.addEventListener("click", onJoinClick);
window.setInterval(this.everySecond, 1);
function check(e) {
  var code = e.keyCode;
  switch (code) {
    case 87: speedY -= 1; break //w
    case 83: speedY += 1; break //s
    case 65: speedX -= 1; break //a
    case 68: speedX += 1; break //d
  }
}
function everySecond() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  carY += speedY;
  carX += speedX;
  drawCar(carX, carY);
}