let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [m, n] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("m", m);
// console.log("n", n);

let graph = new Array(n);

// 익은 토마토의 좌표가 들어갈 배열
let redTomato = [];
let countEmptySpot = 0;

// 이동 가능한 방향 (상하좌우)
const moveX = [1, -1, 0, 0];
const moveY = [0, 0, 1, -1];

// 각 줄
for (let i = 0; i < n; i++) {
  const line = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
  graph[i] = line;

  // console.log("line", line);

  // 각 칸
  for (let j = 0; j < m; j++) {
    // 익은 토마토일 경우
    if (line[j] === 1) {
      // redTomato 배열에 추가, BFS에서 사용되는 큐
      redTomato.push([i, j]);
    }
    // 빈 칸인 경우
    if (line[j] === -1) {
      // 빈 칸의 갯수 +1
      countEmptySpot++;
    }
  }
}

for (let i = 0; i < redTomato.length; i++) {
  // console.log(redTomato[i]);
}

// 전체 토마토가 익을 때까지 몇일이 걸리는지 카운트 하기 위한 days 변수
// 카운트는 BFS의 while문 1번 당 1회씩 한다.
let days = 0;
BFS();

// BFS 결과로 얻게된 익은 토마토의 수(A)를 센다.
let redTomateCnt = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (graph[i][j] === 1) {
      redTomateCnt++;
    }
  }
}

// 전체 칸에서 빈 칸을 제외한 칸의 수(B)를 계산한다.
let haveToPill = n * m - countEmptySpot;

// A와 B가 같다면
if (haveToPill === redTomateCnt) {
  // 몇일이 걸렸는지 출력
  console.log(days);

  // 다르다면
} else {
  // -1 출력
  console.log("-1");
}

function BFS() {
  // 큐처럼 사용하려면 shift()를 사용해야하는데, 이 경우 시간복잡도가 상승해 (배열 재배치 관련)
  // index를 이용해서 사용하기 위해 redTomato의 맨 첫 index를 시작 값으로 가짐.
  let idx = 0;

  // while문을 1번 도는 것은 하루 단위를 의미하고, change === false 조건에 의해 BFS가 종료되므로 while 조건을 true로 둔다.
  while (true) {
    // console.log("-------------------");
    // console.log("graph : ");
    // console.log(graph);

    // console.log("redTomato");
    // console.log(redTomato);

    // 이번 day에서 익은 토마토가 있는지 없는지 체크하는 변수
    let change = false;

    // 어제까지 BFS 진행한 토마토의 다음 번 토마토의 index는 idx이다. (++ 됐기 때문에)
    let todaysFirstIndex = idx;

    // for문을 돌면서 새로 익은 토마토가 redTomate에 push되므로 배열의 길이가 증가한다.
    // 따라서 for문을 돌기전에 이번 day에 BFS를 진행할 토마토의 마지막 index 를 기억한다.
    let todaysLastIndex = redTomato.length - 1;

    // 하루 단위로 BFS를 진행할 tomato이다.
    for (let b = todaysFirstIndex; b <= todaysLastIndex; b++) {
      const [i, j] = redTomato[idx++];

      for (let a = 0; a < moveX.length; a++) {
        // 탐색을 진행할 좌표 (ni, nj)
        const ni = i + moveY[a];
        const nj = j + moveX[a];

        // 접근할 수 없는 곳이면
        if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
          // 다음 탐색 좌표로 넘어감
          continue;
        }

        // 탐색이 가능한 곳인데, 안익은 토마토가 존재하면
        if (graph[ni][nj] === 0) {
          // 해당 토마토를 익히고
          graph[ni][nj] = 1;

          // 익은 토마토 배열에 넣음
          redTomato.push([ni, nj]);

          // 익은 토마토가 있으므로 change 변수를 true로 변경함
          change = true;
        }
        // console.log("[ni, nj] : ", ni, nj);
        // console.log("change", change);
      }
    }

    // 만일 이번 day에 익은 토마토가 없다면 종료한다.
    if (change === false) {
      // console.log("change false end");
      return;

      // 이번 day에 익은 토마토가 있으면 day를 +1 한다.
    } else {
      days++;
    }
  }
}

// 문제 풀이 접근 방식

// graph의 정보를 그리는 과정에서 익은 토마토의 좌표와 빈자리의 수를 파악하고
// BFS를 이용해 익은 토마토의 좌표가 들어있는 redTomato 배열의 처음부터 끝까지를 반복하면서
// 각 redTomato를 배열에서 삭제하고(shift),
// 해당 토마토의 상하좌우에 있는 토마토를 익힌다.(= redTomato 배열에 push)
// redTomato 배열이 빌 때까지 해당 과정을 반복한다.

// 만약 중간에 익은 토마토의 수가 바뀌지 않는다면, 두 가지 경우로 볼 수 있는데,
// 1. 모든 토마토가 다 익어서 더 이상 익힐 토마토가 없는 경우
// 2. 빈 공간이 가로막고 있어 더 이상 익힐 수 없는 경우

// 위의 경우에는 함수를 종료한다.

// 단, 함수가 종료되면 밖에서는 함수가 종료된 이유를 정확히 알 수 없으므로
// 다음 조건으로 함수가 끝난 이유를 파악한다.

// 익은 토마토의 수 A와 빈 공간을 제외한 토마토가 들어갈 수 있는 공간의 수 B가

// 1. 같은 경우
// => 모든 토마토가 알맞게 익은 경우이므로, BFS를 진행하는 과정에서 누적했던 days를 출력한다.

// 2. 다른 경우
// => 빈 공간에 가로막혀 모든 토마토를 익히지 못했으므로 -1를 출력한다.
