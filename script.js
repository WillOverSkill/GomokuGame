// global variables
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"]; // all row names
const cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]; // all column names
const maxRows = 15;
const maxCols = 15;
var turn = false; // track which turn: true = white, false = black
var moves = [];

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

function convertID(xy = [0, 0]) {

    // invalid input, do nothing
    if(xy[0] == 0 || xy[1] == 0) return;

    return rows[xy[0] - 1] + cols[xy[1] - 1];

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

    if(win == 1) {
        alert("White has won!");
    }

    if(win == -1) {
        alert("Black as won!");
    }

    // next turn;
    turn = !turn;

}

// function to check if a player has won
// return 1 if white win, -1 if black win, 0 if no win yet
function checkWin(id = "") {

    // invalid input, do nothing
    if(id.length == 0) return;

    var xy = convertXY(id); // get coordinates
    var wb = document.getElementById(id).innerText; // get which piece

    // check row if win
    if(checkRow(xy, wb)) {
        if(wb === "w") return 1;
        if(wb === "b") return -1;
    }

    // check col if win
    if(checkCol(xy, wb)) {
        if(wb === "w") return 1;
        if(wb === "b") return -1;
    }

    // check diag if win
    if(checkDiag(xy, wb)) {
        if(wb === "w") return 1;
        if(wb === "b") return -1;
    }

    // no win yet
    return 0;
}

// returns true if row has 5 or more pieces of same color consecutively
function checkRow(xy, wb) {

    var col = xy[1];
    var length = 1; // start at length 1 since player just put down a piece

    // check one side
    while(col > 1) {
        col -= 1;
        if(checkTile([xy[0], col], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    col = xy[1]; // reset

    // check other side
    while(col < 15) {
        col += 1;
        if(checkTile([xy[0], col], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    // no win yet
    return false;

}

// returns true if col has 5 or more pieces of same color consecutively
function checkCol(xy, wb) {

    var row = xy[0];
    var length = 1; // start at length 1 since player just put down a piece

    // check one side
    while(row > 1) {
        row -= 1;
        if(checkTile([row, xy[1]], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    row = xy[0]; // reset

    // check other side
    while(row < 15) {
        row += 1;
        if(checkTile([row, xy[1]], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    // no win yet
    return false;

}

// returns true if diagonal has 5 or more pieces of same color consecutively
function checkDiag(xy, wb) {

    var row = xy[0];
    var col = xy[1];
    var length = 1; // start at length 1 since player just put down a piece

    // check one
    while(row > 1 && col > 1) {
        row -= 1;
        col -= 1;
        if(checkTile([row, col], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    row = xy[0]; // reset
    col = xy[1]; // reset

    while(row < 15 && col < 15) {
        row += 1;
        col += 1;
        if(checkTile([row, col], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    row = xy[0]; // reset
    col = xy[1]; // reset
    length = 1; // reset

    // check two
    while(row > 1 && col < 15) {
        row -= 1;
        col += 1;
        if(checkTile([row, col], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    row = xy[0]; // reset
    col = xy[1]; // reset

    while(row < 15 && col > 1) {
        row += 1;
        col -= 1;
        if(checkTile([row, col], wb)) {
            length += 1;
        }
    }

    if(length >= 5) return true;

    // no win yet
    return false;

}

// check if a single tile matches input text
function checkTile(xy, wb) {
    
    var id = convertID(xy);

    if(wb === document.getElementById(id).innerText) return true;

    return false;

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