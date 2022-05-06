const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().split(" ");

const K = +input[1];
const N = +input[0];

// console.log(K);
// console.log(N);

// 0부터 200까지인 N에 대하여
// 각 N의 합분해 값을 저장할 배열 D
let D = new Array(201).fill(0);

// D를 200x200 크기의 2차원 배열로 만듬
// D[i][j]는 j를 0부터 j까지의 정수 i개의 합으로 만들 수 있는 경우의 수
for (let i = 0; i < D.length; i++) {
  D[i] = new Array(201).fill(0);
}

// 0부터 j까지의 수 1개로 j를 만들 수 있는 경우는
// j를 1개 쓰는 경우 1개 뿐이다.
for (let j = 0; j < D.length; j++) {
  D[1][j] = 1;
}

// i : 사용하는 수의 갯수
for (let i = 2; i < D.length; i++) {
  // j : 만들어야하는 수
  for (let j = 0; j < D.length; j++) {
    // k : 0부터 만들어야하는 수 j까지
    for (let k = 0; k <= j; k++) {
      // i-1개로 k를 만드는 것을 누적함
      D[i][j] = D[i][j] + (D[i - 1][k] % 1000000000);
    }
  }
}

// ex) 3개를 이용하여 10을 만들어야 하는 경우를 구한다면
// 2개를 이용하여 0부터 10을 만드는 경우에서 10, 9, 8, ..., 2, 1, 0을 더하면 되므로
// 2개를 이용하여 0부터 10을 만드는 경우 수를 모두 누적하면 된다.

// for (let j = 0; j < D.length; j++) {
//   console.log(D[2][j]);
// }

console.log(D[K][N] % 1000000000);
