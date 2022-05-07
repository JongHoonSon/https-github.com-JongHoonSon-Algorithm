const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const num = +input.shift();

// D[i]는 3xi 크기의 벽을 2x1, 1x2 크기의 타일로 채우는 경우의 수
let D = new Array(num + 1).fill(0);

// console.log(D);
D[0] = 0;
D[1] = 0;

// 3x2 크기의 벽은

// 2x1 2개 + 1x2 1개
// 1x2 1개 + 2x1 2개
// 1x2 3개

// 로 채워 넣을 수 있으므로, 경우의 수가 3가지 존재한다.
D[2] = 3;

console.log(DP(num));

function DP(x) {
  // 이미 구한 적 있는 값이면 해당 값 사용
  if (D[x] !== 0) {
    return D[x];
  }

  // x가 짝수일 경우 (벽이 3x2n 크기)
  if (x % 2 === 0) {
    // 3*x 크기의 벽에 넣을 수 있는 타일의 수는

    // 이전 크기의 벽 (3x(2-1)n 크기의 벽의 경우의 수에서
    // 각 경우의 수마다 위에서 설명한 3가지 경우의 수가 추가로 생기므로
    // 각 경우의 수인 DP(x-2)에 x3을 하고,

    // 2를 더한다.
    // (2는 N이 4 또는 6일 때 발생하는
    // 경계선에 1x2 타일을 끼워 만들 수 있는 돌연변이)
    D[x] = 3 * DP(x - 2) + 2;

    // x보다 낮은 짝수인 k의 에서도 돌연변이가 발생했을 것이므로
    // k에서 발생한 돌연변이 (2n개)로부터 발생할
    // 추가적인 돌연변이 (2n개 x 2)를 D[x]에 추가해줌
    let k = x - 2;
    while (k >= 2) {
      D[x] = D[x] + D[k - 2] * 2;
      k = k - 2;
    }
  }
  return D[x];
}

// 이 문제에 대해 바텀업 방식으로 된 좀 더 직관적인 코드를 설명한 블로그
// https://webruden.tistory.com/1048
