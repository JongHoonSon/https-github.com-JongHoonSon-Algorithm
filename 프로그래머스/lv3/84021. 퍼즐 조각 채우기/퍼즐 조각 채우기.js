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

  // 1. 퍼즐 찾기
  // table에서 퍼즐을 찾는 BFS 수행

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

    // BFS로 찾은 퍼즐 => BFS 과정에서 queue에 담긴 좌표 (BFS에서 방문한 좌표)
    puzzles.push(queue);
  }

  console.log(puzzles);

  // 찾은 퍼즐을 (0,0)을 기준으로 모음

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

  // 2. 퍼즐 복제하기
  // 각 퍼즐을 90도, 180도, 270도 회전시킨 것을 puzzles에 넣음

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

  // 회전한 puzzle의 좌표도 (0,0)을 기준으로 모음

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

  // 3. 빈 칸 찾기
  // game_board에서 빈 칸 퍼즐을 찾는 BFS 수행

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

  // 찾은 빈 칸 퍼즐을 (0,0) 기준으로 모음

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

  // 4. 빈 칸 퍼즐을 채울 수 있는 퍼즐이 있는지 검사

  console.log("-------------------");
  console.log("맞는 도형");

  // 사용된 퍼즐을 기록할 배열
  let isUsedPuzzle = new Array(puzzlesLength).fill(false);

  // 각 빈 칸 퍼즐에 대해
  for (let i = 0; i < empty_puzzles.length; i++) {
    // 각 퍼즐을 대입해봄
    for (let j = 0; j < puzzles.length; j++) {
      // 만약 빈 칸 퍼즐과 퍼즐의 길이가 같지 않으면, 넘어감
      if (empty_puzzles[i].length !== puzzles[j].length) {
        continue;
      }

      // 만약 사용된 퍼즐이라면, 넘어감
      if (isUsedPuzzle[j % puzzlesLength] === true) {
        continue;
      }

      // 빈 칸 퍼즐을 이루는 좌표가
      // 퍼즐에 들어있는지 확인하는 과정
      // (빈 칸 퍼즐과 퍼즐은 좌표값은 같지만 순서는 다를 수 있음
      // ex) 빈 칸 퍼즐 : [1,0] [1,1] [0,1]
      //     퍼즐      : [1,1] [0,1] [1,0] 처럼)
      let isIn;

      // 퍼즐의 각 좌표
      for (let a = 0; a < puzzles[j].length; a++) {
        isIn = false;

        // 퍼즐의 각 좌표를 string으로 바꿈 (비교를 위해)
        let stringPuzzle = JSON.stringify(puzzles[j][a]);

        // 빈 칸 퍼즐의 각 좌표
        for (let k = 0; k < empty_puzzles[i].length; k++) {
          // 빈 칸 퍼즐의 각 좌표를 string으로 바꿈 (비교를 위해)
          let stringEmptyPuzzle = JSON.stringify(empty_puzzles[i][k]);

          // 같다면
          if (stringPuzzle === stringEmptyPuzzle) {
            // 같다고 표시하고 종료함
            isIn = true;
            break;
          }
        }

        // 만약 퍼즐의 좌표 중에서 빈 칸 퍼즐에 포함되지 않는 좌표가 있다면 (= 빈 칸 퍼즐과 퍼즐의 길이는 같지만, 모양은 다름)
        if (isIn === false) {
          // 종료함, (이어서 다음 퍼즐을 빈 칸 퍼즐과 대조함)
          break;
        }
      }

      // 만약 위의 반복문이 끝났을 때 isIn의 값이 true라면,
      // 빈 칸 퍼즐과 퍼즐의 모든 좌표 값이 일치했다는 것을 의미
      if (isIn === true) {
        console.log(puzzles[j]);

        // 퍼즐의 길이를 totalCnt에 더하고
        totalCnt += puzzles[j].length;

        // 빈 칸 퍼즐과 일치했던 퍼즐을 사용 처리함
        isUsedPuzzle[j % puzzlesLength] = true;
        break;
      }
    }
  }

  console.log(isUsedPuzzle);

  answer = totalCnt;

  return answer;
}

// 후기

// 문제를 푸는데 2시간이 걸린 헬 문제이다.
// 문제를 푸는 것 자체는 겉보이엔 단순해 보이나, 고려해야하는 조건이 너무 많아서 오래 걸렸다.

// 문제 풀이 접근 방식

// game_board에서 BFS를 수행하여, 빈 칸의 좌표값을 empty_puzzles 배열에 넣는다.
// table에서 BFS를 수행하여, 각 퍼즐의 좌표값을 puzzles 배열에 넣는다.
// 각 퍼즐을 90도, 180도, 270도 회전시킬 수 있으므로,
// 각 퍼즐을 회전 시킨 후 퍼즐의 좌표값을 puzzles 배열에 넣는다.
// 빈 칸의 좌표값이 담긴 empty_puzzles를 반복하면서
// puzzles에 담긴 puzzles 중에서 empty_puzzles에 맞는 퍼즐이 있는지 확인하고,
// 맞는 퍼즐이 있다면, 해당 퍼즐의 크기를 totalCnt에 누적한다.

// 주의할 점

// 1. 각 퍼즐과, 빈 칸의 좌표를 (0,0)을 기준으로 만들기 위해
// 각 퍼즐, 빈 칸의 table, game_board 상의 좌표 중에서 가장 작은 값인
// minI와 minJ를 이용해서 (0,0) 쪽으로 이동시킨다.

// 2. 퍼즐을 회전 시킨 후에도 회전된 퍼즐에도 1을 진행한다.

// 3. 사용한 퍼즐을 기록하기 위해 90도 180도 270도 순서로 puzzles에 넣는다

// 예를 들어 3개의 퍼즐(a,b,c)이 존재했다면, puzzles 요소의 순서는 다음과 같다.
// a, b, c, a90, b90, c90, a180, b180, c180, a270, b270, c270

// 여기서 a퍼즐을 사용했을 경우(= a 또는 a90 또는 a180 또는 a270을 사용한 경우)
// isUsedPuzzle 배열의 '사용한 퍼즐의 인덱스 % 퍼즐의 가짓수(종류)' 인덱스의 값을 1로 한다.

// a로 부터 만들어진 퍼즐의 인덱스는 각각
// a    => 0
// a90  => 3
// a180 => 6
// a270 => 9 이고,

// 퍼즐의 가짓수(종류)가 3개 이므로

// a, a90, a180, a270 중 아무거나 사용하더라도
// isUsedPuzzle[0] 의 값을 true로 변경한다.

// 추후 해당 퍼즐을 empty_puzzle에 넣는데 사용하지 않도록
// 반복문에서 if문으로 isUsedPuzzle[퍼즐의 인덱스 % 퍼즐의 가짓수]의 값을 체크한다.
