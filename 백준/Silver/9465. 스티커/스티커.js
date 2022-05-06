const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();
const inputLength = input.length;

let answer = [];

for (let a = 0; a < inputLength; a = a + 3) {
  const n = +input.shift();

  let row0 = input
    .shift()
    .toString()
    .trim()
    .split(" ")
    .map((v) => +v);

  let row1 = input
    .shift()
    .toString()
    .trim()
    .split(" ")
    .map((v) => +v);

  // D[i][j]는 (i, j)까지 뗄 수 있는 스티커들의 값의 합 중에 가장 큰 값

  let D = new Array(2);

  D[0] = row0;
  D[1] = row1;

  // j : 스티커의 열 값 (1 ~ n)
  for (let j = 1; j < n; j++) {
    // i : 스티커의 행 값 (0 or 1)
    for (let i = 0; i < 2; i++) {
      // 1번 열이고
      if (j === 1) {
        // 0번 행이면, 0번 열 & 1번 행의 값을 가져오고
        if (i === 0) {
          D[i][j] = D[i][j] + D[i + 1][j - 1];

          // 1번 행이면, 0번 열 & 0번 행의 값을 가져옴
        } else if (i === 1) {
          D[i][j] = D[i][j] + D[i - 1][j - 1];
        }

        // 1번 열이 아니고
      } else {
        // 0번 행이면
        if (i === 0) {
          // 왼쪽 아래칸 또는 왼왼쪽 아래칸 중 큰 값을 취한다.
          // (전략적으로 한 칸(열)을 뛰어넘을 수 있지만,
          // 두 칸 뛰어넘는 것은 의미가 없음)
          D[i][j] = Math.max(
            D[i][j] + D[i + 1][j - 1],
            D[i][j] + D[i + 1][j - 2]
          );
          // 1번 행이면
        } else if (i === 1) {
          // 왼쪽 위의칸 또는 왼왼쪽 위의칸 중 큰 값을 취한다.
          // (전략적으로 한 칸(열)을 뛰어넘을 수 있지만,
          // 두 칸 뛰어넘는 것은 의미가 없음)
          D[i][j] = Math.max(
            D[i][j] + D[i - 1][j - 1],
            D[i][j] + D[i - 1][j - 2]
          );
        }
      }
    }
  }

  // console.log(D[0]);
  // console.log(D[1]);

  // 최댓값이 누적된 N에서 0번 또는 1번 행 중에서 큰 값을 취함
  answer.push(Math.max(D[0][n - 1], D[1][n - 1]));
}

console.log(answer.join("\n"));
