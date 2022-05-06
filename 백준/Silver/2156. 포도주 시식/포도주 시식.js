const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

const inputArray = [];

const inputLength = input.length;

for (let i = 0; i < inputLength; i++) {
  inputArray.push(+input.shift());
}

// console.log(inputArray);

// 입력을 저장할 A 배열
// 마셨을 경우 또는 마시지 않았을 경우 해당 포도주까지의 최댓값을 기록하는 D 배열

let A = new Array(2);
let D = new Array(2);

// i가 0일 때 = 마신 경우 (포도주의 양)
// i가 1일 때 = 마시지 않은 경우 (0)
A[0] = inputArray;
A[1] = new Array(inputArray.length).fill(0);
D[0] = inputArray;
D[1] = new Array(inputArray.length).fill(0);

console.log(D[0]);
console.log(D[1]);

// j는 0부터 N-1 반복
for (let j = 0; j < testCaseNum; j++) {
  // i는 1부터 0까지 감소하며 반복
  for (let i = 1; i >= 0; i--) {
    // 첫번째 포도주일 경우
    if (j === 0) {
      // 마신 경우
      if (i === 1) {
        // 첫번째 포도주의 값 저장
        D[i][j] = D[i - 1][j];
      }

      // 두번째 포도주일 경우 경우
    } else if (j === 1) {
      // 마신 경우
      if (i === 1) {
        // 이전 포도주를 마시지 않은 경우와
        // 이번 포도주를 마시지 않은 경우의 합
        D[i][j] = D[i - 1][j - 1] + D[i - 1][j];
      }

      // 세번재 포도주일 경우
    } else if (j === 2) {
      // 안마신 경우
      if (i === 0) {
        // 이번 포도주를 마신 경우와 한번 건너뛰고 마신 경우
        D[i][j] = D[i][j] + D[i + 1][j - 2];
      } else if (i === 1) {
        D[i][j] = D[i - 1][j] + D[i - 1][j - 1];
      }

      // 네번째
    } else if (j >= 3) {
      if (i === 0) {
        D[i][j] = Math.max(
          D[i][j] + D[i + 1][j - 2],
          D[i][j] + D[i + 1][j - 3],
          D[i][j] + D[i][j - 2],
          D[i][j] + D[i][j - 3]
        );
      } else if (i === 1) {
        D[i][j] = D[i - 1][j] + D[i - 1][j - 1];
      }
    }
  }
}

// console.log(A[0]);
// console.log(A[1]);
// console.log(D[0]);
// console.log(D[1]);

const max0 = Math.max(...D[0]);
const max1 = Math.max(...D[1]);

console.log(Math.max(max0, max1));

// 문제 풀이 접근 방식

// 문제에서 주어진 '3잔 연속 마실 수 없다' 라는 조건을 해석하면 다음과 같다.
// 1(o) => 2
//      => 2
