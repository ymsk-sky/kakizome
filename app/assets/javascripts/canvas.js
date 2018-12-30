var paper_color = "#FFFFF4";
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

  $('li').click(function(){
    ctx.strokeStyle = $(this).css('background-color');
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
})();

function name_checked(ischecked) {
  var fillTategaki = function(context, text, x, y) {
    var textList = text.split('\n');
    var lineHeight = context.measureText("あ").width;
    textList.forEach(function(elm, i) {
      Array.prototype.forEach.call(elm, function(ch, j) {
        context.fillText(ch, x - lineHeight * i, y + lineHeight * j);
      });
    });
  };

  var strokeTategaki = function(context, text, x, y) {
    var textList = text.split('\n');
    var lineHeight = context.measureText("あ").width;
    textList.forEach(function(elm, i) {
      Array.prototype.forEach.call(elm, function(ch, j) {
        context.strokeText(ch, x - lineHeight * i, y + lineHeight * j);
      });
    });
  };

  var name = document.getElementById('name_check').value;
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext('2d');

  ctx.lineWidth = 2;
  ctx.font = "30px Century"

  var n_x = 10;
  var n_y = canvas.height - name.length * 30;

  if(ischecked) {
    ctx.fillStyle = "#000";
    fillTategaki(ctx, name, n_x, n_y);
  }
  else {
    ctx.fillStyle = paper_color;
    fillTategaki(ctx, name, n_x, n_y);
    ctx.strokeStyle = paper_color;
    strokeTategaki(ctx, name, n_x, n_y);
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
  }
}

function clear_canvas() {
  if(!confirm("やり直しますか？")) return;
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = paper_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = BLACK;
  document.getElementById("name_check").checked = false;
}

function _submit() {
    // picture_canvas_urlのvalueをcanvasの画像データに変更する
    var canvas = document.getElementById('mycanvas');
    var img_data = canvas.toDataURL("image/png");

    var blob = Base64toBlob(img_data);

    document.getElementById("picture_canvas_url").value = img_data;

    var target = document.getElementById("new_picture");
    target.submit();
}

function Base64toBlob(base64) {
	var tmp = base64.split(',');
	var data = atob(tmp[1]);
	var mime = tmp[0].split(':')[1].split(';')[0];
	var buf = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
		buf[i] = data.charCodeAt(i);
	}
	var blob = new Blob([buf], { type: mime });
	return blob;
}
