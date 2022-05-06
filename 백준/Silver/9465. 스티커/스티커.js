const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();
const inputLength = input.length;

let answer = [];

for (let a = 0; a < inputLength; a = a + 3) {
  const n = +input.shift();
  let row0 = input
    .shift()
    .toString()
    .trim()
    .split(" ")
    .map((v) => +v);
  let row1 = input
    .shift()
    .toString()
    .trim()
    .split(" ")
    .map((v) => +v);

  let D = new Array(2);

  D[0] = row0;
  D[1] = row1;

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < 2; i++) {
      if (j === 1) {
        if (i === 0) {
          D[i][j] = D[i][j] + D[i + 1][j - 1];
        } else if (i === 1) {
          D[i][j] = D[i][j] + D[i - 1][j - 1];
        }
      } else {
        if (i === 0) {
          D[i][j] = Math.max(
            D[i][j] + D[i + 1][j - 1],
            D[i][j] + D[i + 1][j - 2]
          );
        } else if (i === 1) {
          D[i][j] = Math.max(
            D[i][j] + D[i - 1][j - 1],
            D[i][j] + D[i - 1][j - 2]
          );
        }
      }
    }
  }

  // console.log(D[0]);
  // console.log(D[1]);

  answer.push(Math.max(D[0][n - 1], D[1][n - 1]));
}

console.log(answer.join("\n"));
