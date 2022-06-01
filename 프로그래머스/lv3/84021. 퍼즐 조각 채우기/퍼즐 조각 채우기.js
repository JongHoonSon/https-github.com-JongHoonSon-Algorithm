function solution(game_board, table) {
  var answer = -1;

  let totalCnt = 0;

  let move = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let puzzles = [];

  let willVisit = new Array(table.length);

  for (let i = 0; i < willVisit.length; i++) {
    willVisit[i] = new Array(table[0].length).fill(0);
  }

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length; j++) {
      BFS(i, j);
    }
  }

  function BFS(startI, startJ) {
    if (table[startI][startJ] === 0 || willVisit[startI][startJ] === 1) {
      return false;
    }

    let queue = [];
    queue.push([startI, startJ]);
    willVisit[startI][startJ] = 1;

    let idx = 0;
    let firstIndex;
    let lastIndex;

    while (queue.length !== idx) {
      firstIndex = idx;
      lastIndex = queue.length - 1;

      for (let a = firstIndex; a <= lastIndex; a++) {
        let [i, j] = queue[a];
        idx++;

        for (let b = 0; b < 4; b++) {
          let [ni, nj] = [i + move[b][0], j + move[b][1]];

          if (
            ni < 0 ||
            ni > table.length - 1 ||
            nj < 0 ||
            nj > table[0].length - 1
          ) {
            continue;
          }

          if (table[ni][nj] === 1 && willVisit[ni][nj] === 0) {
            queue.push([ni, nj]);
            willVisit[ni][nj] = 1;
          }
        }
      }
    }

    puzzles.push(queue);
  }

  console.log(puzzles);

  for (let a = 0; a < puzzles.length; a++) {
    let minI = Infinity;
    let minJ = Infinity;
    for (let b = 0; b < puzzles[a].length; b++) {
      let [i, j] = puzzles[a][b];

      minI = Math.min(minI, i);
      minJ = Math.min(minJ, j);
    }

    // console.log(`minI :`, minI );
    // console.log(`minJ :`, minJ );

    for (let b = 0; b < puzzles[a].length; b++) {
      let [i, j] = puzzles[a][b];
      puzzles[a][b] = [i - minI, j - minJ];
    }
  }
  // console.log("------------------")
  // console.log(puzzles);

  let puzzlesLength = puzzles.length;

  for (let a = 0; a < puzzlesLength; a++) {
    let newPuzzle_deg90 = [];
    for (let b = 0; b < puzzles[a].length; b++) {
      let [i, j] = puzzles[a][b];

      if ((i === 0) & (j === 0)) {
        newPuzzle_deg90.push([0, 0]);
      } else if (i === 0) {
        newPuzzle_deg90.push([j, 0]);
      } else if (j === 0) {
        newPuzzle_deg90.push([0, -i]);
      } else {
        newPuzzle_deg90.push([j, -i]);
      }
    }

    puzzles.push(newPuzzle_deg90);
  }

  for (let a = 0; a < puzzlesLength; a++) {
    let newPuzzle_deg180 = [];
    for (let b = 0; b < puzzles[a].length; b++) {
      let [i, j] = puzzles[a][b];

      if ((i === 0) & (j === 0)) {
        newPuzzle_deg180.push([0, 0]);
      } else if (i === 0) {
        newPuzzle_deg180.push([0, -j]);
      } else if (j === 0) {
        newPuzzle_deg180.push([-i, 0]);
      } else {
        newPuzzle_deg180.push([-i, -j]);
      }
    }

    puzzles.push(newPuzzle_deg180);
  }

  for (let a = 0; a < puzzlesLength; a++) {
    let newPuzzle_deg270 = [];
    for (let b = 0; b < puzzles[a].length; b++) {
      let [i, j] = puzzles[a][b];

      if ((i === 0) & (j === 0)) {
        newPuzzle_deg270.push([0, 0]);
      } else if (i === 0) {
        newPuzzle_deg270.push([-j, 0]);
      } else if (j === 0) {
        newPuzzle_deg270.push([0, i]);
      } else {
        newPuzzle_deg270.push([-j, i]);
      }
    }

    puzzles.push(newPuzzle_deg270);
  }

  for (let a = 0; a < puzzles.length; a++) {
    let minI = Infinity;
    let minJ = Infinity;
    for (let b = 0; b < puzzles[a].length; b++) {
      let [i, j] = puzzles[a][b];

      minI = Math.min(minI, i);
      minJ = Math.min(minJ, j);
    }

    // console.log(`minI :`, minI );
    // console.log(`minJ :`, minJ );

    for (let b = 0; b < puzzles[a].length; b++) {
      let [i, j] = puzzles[a][b];
      puzzles[a][b] = [i - minI, j - minJ];
    }
  }

  console.log("------------------");
  console.log("puzzles");
  console.log(puzzles);

  let empty_puzzles = [];

  willVisit = new Array(game_board.length);

  for (let i = 0; i < willVisit.length; i++) {
    willVisit[i] = new Array(game_board[0].length).fill(0);
  }

  for (let i = 0; i < game_board.length; i++) {
    for (let j = 0; j < game_board.length; j++) {
      BFS2(i, j);
    }
  }

  function BFS2(startI, startJ) {
    if (game_board[startI][startJ] === 1 || willVisit[startI][startJ] === 1) {
      return false;
    }

    let queue = [];
    queue.push([startI, startJ]);
    willVisit[startI][startJ] = 1;

    let idx = 0;
    let firstIndex;
    let lastIndex;

    while (queue.length !== idx) {
      firstIndex = idx;
      lastIndex = queue.length - 1;

      for (let a = firstIndex; a <= lastIndex; a++) {
        let [i, j] = queue[a];
        idx++;

        for (let b = 0; b < 4; b++) {
          let [ni, nj] = [i + move[b][0], j + move[b][1]];

          if (
            ni < 0 ||
            ni > game_board.length - 1 ||
            nj < 0 ||
            nj > game_board[0].length - 1
          ) {
            continue;
          }

          if (game_board[ni][nj] === 0 && willVisit[ni][nj] === 0) {
            queue.push([ni, nj]);
            willVisit[ni][nj] = 1;
          }
        }
      }
    }

    empty_puzzles.push(queue);
  }

  // console.log(empty_puzzles);

  for (let a = 0; a < empty_puzzles.length; a++) {
    let minI = Infinity;
    let minJ = Infinity;
    for (let b = 0; b < empty_puzzles[a].length; b++) {
      let [i, j] = empty_puzzles[a][b];

      minI = Math.min(minI, i);
      minJ = Math.min(minJ, j);
    }

    // console.log(`minI :`, minI );
    // console.log(`minJ :`, minJ );

    for (let b = 0; b < empty_puzzles[a].length; b++) {
      let [i, j] = empty_puzzles[a][b];
      empty_puzzles[a][b] = [i - minI, j - minJ];
    }
  }

  console.log("------------------");
  console.log("empty_puzzles");
  console.log(empty_puzzles);

  // 도형 검사

  console.log("-------------------");
  console.log("맞는 도형");

  let isUsedPuzzle = new Array(puzzlesLength).fill(false);

  for (let i = 0; i < empty_puzzles.length; i++) {
    for (let j = 0; j < puzzles.length; j++) {
      if (empty_puzzles[i].length !== puzzles[j].length) {
        continue;
      }

      if (isUsedPuzzle[j % puzzlesLength] === true) {
        continue;
      }

      let isIn;

      for (let a = 0; a < puzzles[j].length; a++) {
        isIn = false;
        let stringPuzzle = JSON.stringify(puzzles[j][a]);

        for (let k = 0; k < empty_puzzles[i].length; k++) {
          let stringEmptyPuzzle = JSON.stringify(empty_puzzles[i][k]);

          if (stringPuzzle === stringEmptyPuzzle) {
            isIn = true;
            break;
          }
        }
        if (isIn === false) {
          break;
        }
      }

      if (isIn === true) {
        console.log(puzzles[j]);
        totalCnt += puzzles[j].length;
        isUsedPuzzle[j % puzzlesLength] = true;
        break;
      }
    }
  }

  console.log(isUsedPuzzle);

  answer = totalCnt;

  return answer;
}
