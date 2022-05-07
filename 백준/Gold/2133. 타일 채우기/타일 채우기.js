const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const num = +input.shift();

let D = new Array(num + 1).fill(0);

// console.log(D);
D[0] = 0;
D[1] = 0;
D[2] = 3;

console.log(DP(num));

function DP(x) {
  if (D[x] !== 0) {
    return D[x];
  }
  if (x % 2 === 0) {
    D[x] = 3 * DP(x - 2) + 2;
    let k = x - 2;
    while (k >= 2) {
      D[x] = D[x] + D[k - 2] * 2;
      k = k - 2;
    }
  }
  return D[x];
}

// console.log(D);

// console.log(D[num]);
