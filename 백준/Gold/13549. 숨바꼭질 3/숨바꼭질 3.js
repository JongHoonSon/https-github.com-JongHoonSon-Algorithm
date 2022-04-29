let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

// 인접행렬 만들기

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

    const y1 = x - 1;

    const y3 = x * 2;
    if (y3 <= 100000 && willVisit[y3] === false) {
      graph[y3] = graph[x];
      queue.push(y3);
      willVisit[y3] = true;
    }

    if (y1 >= 0 && willVisit[y1] === false) {
      graph[y1] = graph[x] + 1;
      queue.push(y1);
      willVisit[y1] = true;
    }

    const y2 = x + 1;
    if (y2 <= 100000 && willVisit[y2] === false) {
      graph[y2] = graph[x] + 1;
      queue.push(y2);
      willVisit[y2] = true;
    }
  }
}

// 문제 풀이 접근 방식

// 1697번 숨바꼭질 문제와 차이점은 순간이동(여기서 y3)시 소요되는 시간이
// 1초에서 0초로 줄었다는 것이다.
// 따라서 BFS 과정에서 y3는 이전 지점에서 넘어올 때 1초를 더하지 않고,
// 이전 지점의 값(시간)을 그대로 가져온다.

// 한가지 주의할 점은, y3를 최대한 활용하는 것이 문제를
// 가장 적은 시간을 들여서 풀 수 있다는 것이다.
// ex) 예를 들어 x가 1일 때 y1(+1)도 2로 이동할 수 있고 (1초 소요)
//     y3(*2)도 2로 이동할 수 있다 (0초 소요)
//     이런 경우에는 y1가 아닌 y3를 사용하는 것이 좋기 때문에
//     BFS 진행 과정에서 y3를 먼저 탐색한다.
//     (그렇게 하면 graph[2]의 값을 더 작게 잡을 수 있다.)
