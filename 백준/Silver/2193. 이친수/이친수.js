const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

let N = Number(input);

// console.log(N);

// 이진수에서 사용되는 0 또는 1를 저장하는 배열
let D = new Array(2);

const resetNum = BigInt(-1);

// 이진수의 길이 N이 최대 90이므로 1부터 90까지 사용함
D[0] = new Array(91).fill(resetNum);
D[1] = new Array(91).fill(resetNum);

// D[i][j]에서
// i는 해당 자리의 이진수 값 0, 1 이고
// j는 이친수의 길이이다.

// D[i][j]는 i로 끝나는 길이 j짜리 이친수의 갯수를 의미한다.

// 0으로 끝나는 길이 1짜리 이친수는 존재하지 않음 (문제 조건)
D[0][1] = BigInt(0);

// 1로 끝나는 길이 1짜리 이친수는 1개 존재 ('1')
D[1][1] = BigInt(1);

// console.log(D[0][0]);
// console.log(D[1][0]);

// D의 값을 채우는 DP
function DP(x, y) {
  // 만약 D[x][y]를 계산한 적이 있다면, 해당 값 사용
  if (D[x][y] !== BigInt(-1)) {
    return D[x][y];

    // 길이가 y이면서 0으로 끝나는 이친수의 갯수는
  } else if (x === 0) {
    // 길이가 y-1이면서 0으로 끝나는 이친수의 갯수와
    // 길이가 y-1이면서 1으로 끝나는 이친수의 갯수의 합임
    // (0이나 1에서 올 수 있음)
    D[x][y] = DP(x, y - 1) + DP(x + 1, y - 1);

    // 길이가 y이면서 1로 끝나는 이친수의 갯수는
  } else if (x === 1) {
    // 길이가 y-1이면서 0으로 끝나는 이친수의 갯수와 같음
    // (0에서는 올 수 있지만, 1에서는 올 수 있음, 문제 조건)
    D[x][y] = DP(x - 1, y - 1);
  }
  return D[x][y];
}

console.log((DP(0, N) + DP(1, N)).toString());
