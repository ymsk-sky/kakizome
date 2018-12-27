var paper_color = "#FAFAFA";

(window.onload = function() {
  var canvas = document.getElementById('mycanvas');

  // TODO: 画面幅に合わせる
  canvas.width = screen.width / 8;
  canvas.height = screen.height / 4;

  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = paper_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var defosize = 7;
  var defocolor = "#000";
  var defoalpha = 1.0;

  var mouseX = "";
  var mouseY = "";

  //各イベントに紐づけ
  canvas.addEventListener('mousemove', onMove, false);
  canvas.addEventListener('mousedown', onClick, false);
  canvas.addEventListener('mouseup', drawEnd, false);
  canvas.addEventListener('mouseout', drawEnd, false);

  //マウス動いていて、かつ左クリック時に発火。
  function onMove(e) {
    if (e.buttons === 1 || e.witch === 1) {
      var rect = e.target.getBoundingClientRect();
      var X = ~~(e.clientX - rect.left);
      var Y = ~~(e.clientY - rect.top);
      //draw 関数にマウスの位置を渡す
      draw(X, Y);
    };
  };

  //マウスが左クリックされると発火。
  function onClick(e) {
    if (e.button === 0) {
      var rect = e.target.getBoundingClientRect();
      var X = ~~(e.clientX - rect.left);
      var Y = ~~(e.clientY - rect.top);
      //draw 関数にマウスの位置を渡す
      draw(X, Y);
    }
  };

  //渡されたマウス位置を元に直線を描く関数
  function draw(X, Y) {
    ctx.beginPath();
    ctx.globalAlpha = defoalpha;
    //マウス継続値によって場合分け、直線の moveTo（スタート地点）を決定
    if (mouseX === "") {
      //継続値が初期値の場合は、現在のマウス位置をスタート位置とする
      ctx.moveTo(X, Y);
    } else {
      //継続値が初期値ではない場合は、前回のゴール位置を次のスタート位置とする
      ctx.moveTo(mouseX, mouseY);
    }
    //lineTo（ゴール地点）の決定、現在のマウス位置をゴール地点とする
    ctx.lineTo(X, Y);
    //直線の角を「丸」、サイズと色を決める
    ctx.lineCap = "round";
    ctx.lineWidth = defosize * 2;
    ctx.strokeStyle = defocolor;
    ctx.stroke();
    //マウス継続値に現在のマウス位置、つまりゴール位置を代入
    mouseX = X;
    mouseY = Y;
  };

  //左クリック終了、またはマウスが領域から外れた際、継続値を初期値に戻す
  function drawEnd() {
    mouseX = "";
    mouseY = "";
  }
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

  document.getElementById("name_check").checked = false;
}

function _submit() {
    // picture_canvas_urlのvalueをcanvasの画像データに変更する
    var image_data = document.getElementById('mycanvas').toDataURL("image/png");
    document.getElementById("picture_canvas_url").value = image_data;
    
    var target = document.getElementById("new_picture");
    target.submit();
}