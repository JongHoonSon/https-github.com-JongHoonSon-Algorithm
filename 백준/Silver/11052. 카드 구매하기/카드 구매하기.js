const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

const inputArray = input[0].split(" ").map((v) => +v);

let D = new Array(1001).fill(0);

function DP(x) {
  if (x <= 0) {
    return 0;
  } else if (x === 1) {
    return inputArray[0];
  }
  if (D[x] !== 0) {
    return D[x];
  }
  D[x] = inputArray[x - 1];
  for (let i = 1; i < x; i++) {
    D[x] = Math.max(D[x], DP(x - i) + inputArray[i - 1]);
  }

  return D[x];
}

console.log(DP(testCaseNum));
