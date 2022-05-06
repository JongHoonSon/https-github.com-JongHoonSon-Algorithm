const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

// console.log(testCaseNum);

const A = input[0].split(" ").map((v) => +v);

// console.log(numArray);

const D = new Array(1000).fill(1);

for (let i = 1; i < D.length; i++) {
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j]) {
      D[i] = Math.max(D[j] + 1, D[i]);
    }
  }
}

// console.log(D);

let max = 0;
for (let i = 0; i < testCaseNum; i++) {
  if (max < D[i]) {
    max = D[i];
  }
}

console.log(max);
