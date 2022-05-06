const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

input = +input;

// console.log(input);

let D = new Array(10);

for (let i = 0; i < D.length; i++) {
  D[i] = new Array(1001).fill(0);
}

for (let i = 0; i < 10; i++) {
  D[i][1] = 1;
}

// console.log(D[1][100]);
// console.log(D[9]);

for (let j = 1; j < 1001; j++) {
  for (let i = 0; i <= 9; i++) {
    for (let k = 0; k <= i; k++) {
      if (i === 0) {
        D[i][j] = 1;
      } else {
        D[i][j] = (D[i][j] % 10007) + (D[k][j - 1] % 10007);
      }
    }
  }
}

let sum = 0;
for (let i = 0; i < 10; i++) {
  // console.log(D[i][input]);
  sum = sum + (D[i][input] % 10007);
}

console.log(sum % 10007);
