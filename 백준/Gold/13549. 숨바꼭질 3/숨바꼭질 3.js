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
