const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const num = +input.shift();

let A = input[0].split(" ").map((v) => +v);
let D = new Array(num).fill(0);
let F = new Array(num).fill(0);

D[0] = A[0];
F[0] = A[0];

for (let i = 1; i < num; i++) {
  if (D[i - 1] >= 0) {
    D[i] = D[i - 1] + A[i];
  } else if (D[i - 1] < 0) {
    D[i] = A[i];
  }
}

for (let i = 1; i < num; i++) {
  if (D[i - 1] > A[i] + F[i - 1]) {
    F[i] = D[i - 1];
  } else {
    F[i] = A[i] + F[i - 1];
  }
}

// console.log(D);
// console.log(F);

const d = Math.max(...D);
const f = Math.max(...F);

console.log(Math.max(d, f));
