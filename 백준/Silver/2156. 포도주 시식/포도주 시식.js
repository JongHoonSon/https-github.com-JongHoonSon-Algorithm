const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');

const testCaseNum = +input.shift();

const inputArray = [];

const inputLength = input.length;;

for(let i=0; i<inputLength; i++) {
  inputArray.push(+input.shift());
}

// console.log(inputArray);

let A = new Array(2);
let D = new Array(2);

A[0] = inputArray;
A[1] = new Array(inputArray.length).fill(0);
D[0] = inputArray;
D[1] = new Array(inputArray.length).fill(0);

// console.log(D[0]);
// console.log(D[1]);

for(let j=0; j<testCaseNum; j++) {
  for(let i=1; i>=0; i--) {
    if(j===0) {
      if(i===1) {
        D[i][j] = D[i-1][j];
      }
    } else if(j===1) {
      if(i===1) {
        D[i][j] = D[i-1][j-1] + D[i-1][j];
      }
    }else if(j===2) {
      if(i===0) {
        D[i][j] = D[i][j] + D[i+1][j-2];
      } else if(i===1) {
        D[i][j] = D[i-1][j] + D[i-1][j-1];
      }
    } else if(j>=3) {
      if(i===0) {
        D[i][j] = Math.max(D[i][j] + D[i+1][j-2], D[i][j] + D[i+1][j-3], D[i][j] + D[i][j-2], D[i][j] + D[i][j-3]);
      } else if(i===1) {
        D[i][j] = D[i-1][j] + D[i-1][j-1];
      }
    }
  }
}

// console.log(A[0]);
// console.log(A[1]);
// console.log(D[0]);
// console.log(D[1]);

const max0 = Math.max(...D[0]);
const max1 = Math.max(...D[1]);

console.log(Math.max(max0, max1));