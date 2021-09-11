// global variables

// all row names
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
// all column names
const cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

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