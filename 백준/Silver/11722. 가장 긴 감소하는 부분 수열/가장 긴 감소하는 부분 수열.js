const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

let A = input[0].split(" ").map((v) => +v);
let D = new Array(testCaseNum).fill(1);

// console.log(A);
// console.log(D);

for (let i = 1; i < A.length; i++) {
  for (let j = 0; j < i; j++) {
    if (A[i] < A[j]) {
      D[i] = Math.max(D[i], D[j] + 1);
    }
  }
}

// console.log(A);
// console.log(D);

console.log(Math.max(...D));

// 가장 긴 증가하는 부분 수열 문제와 다른 점은
// 수열의 값이 증가하는 것이 아니라 감소한다는 것, 그것 하나 뿐이다.
