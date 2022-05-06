const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().split("\n");

const N = +input.shift();

// console.log("N", N);

// 배열 A에는 각 지붕을 칠하는데 드는 비용을 저장
// A[i][j]는 i번째의 집에 j색깔(0, 1, 2)을 칠하는데 드는 비용
const A = new Array(N);

for (let i = 0; i < N; i++) {
  A[i] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
}

// 배열 D에는 각 지붕을 칠할 때까지 최소 비용을 저장
// D[i][j]는 i번째의 집에 j색깔(0, 1, 2)을 칠한다면
// i-1번째 집까지 사용한 비용 중 j를 칠하지 않은 경우의 최소 비용에서
// A[i][j]를 더한 값이 됨
const D = new Array(N);

for (let i = 0; i < N; i++) {
  D[i] = new Array(3).fill(0);
}

for (let i = 0; i < 3; i++) {
  D[0][i] = A[0][i];
}

for (let i = 1; i < N; i++) {
  // R은 이전 집에서 G또는 B를 칠했을 경우 칠할 수 있음
  D[i][0] = A[i][0] + Math.min(D[i - 1][1], D[i - 1][2]);
  // G은 이전 집에서 R또는 B를 칠했을 경우 칠할 수 있음
  D[i][1] = A[i][1] + Math.min(D[i - 1][0], D[i - 1][2]);
  // B은 이전 집에서 R또는 G를 칠했을 경우 칠할 수 있음
  D[i][2] = A[i][2] + Math.min(D[i - 1][0], D[i - 1][1]);
}

// for (let i = 0; i < 3; i++) {
//   console.log(`A[${i}]`, A[i]);
//   console.log(`D[${i}]`, D[i]);
// }

console.log(Math.min(...D[N - 1]));
