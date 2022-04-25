let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const line = input.shift().trim();
const n = +line.split(" ")[0];
const m = +line.split(" ")[1];

// 이동 방향 : 상하좌우
const moveX = [1, -1, 0, 0];
const moveY = [0, 0, 1, -1];

// console.log("n", n);
// console.log("m", m);

let graph = new Array(n);

for (let i = 0; i < n; i++) {
  graph[i] = input
    .shift()
    .trim()
    .split("")
    .map((v) => +v);
}

for (let i = 0; i < n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

BFS(0, 0);

function BFS(startI, startJ) {
  const queue = [];

  // 시작점 큐에 넣기
  queue.push(startI);
  queue.push(startJ);

  // 큐가 빌때까지 반복
  while (queue.length !== 0) {
    // 방문 예정 목록에서 특정 좌표의 i값과 j값 꺼냄
    const i = queue.shift();
    const j = queue.shift();

    const x = graph[i][j];

    // 못가는 곳이 아니라면 계속 갈 수 있음
    if (x !== 0) {
      for (let a = 0; a < moveX.length; a++) {
        // 이동할 수 있는 곳 (ni, nj)
        const ni = i + moveY[a];
        const nj = j + moveX[a];

        // (ni, nj)가 탐색 가능한 지역이 아니라면
        if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
          // 넘어감
          continue;
        }

        // (ni, nj)가 탐색 가능한 지역이라면 (아직 한번도 방문 x)
        if (graph[ni][nj] === 1) {
          // 이전 좌표의 값 +1 로 해당 좌표의 값을 설정
          graph[ni][nj] = graph[i][j] + 1;

          // 방문 예정 목록에 넣음
          queue.push(ni);
          queue.push(nj);
        }
      }

      // x가 못가는 곳이라는 것은, 첫 시작 지점이 0이었다는 듯
      // (처음에 x!== 0 로 들어갈 경우 graph[i][j]의 값이 1인 곳으로만 이동하므로,
      // graph[i][j]가 곧 x이므로 x === 0 인 곳으로 갈 수 없다.)
      // while 문의 시작에서 startI와 startJ로 처리하는게 더 나을듯함
    } else if (x === 0) {
      return false;
    }
  }

  console.log(graph[n - 1][m - 1]);
}

// 문제 풀이 접근 방식

// 최단 거리를 구하는 문제로, BFS를 이용해 인접한 좌표중에
// 이동 가능한 좌표만으로 이동을 계속하면서
// 이동한 위치의 값을 이전 위치의 값 +1 로 업데이트 해주면서 이동하다가
// 마지막에 목적지 (여기서는 (N,M))의 값을 출력하면 된다.
