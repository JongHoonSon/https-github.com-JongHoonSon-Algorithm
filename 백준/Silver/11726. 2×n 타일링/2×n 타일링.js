const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim();

let N = Number(input);

// console.log(DP(input));

// 2xN 크기의 직사각형에 타일을 채우는 방법의 수를 저장할 memo
let memo = new Array(1001).fill(0);

// N부터 DP를 수행하여 1까지 내려감
console.log(DP(N));

function DP(x) {
  // N = 1일 경우, 1x2 타일 1개, 총 1가지 경우가 있음
  if (x === 1) {
    return 1;
  }

  // N = 2일 경우, 1x2 타일 2개, 2x1 타일 2개, 총 2가지 경우가 있음
  if (x === 2) {
    return 2;
  }

  // memo에 값이 들어있다면(계산한 적이 있으면), 해당 값 사용
  if (memo[x] !== 0) {
    return memo[x];
  }

  // x번째 memo는 x-2에서 2x1 타일 2개를 넣는 경우와,
  // x-1에서 1x2 타일 1개를 넣는 경우
  // 두 가지로 볼 수 있음
  return (memo[x] = (DP(x - 1) + DP(x - 2)) % 10007);
}

// console.log(memo);
