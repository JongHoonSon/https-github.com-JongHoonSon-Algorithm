const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// console.log(N);

// A는 입력으로 주어진 수열을 담은 배열
const A = input[0].split(" ").map((v) => +v);

// console.log(numArray);

// 배열 A의 index가 0부터 N-1까지이므로
// 각 index에 있는 값(A[index])으로 끝나는 부분 수열 중에서
// 가장 긴 증가하는 부분 수열의 길이를 저장할 배열 D 생성
const D = new Array(N).fill(1);

// i는 배열 A의 index
for (let i = 0; i < A.length; i++) {
  // j는 i보다 앞에 있는 index까지 반복
  for (let j = 0; j < i; j++) {
    // 만약 A[i]보다 A[j]가 작다면
    if (A[i] > A[j]) {
      // A[j]로 끝나는 부분 수열 중
      // 가장 긴 증가하는 부분 수열의 최대 길이인 D[j]에 +1한 값과
      // D[i]를 비교하여 D[i] 값을 갱신함
      D[i] = Math.max(D[j] + 1, D[i]);
    }
  }
}

// console.log(D);

let max = 0;

// i는 0부터 입력으로 주어진 수열 A의 길이만큼 반복하며
for (let i = 0; i < A.length; i++) {
  // i번 인덱스로 끝나는 가장 긴 증가하는 부분 수열의 값들 중
  // 가장 큰 값을 max에 저장함
  if (max < D[i]) {
    max = D[i];
  }
}

console.log(max);
