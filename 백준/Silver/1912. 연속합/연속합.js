const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();
const A = input[0].split(" ").map((v) => +v);

const D = new Array(testCaseNum).fill(-1000);

D[0] = A[0];

// i번째 index를 마지막 요소로 했을 때의 최대 연속합을 D[i]에 저장하기 위한 과정
for (let i = 1; i < testCaseNum; i++) {
  // 이전까지의 합이 양수이면
  if (D[i - 1] >= 0) {
    // D[i-1]를 D[i]에 추가
    D[i] = D[i - 1] + A[i];

    // 이전까지의 합이 음수이면
  } else if (D[i - 1] < 0) {
    // D[i]는 A[i]만을 사용 (음수인 D[i-1] 더하면 D[i]의 값이 더 낮아짐)
    D[i] = A[i];
  }
}

console.log(Math.max(...D));
