// global variables
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"]; // all row names
const cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]; // all column names
const maxRows = 15;
const maxCols = 15;
var turn = true; // track which turn: true = white, false = black

// function to determine row or col number
// isRow: true = row; false = column
// str = string to convert to number
function toNumber(isRow = true, str = "") {

    // do nothing if invalid input
    if(str.length == 0) return;

    if(isRow) {
        return rows.indexOf(str) + 1;
    }

    return cols.indexOf(str) + 1;

}

// function to convert row and col numbers to letters
// isRow: true = row; false = column
// num = number to convert to row or column letter
function toLetter(isRow = true, num = 0) {

    // do nothing if invalid input
    if(num == 0) return;

    if(isRow) {
        return rows[num - 1];
    }

    return cols[num - 1];

}

// function to convert id to index coordinates
function convertXY(id = "") {

    // invalid input, do nothing
    if(id.length != 2) return;

    // convert row and col to numbers
    var row = toNumber(true, id.charAt(0));
    var col = toNumber(false, id.charAt(1));

    return [row, col];

}

// function to render white or black pieces
function piece(str = "") {

    // determine white or black piece
    var type = turn ? "w" : "b";

    return (
        '<div class="' + type + ' d-flex align-items-center justify-content-center">' + str + '</div>'
    )

}

function clickTurn(id = "") {

    // do nothing if invalid input
    if(id.length == 0) return;

    // if already clicked, then do nothing
    var content = document.getElementById(id).innerText;
    if(content.length != 0) return;

    // place piece
    if(turn) {
        document.getElementById(id).innerHTML = piece("w");
    } else {
        document.getElementById(id).innerHTML = piece("b");
    }

    // check if win
    var win = checkWin(id);

    // next turn;
    turn = !turn;

}

// function to check if a player has won
// return 1 if white win, -1 if black win, 0 if no win yet
function checkWin(id = "") {

    // invalid input, do nothing
    if(id.length == 0) return;

    // get coordinates
    var xy = convertXY(id);

    // check row if win

    // check col if win

}

// hover over a square shows next piece
function mouseOver(id = "") {

    // do nothing if invalid input
    if(id.length == 0) return;

    // if already clicked, then do nothing
    var content = document.getElementById(id).innerText;
    if(content.length != 0) return;

    document.getElementById(id).innerHTML = piece();

}

// removes hover
function mouseOut(id = "") {
    
    // do nothing if invalid input
    if(id.length == 0) return;

    // if already clicked, then do nothing
    var content = document.getElementById(id).innerText;
    if(content.length != 0) return;

    // remove any innerHTML elements
    document.getElementById(id).innerHTML = "";

}