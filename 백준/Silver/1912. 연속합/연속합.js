const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();
const A = input[0].split(" ").map((v) => +v);

const D = new Array(testCaseNum).fill(-1000);

D[0] = A[0];

for (let i = 1; i < testCaseNum; i++) {
  if (A[i] > 0) {
    D[i] = D[i - 1] + A[i];
  } else {
    if (D[i - 1] > 0) {
      if (D[i - 1] + A[i] > 0) {
        D[i] = D[i - 1] + A[i];
      } else {
        D[i] = 0;
      }
    } else {
      D[i] = Math.max(D[i - 1], A[i]);
    }
  }
}

//   if(D[i-1] + A[i] > 0) {
//     D[i] = D[i-1] + A[i];
//   } else {
//     D[i] = 0;
//   }
// }

// console.log(max)

// console.log(D);

console.log(Math.max(...D));
