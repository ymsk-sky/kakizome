var paper_color = "#FAFAFA";
var BLACK = "#000";

(window.onload = function() {
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");

  // サイズ調整
  var ua = navigator.userAgent;
  var iphone = ua.indexOf('iPhone') > 0;
  var android = ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0;
  var w = 242;
  var h = 333;
  if(iphone || android) {
    // 高さを基準に決定
    canvas.height = window.innerHeight - 160;
    canvas.width = w/h * canvas.height;
  }

  ctx.fillStyle = paper_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = BLACK;

  var mouse = {x:0, y:0, x1:0, y1:0, color:"black"};
  var draw = false;

  canvas.addEventListener("mousemove", function(e) {
    var rect = e.target.getBoundingClientRect();
    ctx.lineWidth = document.getElementById("lineWidth").value;
    ctx.globalAlpha = document.getElementById("alpha").value / 100;
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if(draw === true) {
      ctx.beginPath();
      ctx.moveTo(mouseX1, mouseY1);
      ctx.lineTo(mouseX, mouseY);
      ctx.lineCap = "round";
      ctx.stroke();
      mouseX1 = mouseX;
      mouseY1 = mouseY;
    }
  });

  canvas.addEventListener("mousedown", function(e) {
    draw = true;
    mouseX1 = mouseX;
    mouseY1 = mouseY;
    undoImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  });

  canvas.addEventListener("mouseup", function(e) {
    draw = false;
  });

  lineWidth.addEventListener("mousemove", function() {
    var lineNum = document.getElementById("lineWidth").value;
    document.getElementById("lineNum").innerHTML = lineNum;
  });

  alpha.addEventListener("mousemove",function() {
    var alphaNum = document.getElementById("alpha").value;
    document.getElementById("alphaNum").innerHTML = alphaNum;
  });

  $('li').click(function(){
    ctx.strokeStyle = $(this).css('background-color');
  });

  $('#clear').click(function(e) {
    if(!confirm('本当に消去しますか？')) return;
    e.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // function save() {
  //   var can = canvas.toDataURL("image/png");
  //   can = can.replace("image/png","image/octet-stream");
  //   window.open(can, "save");
  // }

  // スマホ対応
  var finger = new Array;
  for(var i=0; i<10; i++) {
    finger[i] = {x: 0, y: 0, x1: 0, y1: 0,
                 color: "rgb("
                        + Math.floor(Math.random() * 16) * 15
                        + ", "
                        + Math.floor(Math.random() * 16) * 15
                        +", "
                        + Math.floor(Math.random() * 16) * 15
                        + ")"
                };
  }

  canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    var rect = e.target.getBoundingClientRect();
    ctx.lineWidth = document.getElementById("lineWidth").value;
    ctx.globalAlpha = document.getElementById("alpha").value / 100;
    undoImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(var i=0; i<finger.length; i++) {
      finger[i].x1 = e.touches[i].clientX - rect.left;
      finger[i].y1 = e.touches[i].clientY - rect.top;
    }
  });

  canvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var rect = e.target.getBoundingClientRect();
    for(var i=0; i<finger.length; i++) {
      finger[i].x = e.touches[i].clientX - rect.left;
      finger[i].y = e.touches[i].clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(finger[i].x1, finger[i].y1);
      ctx.lineTo(finger[i].x, finger[i].y);
      ctx.lineCap = "round";
      ctx.stroke();
      finger[i].x1 = finger[i].x;
      finger[i].y1 = finger[i].y;
    }
  });

  lineWidth.addEventListener("touchmove", function() {
    var lineNum = document.getElementById("lineWidth").value;
    document.getElementById("lineNum").innerHTML = lineNum;
  });

  alpha.addEventListener("touchmove", function() {
    var alphaNum = document.getElementById("alpha").value;
    document.getElementById("alphaNum").innerHTML = alphaNum;
  });
})();

function name_checked(ischecked) {
  var name = document.getElementById('name_check').value;
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext('2d');

  if(ischecked) {
    ctx.lineWidth = 2;
    ctx.fillStyle = "#000";
    ctx.font = "50px Century"
    ctx.fillText(name, 15, 65);
  }
  else {
    ctx.lineWidth = 2;
    ctx.fillStyle = paper_color;
    ctx.font = "50px Century";
    ctx.fillText(name, 15, 65);
    ctx.strokeStyle = paper_color;
    ctx.strokeText(name, 15, 65);
  }
}

function clear_canvas() {
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = paper_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  document.getElementById("name_check").checked = false;
}

function _submit() {
    // picture_canvas_urlのvalueをcanvasの画像データに変更する
    var image_data = document.getElementById('mycanvas').toDataURL("image/png");
    document.getElementById("picture_canvas_url").value = image_data;

    var target = document.getElementById("new_picture");
    target.submit();
}
