let winner;
let fields = [];
let gameOver = false;
let currentShape = 'cross';
const AUDIO_CLICK_1 = new Audio('audio/beep1.mp3')
const AUDIO_CLICK_2 = new Audio('audio/beep2.mp3')

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'cross') {
            AUDIO_CLICK_1.play();
            currentShape = 'circle';
            document.getElementById('player-1').classList.add('player-inactive');
            document.getElementById('player-2').classList.remove('player-inactive');
        } else {
            AUDIO_CLICK_2.play();
            currentShape = 'cross'
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-inactive');
        }
        fields[id] = currentShape;
        console.log(fields);
        draw();


        checkForWin(checkHorizontal(), checkVertical(), checkDiagonal());
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

function checkHorizontal() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('row-0').classList.add('show-win-fields');
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('row-1').classList.add('show-win-fields');
    }
    if (fields[7] == fields[8] && fields[8] == fields[6] && fields[7]) {
        winner = fields[7];
        document.getElementById('row-2').classList.add('show-win-fields');
    }
    return winner;
}

function checkVertical() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('field-0').classList.add('show-win-fields');
        document.getElementById('field-3').classList.add('show-win-fields');
        document.getElementById('field-6').classList.add('show-win-fields');
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('field-2').classList.add('show-win-fields');
        document.getElementById('field-5').classList.add('show-win-fields');
        document.getElementById('field-8').classList.add('show-win-fields');
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('field-1').classList.add('show-win-fields');
        document.getElementById('field-4').classList.add('show-win-fields');
        document.getElementById('field-7').classList.add('show-win-fields');
    }
    return winner;
}


function checkDiagonal() {

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('field-0').classList.add('show-win-fields');
        document.getElementById('field-4').classList.add('show-win-fields');
        document.getElementById('field-8').classList.add('show-win-fields');
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('field-6').classList.add('show-win-fields');
        document.getElementById('field-4').classList.add('show-win-fields');
        document.getElementById('field-2').classList.add('show-win-fields');
    }
    return winner;
}


function checkForWin(winner) {

    if (winner) {
        console.log('GEWONNEN', winner);
        gameOver = true;

        setTimeout(function () {
            document.getElementById('overlay').style.display = 'flex';
        }, 1000)

    }
}

function restart() {
    gameOver = false;
    fields = [];
    for (let i = 0; i < 2; i++) {
        document.getElementById('row-' + i).classList.remove('show-win-fields');
    }
    document.getElementById('overlay').style.display = 'none';

    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).style = 'display: none;';
        document.getElementById('cross-' + i).style = 'display: none;';
    }
}