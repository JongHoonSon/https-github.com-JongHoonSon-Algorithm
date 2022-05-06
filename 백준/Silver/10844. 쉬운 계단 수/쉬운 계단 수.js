const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

let N = Number(input);

// console.log(input);

const mod = BigInt(1000000000);

// 계단의 수 (0~9까지 10개)
let D = new Array(10);

// D는 10x101 크기의 2차원 배열
// D[i][j]에서
// i는 마지막으로 끝나는 계단의 번호 (1~9)
// j는 길이 (1~100)
for (let i = 0; i <= 9; i++) {
  D[i] = new Array(101).fill(0);
}

// 길이가 1이면서 0번 계단으로 끝나는 계단 수는 없음 (문제 조건)
D[0][1] = BigInt(0);
// 1번부터 9번까지 반복 (마지막으로 끝나는 계단의 위치)
for (let i = 1; i <= 9; i++) {
  // 길이가 1인 계단 수를 만드는 방법은 1개이므로 1을 기본값으로 저장
  D[i][1] = BigInt(1);
}

// for (let i = 1; i <= 9; i++) {
//   console.log(i + " : " + D[i] + "\n");
// }

// 길이 j이면서 i번 계단으로 끝나는 계단 수의 갯수 계산
for (let j = 2; j <= N; j++) {
  for (let i = 0; i <= 9; i++) {
    // 길이가 j-1짜리 계단 수 중에서
    // i-1에서 끝난 계단 수의 갯수와
    // i+1에서 끝난 계딴 수의 갯수의 합을 저장

    // 0번 계단으로 끝난다면 1번 계단에서 내려오는 경우밖에 없음
    if (i === 0) {
      D[i][j] = BigInt(D[i + 1][j - 1]);

      // 9번 계단으로 끝난다면 8번 계단에서 올라오는 경우밖에 없음
    } else if (i === 9) {
      D[i][j] = BigInt(D[i - 1][j - 1]);

      // 그 외에는 본인보다 1낮거나 1높은 계단에서 이동해올 수 있음
    } else {
      D[i][j] = BigInt(D[i - 1][j - 1]) + BigInt(D[i + 1][j - 1]);
    }
  }
}

// console.log('------------------------------');

// for (let i = 0; i <= 9; i++) {
//   console.log(i + " : " + D[i][N] + "\n");
// }

let sum = BigInt(0);

// 길이가 N인 계단 수의 합 저장
for (let i = 0; i <= 9; i++) {
  sum = sum + (BigInt(D[i][N]) % mod);
}

console.log(Number(sum % mod));
