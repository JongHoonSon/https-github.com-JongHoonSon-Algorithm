let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

// console.log("testCaseNum", testCaseNum);

let graph;

// 이동 가능한 방향 (나이트)
const move = [
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
];

for (let i = 0; i < testCaseNum; i++) {
  const l = +input.shift();
  const [startI, startJ] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
  const [destI, destJ] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
  // console.log("startI startJ : ", startI, startJ);
  // console.log("destI destJ", destI, destJ);
  // console.log("l", l);

  graph = new Array(l);

  for (let j = 0; j < l; j++) {
    graph[j] = new Array(l).fill(0);
  }

  BFS(startI, startJ, l);

  // BFS 후에 목적지로 가는 최소 비용 출력
  console.log(graph[destI][destJ]);
}

function BFS(startI, startJ, l) {
  const queue = [];

  queue.push([startI, startJ]);

  while (queue.length !== 0) {
    const [i, j] = queue.shift();

    for (let a = 0; a < 8; a++) {
      // 탐색할 곳의 좌표 (ni, nj)
      const ni = i + move[a][0];
      const nj = j + move[a][1];

      // 탐색할 수 없는 곳이면
      if (ni < 0 || nj < 0 || ni >= l || nj >= l) {
        // 다음 좌표로 넘어감
        continue;
      }

      // 탐색할 수 있는 곳이고, 첫 시작점이 아니면
      if (graph[ni][nj] === 0 && (ni !== startI || nj !== startJ)) {
        // 해당 좌표로 이동하기 전의 좌표의 값(최소 비용)에서 +1한 값 저장
        graph[ni][nj] = graph[i][j] + 1;
        queue.push([ni, nj]);
      }
    }
  }
}

// 문제 풀이 접근 방식

// 최단 거리를 구하는 문제랑 유사한 문제로,
// BFS를 이용해 각 좌표로 이동하는데 드는 비용을 계산하고
// 마지막에 목적지 좌표의 값을 출력하면 된다.

// 최단 거리랑 다른 점은
// 최단 거리를 구하는 문제는 인접한 칸(상하좌우)에 대해 이동하지만,
// 이 문제는 체스에서 나이트가 움직이는대로
// 여러 칸을 건너 뛰고 이동한다는 점 뿐이다.
