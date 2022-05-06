const fs = require("fs");
let input = fs
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

const testCaseNum = input.shift();

let memo = new Array(13).fill(0);

function DP(x) {
  // x는 1일 때, '1'로 1개만 가능
  if (x === 1) {
    return 1;

    // x는 2일 때, '1+1', '2'으로 총 2개 가능
  } else if (x === 2) {
    return 2;

    // x는 3일 때, '1+1+1', '1+2', '2+1', '3'으로 총 4개 가능
  } else if (x === 3) {
    return 4;
  }

  // 이전에 계산한 경우, 해당 값 사용
  if (memo[x] !== 0) {
    return memo[x];
  }

  // x의 값은 x-1에서 1을 더하는 경우
  // x-2에서 2를 더하는 경우
  // x-3에서 3을 더하는 경우
  // 총 3가지가 존재함
  memo[x] = DP(x - 1) + DP(x - 2) + DP(x - 3);

  return memo[x];
}

input.forEach((el) => {
  console.log(DP(el));
});
