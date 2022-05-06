const fs = require("fs");
let input = fs
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

const testCaseNum = input.shift();

let N = new Array(13).fill(0);

function DP(x) {
  if (x === 1) {
    return 1;
  } else if (x === 2) {
    return 2;
  } else if (x === 3) {
    return 4;
  }
  if (N[x] !== 0) {
    return N[x];
  }
  N[x] = DP(x - 1) + DP(x - 2) + DP(x - 3);

  return N[x];
}

input.forEach((el) => {
  console.log(DP(el));
});
