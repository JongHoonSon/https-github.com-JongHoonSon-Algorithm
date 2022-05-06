const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();
const A = input[0].split(" ").map((v) => +v);

const D = new Array(testCaseNum).fill(-1000);

D[0] = A[0];

// i번째 index를 마지막 요소로 했을 때의 최대 연속합을 D[i]에 저장하기 위한 과정
for (let i = 1; i < testCaseNum; i++) {
  // A[i]가 양수일 경우
  if (A[i] > 0) {
    // i-1번째 index를 마지막 요소로 하는 최대 연속합에 A[i]를 더한 것이
    // i번째에서의 최대 연속합
    D[i] = D[i - 1] + A[i];

    // A[i]가 음수일 경우
  } else {
    // i-1번째 index를 마지막 요소로하는 최대 연속합의 값이 양수일 경우
    if (D[i - 1] > 0) {
      // i-1번째 index를 마지막 요소로하는 최대 연속합의 값에
      // A[i]를 더했을 때
      // 양수이면
      if (D[i - 1] + A[i] > 0) {
        // 해당 값 저장
        D[i] = D[i - 1] + A[i];

        // 음수이면
      } else {
        // 0 저장
        D[i] = 0;
      }
      // i-1번째 index를 마지막 요소로하는 최대 연속합의 값이 음수일 경우
    } else {
      // D[i]는 i-1에서의 최대 연속합 또는 A[i] 중에서 큰 값을 취함
      // (D[i-1]도 음수, A[i]도 음수인데도
      // D[i]에 0을 저장하지 않는 이유 : )
      console.log("D[i-1]", D[i - 1]);
      console.log("A[i]", A[i]);
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
