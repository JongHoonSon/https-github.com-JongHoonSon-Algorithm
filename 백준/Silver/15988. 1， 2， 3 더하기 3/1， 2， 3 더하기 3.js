const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().split("\n");

const testCaseNum = +input.shift();

let D = new Array(1000001).fill(0);

// 1을 만드는 방법의 수 '1', 총 1개
D[1] = 1;

// 2를 만드는 방법의 수 '1+1', '2', 총 2개
D[2] = 2;

// 3을 만드는 방법의 수 '1+1+1', '1+2', '2+1', '3', 총 4개
D[3] = 4;

// 4부터는 -1, -2, -3의 경우의 수를 합함 (각각 1, 2, 3 1개씩을 더하면 만들 수 있으므로)
for (let i = 4; i < 1000001; i++) {
  D[i] =
    (D[i - 1] % 1000000009) + (D[i - 2] % 1000000009) + (D[i - 3] % 1000000009);
}

for (let i = 0; i < testCaseNum; i++) {
  const num = +input[i];
  // console.log(num);

  console.log(D[num] % 1000000009);
}
