const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim();

let N = Number(input);

// 1부터 N까지에 대해서 N을 만들 수 있는 연산의 최소 횟수를 담을 배열
const memo = new Array(N + 1).fill(0);

// 2부터 N까지 반복
for (let i = 2; i <= N; i++) {
  // 각 숫자는 먼저 전 단계에서 +1하는 방법으로 만들 수 있으므로,
  // 전 단계를 만드는데 드는 최소 횟수 + 1을 memo[i]에 저장함
  memo[i] = memo[i - 1] + 1;

  // 만약 memo가 2로 나누어 떨어지면, i/2에서 곱하기 2로 현재 값으로 올 수 있다는 것을 의미
  if (i % 2 === 0) {
    // +1해서 온 것과 x2해서 온 것 중에 최솟값을 memo[i]에 저장
    memo[i] = Math.min(memo[i], memo[i / 2] + 1);
  }

  // 만약 memo가 3로 나누어 떨어지면, i/3에서 곱하기 3로 현재 값으로 올 수 있다는 것을 의미
  if (i % 3 === 0) {
    // +1해서 온 것과 x3해서 온 것 중에 최솟값을 memo[i]에 저장
    memo[i] = Math.min(memo[i], memo[i / 3] + 1);
  }
}

// N을 만드는 최솟값 출력
console.log(memo[N]);
