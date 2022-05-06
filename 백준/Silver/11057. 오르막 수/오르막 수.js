const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

let N = +input;

// console.log(input);

// D[i][j] 는 i로 끝나는 길이 j의 오르막수의 갯수를 저장함

let D = new Array(10);

for (let i = 0; i < D.length; i++) {
  D[i] = new Array(1001).fill(0);
}

// 길이가 1인 오르막수는 본인 하나임

for (let i = 0; i < 10; i++) {
  D[i][1] = 1;
}

// console.log(D[1][100]);
// console.log(D[9]);

// j : 길이 1부터 1000까지
for (let j = 1; j < 1001; j++) {
  // i : 끝나는 곳 0부터 9까지
  for (let i = 0; i <= 9; i++) {
    // k : 0부터 i까지
    for (let k = 0; k <= i; k++) {
      // 0이 마지막 곳인 경우
      if (i === 0) {
        // 0만 이용하는 1가지 방법밖에는 없음
        D[i][j] = 1;

        // 1부터 9까지가 마지막인 경우
      } else {
        // 길이가 j이고, i가 마지막인 곳의 값은
        // 길이가 j-1이고, 0부터 i까지가 마지막인 곳에서 1번 이동하여 올 수 있으므로
        // 해당 지점들의 오르막 수의 갯수를 모두 합함
        D[i][j] = (D[i][j] % 10007) + (D[k][j - 1] % 10007);
      }
    }
  }
}

let sum = 0;
for (let i = 0; i < 10; i++) {
  // console.log(D[i][input]);
  sum = sum + (D[i][N] % 10007);
}

console.log(sum % 10007);
