const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().split(" ");

const K = +input[1];
const N = +input[0];

// console.log(K);
// console.log(N);

let D = new Array(201).fill(0);

for (let i = 0; i < D.length; i++) {
  D[i] = new Array(201).fill(0);
}

for (let j = 0; j < D.length; j++) {
  D[1][j] = 1;
}

for (let i = 2; i < D.length; i++) {
  for (let j = 0; j < D.length; j++) {
    for (let k = 0; k <= j; k++) {
      D[i][j] = D[i][j] + (D[i - 1][k] % 1000000000);
    }
  }
}
// for(let j=0; j<D.length; j++) {
//   console.log(D[2][j]);
// }

console.log(D[K][N] % 1000000000);
