var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var hostingButton = document.getElementById("hosting");
var myConn = null;

var text = 15;

var isHosting = function () {
  console.log(document.getElementById("channel").value, "is hosting");
  var peer = new Peer(document.getElementById("channel").value);
  peer.on("connection", function (conn) {
    myConn = conn;
    conn.on("data", function (data) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#808080";
      ctx.fillText(data, 300, text);
      text += 20;
    });
  });
};
hostingButton.addEventListener("click", isHosting);

var joiningButton = document.getElementById("ponnor7341");
var isJoining = function () {
  console.log(document.getElementById("channel").value, "is joining");

  var peer = new Peer();
  peer.on("open", function () {
    var conn = peer.connect(document.getElementById("channel").value);
    conn.on("open", function () {
      myConn = conn;
      myConn.on("data", function (data) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#808080";
        ctx.fillText(data, 300, text);
        text += 20;
      });
    });
  });
};
joiningButton.addEventListener("click", isJoining);

var chattingButton = document.getElementById("ronnor7341");
var chatting = function () {
  myConn.send(document.getElementById("messages").value);
  ctx.font = "20px Arial";
  ctx.fillStyle = "#0000ff";
  ctx.fillText(document.getElementById("messages").value, 5, text);
  text += 20;
};
chattingButton.addEventListener("click", chatting);
