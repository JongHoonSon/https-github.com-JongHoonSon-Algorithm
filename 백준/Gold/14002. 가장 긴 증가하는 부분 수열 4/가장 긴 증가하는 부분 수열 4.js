const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// console.log(N);

const A = input[0].split(" ").map((v) => +v);

// console.log(numArray);

const dp = new Array(N).fill(0);
const arr = [];

for (let i = 0; i < N; i++) {
  let max = 0;
  let maxIndex = -1;
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j] && dp[j] > max) {
      max = dp[j];
      maxIndex = j;
    }
  }
  dp[i] = max + 1;
  if (maxIndex !== -1) {
    arr[i] = arr[maxIndex].concat(A[i]);
  } else {
    arr[i] = [A[i]];
  }
}

let maxLength = Math.max(...dp);
console.log(maxLength);
console.log(arr[dp.indexOf(maxLength)].join(" "));

// 문제 풀이 접근 방식

// 11053번 : 가장 긴 증가하는 부분 수열 문제와 다른 점은
// 가장 긴 증가하는 부분 수열의 길이 뿐만 아니라
// 해당 수열의 구성까지 출력해야한다는 점이다.

// 따라서,
