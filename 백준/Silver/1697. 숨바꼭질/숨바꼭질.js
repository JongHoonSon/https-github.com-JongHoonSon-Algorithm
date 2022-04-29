let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [n, k] = input[0]
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("n", n);
// console.log("k", k);

let graph = new Array(100000 + 1).fill(0);

BFS(n);

// console.log("graph", graph);

console.log(graph[k]);

function BFS(startNode) {
  let queue = [];
  queue.push(startNode);
  let willVisit = new Array(100000 + 1).fill(false);
  willVisit[startNode] = true;

  while (queue.length !== 0) {
    const x = queue.shift();

    // x번 노드에서 1초만에 이동 가능한 경우는 아래 나와있는 3가지가 전부이다.

    // 현재 좌표에서 -1만큼 이동하는 경우

    const y1 = x - 1;

    if (y1 >= 0 && willVisit[y1] === false) {
      graph[y1] = graph[x] + 1;
      queue.push(y1);
      willVisit[y1] = true;
    }

    // 현재 좌표에서 +1만큼 이동하는 경우

    const y2 = x + 1;

    if (y2 <= 100000 && willVisit[y2] === false) {
      graph[y2] = graph[x] + 1;
      queue.push(y2);
      willVisit[y2] = true;
    }

    // 현재 좌표에서 *2만큼 이동하는 경우

    const y3 = x * 2;

    if (y3 <= 100000 && willVisit[y3] === false) {
      graph[y3] = graph[x] + 1;
      queue.push(y3);
      willVisit[y3] = true;
    }
  }
}

// 문제 풀이 접근 방식

// 수빈이가 존재하는 곳(N)을 시작점으로 BFS를 진행하면서
// N - 1, N + 1, N * 2 좌표의 값을 N의 값 + 1로 설정하는 것을 반복하면서
// N에서 1초만에 이동 가능한 곳을 찾고,
// 또 N에서 1초만에 이동 가능한 곳으로부터 1초만에 이동 가능한 곳을 찾고
// 이 과정을 계속 반복하면서 N에서 n초 후에 방문 가능한 곳을 지속적으로 구한다.
// 결국 graph의 0부터 100000까지 모든 좌표의 값을 N과의 최단 거리로 채우게 되고,
// 마지막으로 graph 상에서 동생의 위치(K)를 출력하면 된다.
// (graph 상에서 동생의 위치(K)의 값 = 동생의 위치까지 가는데 걸리는 초)
