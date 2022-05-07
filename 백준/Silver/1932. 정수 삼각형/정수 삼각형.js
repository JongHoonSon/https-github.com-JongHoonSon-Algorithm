const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

const D = [];

const inputLength = input.length;

// 입력을 배열 D에 저장
for (let i = 0; i < inputLength; i++) {
  D.push(
    input
      .shift()
      .split(" ")
      .map((v) => +v)
  );
  // console.log(D[i]);
}

// i는 삼각형의 층 (맨위가 1층, 그 밑이 2층)
for (let i = 1; i < testCaseNum; i++) {
  // j는 각 층의 넓이
  for (let j = 0; j <= i; j++) {
    // 각 층에서 맨 왼쪽의 값이라면
    if (j === 0) {
      // 바로 윗층의 맨 왼쪽의 값을 누적함
      // (구조 상 연결된 부모로부터만 값을 받을 수 있기 때문)
      D[i][j] = D[i][j] + D[i - 1][j];

      // 각 층에서 맨 오른쪽의 값이라면
    } else if (i === j) {
      // 바로 윗층의 맨 오른쪽 값을 누적함 (구조 상)
      D[i][j] = D[i][j] + D[i - 1][j - 1];

      // 그 외 나머지 값
    } else if (j >= 1) {
      // 바로 윗층에 있는 부모 중에 큰 값을 선택하여 누적함
      D[i][j] = D[i][j] + Math.max(D[i - 1][j - 1], D[i - 1][j]);
    }
    // console.log(D[i][j]);
  }
}

// for(let i=0; i<inputLength; i++) {
//   console.log(D[i]);
// }

const max = Math.max(...D[testCaseNum - 1]);

console.log(max);

// 문제 풀이 접근 방식

// 문제에서 얘기하는 삼각형을 예제 입력에서 볼 수 있는

// 5
// 7
// 3 8
// 8 1 0
// 2 7 4 4
// 4 5 2 6 5

// 위의 형태의 2차원 배열이라고 생각하면 쉽다.
