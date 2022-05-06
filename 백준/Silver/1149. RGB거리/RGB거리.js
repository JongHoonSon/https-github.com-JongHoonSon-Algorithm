const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().split("\n");

const N = +input.shift();

// console.log("N", N);

const A = new Array(N);

for (let i = 0; i < N; i++) {
  A[i] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
}

const D = new Array(N);

for (let i = 0; i < N; i++) {
  D[i] = new Array(3).fill(0);
}

for (let i = 0; i < 3; i++) {
  D[0][i] = A[0][i];
}

for (let i = 1; i < N; i++) {
  D[i][0] = A[i][0] + Math.min(D[i - 1][1], D[i - 1][2]);
  D[i][1] = A[i][1] + Math.min(D[i - 1][0], D[i - 1][2]);
  D[i][2] = A[i][2] + Math.min(D[i - 1][0], D[i - 1][1]);
}

// for (let i = 0; i < 3; i++) {
//   console.log(`A[${i}]`, A[i]);
//   console.log(`D[${i}]`, D[i]);
// }

console.log(Math.min(...D[N - 1]));
