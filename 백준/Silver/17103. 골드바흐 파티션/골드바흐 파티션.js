const fs = require("fs");
let input = fs
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

const testCaseNum = input.shift();

// 1. 100만 이하의 수 중 소수 찾기
let primeArray = new Array(1000001).fill(true);
primeArray[1] = false;
for (let i = 2; i <= 1000001; i++) {
  if (primeArray[i]) {
    for (let j = i * i; j <= 1000001; j += i) {
      primeArray[j] = false;
    }
  }
}
let result = [];

input.map((x) => {
  // 골드바흐의 파티션의 갯수를 저장할 변수
  let GBP = 0;

  // half는 x의 중간지점
  // ex) x가 10000이라면 half는 5000, 반복문에서 사용됨
  let half = Math.ceil(x / 2);

  // 만약 x가 4라면 소수인 2와 2의 덧셈으로 만들 수 있으므로,
  // 골드바흐의 파티션의 갯수는 1개
  if (x === 4) GBP = 1;
  // x가 4가 아니라면
  else {
    // 3부터 시작해서 half까지 2씩 증가하며 반복 (4이상의 짝수는 소수가 안되므로, 홀수만 탐색함)
    for (let i = 3; i <= half; i += 2) {
      // 만약 i번째의 수와 뒤에서 i번째 수(= x-i번째 수)가 다 소수라면
      // ex) 10000일 때, 3과 9997이 둘다 소수인 경우
      if (primeArray[i] && primeArray[x - i]) {
        // 골드바흐의 파티션의 갯수를 +1 함
        GBP++;
      }
    }
  }
  result.push(GBP);
});

console.log(result.join("\n"));

// 문제 풀이 접근 방식

// 100만 이하의 수에 대해 소수 여부를 저장하고 있는 배열을 만들고,
// 입력으로 주어진 수를 소수의 합으로 판단할 수 있는 경우 count+1 하면 된다.
