const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().split("\n");

const testCaseNum = +input.shift();

let D = new Array(1000001).fill(0);

D[1] = 1;
D[2] = 2;
D[3] = 4;

for (let i = 4; i < 1000001; i++) {
  D[i] =
    (D[i - 1] % 1000000009) + (D[i - 2] % 1000000009) + (D[i - 3] % 1000000009);
}

for (let i = 0; i < testCaseNum; i++) {
  const num = +input[i];
  // console.log(num);

  console.log(D[num] % 1000000009);
}
