let winner;
let fields = [];
let gameOver = false;
let drawGame = false;
let currentShape = 'cross';
const AUDIO_CLICK_1 = new Audio('audio/beep1.mp3');
const AUDIO_CLICK_2 = new Audio('audio/beep2.mp3');

function fillShape(id) {
  if (!fields[id] && !gameOver && !drawGame) {
    if (currentShape == 'cross') {
      AUDIO_CLICK_1.play();
      currentShape = 'circle';
      document.getElementById('player-1').classList.add('player-inactive');
      document.getElementById('player-2').classList.remove('player-inactive');
    } else {
      AUDIO_CLICK_2.play();
      currentShape = 'cross';
      document.getElementById('player-1').classList.remove('player-inactive');
      document.getElementById('player-2').classList.add('player-inactive');
    }
    fields[id] = currentShape;

    draw();
    checkForWin();
  }
}

function draw() {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] == 'circle') {
      document.getElementById('circle-' + i).style = 'display: flex;';
    }
    if (fields[i] == 'cross') {
      document.getElementById('cross-' + i).style = 'display: flex;';
    }
  }
}

function checkHorizontal(p0, p1, p2, id0, id1, id2) {
  if (fields[p0] == fields[p1] && fields[p1] == fields[p2] && fields[p0]) {
    winner = fields[p0];
    console.log(winner);
    document.getElementById(id0).classList.add('show-win-fields');
    document.getElementById(id1).classList.add('show-win-fields');
    document.getElementById(id2).classList.add('show-win-fields');
  }
}

function checkVertical(p0, p1, p2, id0, id1, id2) {
  if (fields[p0] == fields[p1] && fields[p1] == fields[p2] && fields[p0]) {
    winner = fields[p0];
    document.getElementById(id0).classList.add('show-win-fields');
    document.getElementById(id1).classList.add('show-win-fields');
    document.getElementById(id2).classList.add('show-win-fields');
  }
}

function checkDiagonal(p0, p1, p2, id0, id1, id2) {
  if (fields[p0] == fields[p1] && fields[p1] == fields[p2] && fields[p0]) {
    winner = fields[p0];

    document.getElementById(id0).classList.add('show-win-fields');
    document.getElementById(id1).classList.add('show-win-fields');
    document.getElementById(id2).classList.add('show-win-fields');
  }
}

function checkDraw() {
  return (
    fields[0] &&
    fields[1] &&
    fields[2] &&
    fields[3] &&
    fields[4] &&
    fields[5] &&
    fields[6] &&
    fields[7] &&
    fields[8]
  );
}

function checkForWin() {
  if (
    checkHorizontal(0, 1, 2, 'field-0', 'field-1', 'field-2') ||
    checkHorizontal(3, 4, 5, 'field-3', 'field-4', 'field-5') ||
    checkHorizontal(6, 7, 8, 'field-6', 'field-7', 'field-8') ||
    checkVertical(0, 3, 6, 'field-0', 'field-3', 'field-6') ||
    checkVertical(2, 5, 8, 'field-2', 'field-5', 'field-8') ||
    checkVertical(1, 4, 7, 'field-1', 'field-4', 'field-7') ||
    checkDiagonal(0, 4, 8, 'field-0', 'field-4', 'field-8') ||
    checkDiagonal(6, 4, 2, 'field-2', 'field-4', 'field-6')
  ) {
  } else {
    decideDrawOrWin();
  }
}

function decideDrawOrWin() {
  if (checkDraw()) {
    drawGame = true;
    document.getElementById('whowon').innerHTML = `DRAW`;
    setTimeout(function () {
      document.getElementById('overlay').style.display = 'flex';
    }, 1000);
  }

  if (winner) {
    gameOver = true;
    document.getElementById(
      'whowon'
    ).innerHTML = `The winner is:<span class="winner-is"> ${winner}</span>`;

    setTimeout(function () {
      document.getElementById('overlay').style.display = 'flex';
    }, 1000);
  }
}

function restart() {
  gameOver = false;
  drawGame = false;
  fields = [];
  winner = undefined;
  for (let i = 0; i < 9; i++) {
    document.getElementById('field-' + i).classList.remove('show-win-fields');
  }
  document.getElementById('overlay').style.display = 'none';

  for (let i = 0; i < 9; i++) {
    document.getElementById('circle-' + i).style = 'display: none;';
    document.getElementById('cross-' + i).style = 'display: none;';
  }
}
