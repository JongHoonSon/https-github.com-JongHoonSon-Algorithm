const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const num = +input.shift();

let A = input[0].split(" ").map((v) => +v);
let D = new Array(num).fill(1);
let F = new Array(num).fill(1);

// console.log(A);
// console.log(D);
// console.log(F);

// 가장 긴 증가하는 부분 수열의 길이 찾기
for (let i = 1; i < num; i++) {
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j]) {
      D[i] = Math.max(D[i], D[j] + 1);
    }
  }
}

// 가장 긴 감소하는 부분 수열의 길이 찾기
// (증가하던 A[j]로 끝나는 가장 긴 증가하는 부분 수열 D[j]도 확인)
for (let i = 1; i < num; i++) {
  for (let j = 0; j < i; j++) {
    if (A[i] < A[j]) {
      F[i] = Math.max(F[i], D[j] + 1, F[j] + 1);
    }
  }
}

// console.log(D);
// console.log(F);

console.log(Math.max(...F));

// 문제 풀이 접근 방식

// 각 요소에 대해 가장 긴 증가하는 부분 수열을 배열 D에 구한 후
// 각 요소에 대해 가장 긴 감소하는 부분 수열을 구할 당시,
// D값도 탐색하여 값이 상승했다가 하락하는 경우(바이토닉)도 함께 찾는다.
