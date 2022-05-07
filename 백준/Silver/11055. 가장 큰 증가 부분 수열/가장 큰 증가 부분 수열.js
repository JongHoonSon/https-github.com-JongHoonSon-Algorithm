const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

let A = input[0].split(" ").map((v) => +v);
let D = input[0].split(" ").map((v) => +v);

// console.log(A);
// console.log(D);

// i는 1부터 입력으로 주어진 수열의 길이까지 1씩 증가하며 반복
for (let i = 1; i < A.length; i++) {
  // j는 현재 탐색 중인 수열 요소의 인덱스상 -1부터 0까지 1씩 감소하며 반복
  for (let j = i - 1; j >= 0; j--) {
    // 현재 탐색중인게 앞선 것보다 크다면
    if (A[i] > A[j]) {
      // D[i]를
      // 최댓값이 갱신된 D[i]와
      // 새로 만난 A[j]의 누적 값인 D[j]와 현재 요소(A[i])의 합과 비교하여
      // 더 큰 값을 택함
      D[i] = Math.max(D[i], A[i] + D[j]);
    }
  }
}

// console.log(A);
// console.log(D);

console.log(Math.max(...D));

// 가장 긴 증가하는 부분 수열과의 차이점은

// 가장 긴 증가하는 부분 수열은 수열의 '길이'에 관심이 있는 것이고,
// 가장 큰 증가 부분 수열은 수열을 이루는 수들의 '합'에 관심이 있다는 점이다.
