const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift().trim();

let A = [0];

for (let i = 0; i < N; i++) {
  A.push(+input[i].trim());
}

// console.log(A);
if (N === 1) {
  console.log(A[1]);
}

if (N === 2) {
  console.log(A[1] + A[2]);
}

if (N >= 3) {
  let D = new Array(N + 1).fill(0);

  D[1] = A[1];
  D[2] = A[1] + A[2];

  for (let i = 3; i <= N; i++) {
    D[i] = Math.max(D[i - 1], D[i - 2] + A[i], D[i - 3] + A[i - 1] + A[i]);
  }

  console.log(Math.max(...D));
}

// 문제 풀이 접근 방식

// 문제에서 주어진 '3잔 연속 마실 수 없다' 라는 조건을 해석하면 다음과 같다.
// 1. 2잔은 연속으로 마실 수 있다.
// 2. 1잔을 뛰어넘을 수 있다.
// 3. 2잔은 뛰어넘지 않는 것이 더 좋다. (2잔 중 첫번째 잔을 마시는 것과 차이 없음)

// 예를 들어 5번째 포도주에 대한 경우의 수는

// 3번째, 4번째 포도주를 마신 경우 (이번에는 PASS)
// => 4번째까지의 최댓값을 사용

// 3번째는 마시고, 4번째는 안마신 경우 (이번에는 DRINK)
// => 3번째까지 마신 것의 최댓값과 이번에 마시는 포도주의 값을 저장

// 3번째는 안마시고, 4번째는 마신 경우 (이번에는 DRINK)
// => 2번째까지 마신 것의 최댓값과 4번째 마신 포도주의 값과 이번에 마시는 포도주의 값을 저장

// 3가지가 존재한다.

// 1번째, 2번째를 모두 안마신 경우는 최댓값을 절대 가질 수 없다.
// (차라리 1번 마시는 것이 나음)
