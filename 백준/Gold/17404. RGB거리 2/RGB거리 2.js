const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const num = +input.shift();

let A = new Array(3);
let R = new Array(3);
let G = new Array(3);
let B = new Array(3);

for (let i = 0; i < 3; i++) {
  A[i] = new Array(num);
  R[i] = new Array(num);
  G[i] = new Array(num);
  B[i] = new Array(num);
}
// console.log(D);

for (let i = 0; i < num; i++) {
  const array = input[i].split(" ").map((v) => +v);
  A[0][i] = array[0];
  A[1][i] = array[1];
  A[2][i] = array[2];
  if (i === 0) {
    R[0][0] = A[0][0];
    G[0][0] = A[0][0];
    B[0][0] = A[0][0];

    R[1][0] = A[1][0];
    G[1][0] = A[1][0];
    B[1][0] = A[1][0];

    R[2][0] = A[2][0];
    G[2][0] = A[2][0];
    B[2][0] = A[2][0];
  }
}

for (let j = 1; j < num; j++) {
  for (let i = 0; i < 3; i++) {
    if (j === 1) {
      if (i === 0) {
        R[i][j] = Infinity;
      } else {
        R[i][j] = R[0][0];
      }
    } else if (j === num - 1) {
      if (i === 0) {
        R[i][j] = Infinity;
      } else if (i === 1) {
        R[i][j] = Math.min(R[i - 1][j - 1], R[i + 1][j - 1]);
      } else if (i === 2) {
        R[i][j] = Math.min(R[i - 2][j - 1], R[i - 1][j - 1]);
      }
    } else {
      if (i === 0) {
        R[i][j] = Math.min(R[i + 1][j - 1], R[i + 2][j - 1]);
      } else if (i === 1) {
        R[i][j] = Math.min(R[i - 1][j - 1], R[i + 1][j - 1]);
      } else if (i === 2) {
        R[i][j] = Math.min(R[i - 2][j - 1], R[i - 1][j - 1]);
      }
    }
    R[i][j] = R[i][j] + A[i][j];
  }
}

for (let j = 1; j < num; j++) {
  for (let i = 0; i < 3; i++) {
    if (j === 1) {
      if (i === 1) {
        G[i][j] = Infinity;
      } else {
        G[i][j] = G[1][0];
      }
    } else if (j === num - 1) {
      if (i === 0) {
        G[i][j] = Math.min(G[i + 1][j - 1], G[i + 2][j - 1]);
      } else if (i === 1) {
        G[i][j] = Infinity;
      } else if (i === 2) {
        G[i][j] = Math.min(G[i - 2][j - 1], G[i - 1][j - 1]);
      }
    } else {
      if (i === 0) {
        G[i][j] = Math.min(G[i + 1][j - 1], G[i + 2][j - 1]);
      } else if (i === 1) {
        G[i][j] = Math.min(G[i - 1][j - 1], G[i + 1][j - 1]);
      } else if (i === 2) {
        G[i][j] = Math.min(G[i - 2][j - 1], G[i - 1][j - 1]);
      }
    }
    G[i][j] = G[i][j] + A[i][j];
  }
}

for (let j = 1; j < num; j++) {
  for (let i = 0; i < 3; i++) {
    if (j === 1) {
      if (i === 2) {
        B[i][j] = Infinity;
      } else {
        B[i][j] = B[2][0];
      }
    } else if (j === num - 1) {
      if (i === 0) {
        B[i][j] = Math.min(B[i + 1][j - 1], B[i + 2][j - 1]);
      } else if (i === 1) {
        B[i][j] = Math.min(B[i - 1][j - 1], B[i + 1][j - 1]);
      } else if (i === 2) {
        B[i][j] = Infinity;
      }
    } else {
      if (i === 0) {
        B[i][j] = Math.min(B[i + 1][j - 1], B[i + 2][j - 1]);
      } else if (i === 1) {
        B[i][j] = Math.min(B[i - 1][j - 1], B[i + 1][j - 1]);
      } else if (i === 2) {
        B[i][j] = Math.min(B[i - 2][j - 1], B[i - 1][j - 1]);
      }
    }
    B[i][j] = B[i][j] + A[i][j];
  }
}

// console.log(A[0]);
// console.log(A[1]);
// console.log(A[2]);
// console.log('-----');
// console.log(R[0]);
// console.log(R[1]);
// console.log(R[2]);
// console.log('-----');
// console.log(G[0]);
// console.log(G[1]);
// console.log(G[2]);
// console.log('-----');
// console.log(B[0]);
// console.log(B[1]);
// console.log(B[2]);

console.log(
  Math.min(
    R[1][num - 1],
    R[2][num - 1],
    G[0][num - 1],
    G[2][num - 1],
    B[0][num - 1],
    B[1][num - 1]
  )
);

// 1149번 : RGB거리 문제와의 차이점은
// 1번째 집과 N번째 집의 지붕의 색이 달라야한다는 것이다.

// 문제 풀이 접근 방식

// 1번째 지붕의 색을
// R로 칠했을 때, G로 칠했을 때, B로 칠했을 때의 경우에 따라
// N번째 지붕의 색을 칠할 때, 고를 수 있는 경우가 정해지므로
// 1149번 : RGB거리 문제는 지붕의 값을 담고 있는 배열 A만을 이용해서 풀었다면

// 이번 문제는 1번째 지붕의 색을 R, G, B로 칠한 경우를 각각 나누어 계산한다.
// 소스가 길기 때문에 주석 설명은 생략
