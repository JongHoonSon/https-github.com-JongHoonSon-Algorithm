const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

let board = new Array(N);

for (let i = 0; i < N; i++) {
  board[i] = input[i].trim().split("");
  // console.log(board[i]);
}

// console.log('-----------');
// console.log('--------');
// console.log(board.length);

let totalMax = 0;
let boardCopy = [];
// 가로 방향으로 교환
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N - 1; j++) {
    boardCopy = JSON.parse(JSON.stringify(board));

    if (boardCopy[i][j] === board[i][j + 1]) {
      continue;
    } else {
      const temp1 = boardCopy[i][j];
      boardCopy[i][j] = boardCopy[i][j + 1];
      boardCopy[i][j + 1] = temp1;
    }

    // console.log(boardCopy[0]);
    // console.log(boardCopy[1]);
    // console.log(boardCopy[2]);

    // console.log('--------');

    totalMax = Math.max(totalMax, getMaxConsec(boardCopy));
  }
}

// console.log('--------');

// 세로 방향으로 교환
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N - 1; j++) {
    boardCopy = JSON.parse(JSON.stringify(board));

    if (boardCopy[j][i] === board[j + 1][i]) {
      continue;
    } else {
      const temp1 = boardCopy[j][i];
      boardCopy[j][i] = boardCopy[j + 1][i];
      boardCopy[j + 1][i] = temp1;
    }

    // console.log(boardCopy[0]);
    // console.log(boardCopy[1]);
    // console.log(boardCopy[2]);

    // console.log('--------');

    totalMax = Math.max(totalMax, getMaxConsec(boardCopy));
  }
}

function getMaxConsec(array) {
  let maxRow = 0;

  // 가로(행)
  for (let i = 0; i < array.length; i++) {
    let consec = 1;
    for (let j = 0; j < array.length - 1; j++) {
      if (array[i][j] === array[i][j + 1]) {
        consec++;
      } else {
        // console.log("i : ", i);
        // console.log("j : ", j);
        // console.log("array[i][j] : ", array[i][j]);
        // console.log("array[i][j+1] : ", array[i][j+1]);
        maxRow = Math.max(maxRow, consec);
        consec = 1;
      }
      maxRow = Math.max(maxRow, consec);
    }
  }

  let maxCol = 0;

  // 세로(열)
  for (let i = 0; i < array.length; i++) {
    let consec = 1;
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j][i] === array[j + 1][i]) {
        consec++;
      } else {
        maxCol = Math.max(maxCol, consec);
        consec = 1;
      }
      maxCol = Math.max(maxCol, consec);
    }
  }

  return Math.max(maxCol, maxRow);
}

console.log(totalMax);

// 문제 풀이 접근 방식

// 교환 가능한 모든 자리를 한 번씩 교환하면서
// 그 때 마다의 가장 긴 연속 부분의 길이를 구하여,
// 그 값이 최댓값이라면 totalMax에 저장하는 방식으로 푸는 브루트 포스 문제이다.
