const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

const D = [];

const inputLength = input.length;

for (let i = 0; i < inputLength; i++) {
  D.push(
    input
      .shift()
      .split(" ")
      .map((v) => +v)
  );
  // console.log(D[i]);
}

for (let i = 1; i < testCaseNum; i++) {
  for (let j = 0; j <= i; j++) {
    if (j === 0) {
      D[i][j] = D[i][j] + D[i - 1][j];
    } else if (i === j) {
      D[i][j] = D[i][j] + D[i - 1][j - 1];
    } else if (j >= 1) {
      D[i][j] = D[i][j] + Math.max(D[i - 1][j - 1], D[i - 1][j]);
    }
    // console.log(D[i][j]);
  }
}

// for(let i=0; i<inputLength; i++) {
//   console.log(D[i]);
// }

const max = Math.max(...D[testCaseNum - 1]);

console.log(max);
