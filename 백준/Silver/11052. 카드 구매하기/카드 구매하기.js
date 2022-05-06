const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

const inputArray = input[0].split(" ").map((v) => +v);

let D = new Array(1001).fill(0);

function DP(x) {
  // x가 0이하라면, 0 리턴
  if (x <= 0) {
    return 0;

    // x가 1이라면, 1장이 들어있는 p1 값을 리턴
  } else if (x === 1) {
    return inputArray[0];
  }

  // x가 계산된 적 있으면, 해당 값 사용
  if (D[x] !== 0) {
    return D[x];
  }

  // 카드 x개를 사기 위해 필요한 돈의 기본 값으로
  // x개의 카드가 들어있는 카드팩 1개의 가격을 저장함 됨
  D[x] = inputArray[x - 1];

  // 만약 x-i개의 카드를 사는데 드는 최대 비용(DP(x-i))과
  // i개의 카드가 들어있는 카드팩의 가격의 합이
  // x개의 카드가 들어있는 카드팩 1개를 사는 것보다
  // 방금 저장한 x개의 카드가 들어있는 카드팩의 가격 또는
  // 계산 과정에서 바뀌게된 최대 비용보다 크다면
  // 해당 값을 D[x]에 저장함 (최대값 갱신)
  for (let i = 1; i < x; i++) {
    D[x] = Math.max(D[x], DP(x - i) + inputArray[i - 1]);
  }

  return D[x];
}

console.log(DP(testCaseNum));
