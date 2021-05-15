var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var hostingButton = document.getElementById("hostButton");
var myConn = null;

var text = 15;

var chattingButton = document.getElementById("sendButton");
chattingButton. disabled = true
var chatting = function () {

    myConn.send(document.getElementById('messages').value);
    agnapfn
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0000ff";
    ctx.fillText(document.getElementById('messages').value, 5, text);
    text += 20;

};
chattingButton.addEventListener("click", chatting);


var isHosting = function () {
    console.log(document.getElementById('channel').value, "is hosting");
    var peer = new Peer(document.getElementById('channel').value);
    peer.on('connection', function (conn) {
      chattingButton. disabled = false
        myConn = conn;
        conn.on('data', function (data) {
          ctx.font = "20px Arial";
          ctx.fillStyle = "#808080";
          ctx.fillText(data, 300, text);
          text += 20; 
        });
    });
};
hostingButton.addEventListener("click", isHosting);



var joiningButton = document.getElementById("joinButton");
var isJoining = function () {
    console.log(document.getElementById('channel').value, "is joining");
    var peer = new Peer();
    peer.on("open", function () {
        var conn = peer.connect(document.getElementById('channel').value); conn.on('open', function  () {
          chattingButton. disabled = false
            myConn = conn;
            myConn.on('data', function (data) {
              ctx.font = "20px Arial";
              ctx.fillStyle = "#808080";
              ctx.fillText(data, 300, text);
              text += 20;
            })
        })
        
    });

};

joiningButton.addEventListener("click", isJoining);


