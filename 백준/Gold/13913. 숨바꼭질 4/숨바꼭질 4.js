let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [n, k] = input[0]
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("n", n);
// console.log("k", k);

let graph = new Array(100000 + 1).fill(0);
let comeFrom = new Array(100000 + 1);

BFS(n);

let answer = [k];

let before = comeFrom[k];

for (let i = 0; i < graph[k]; i++) {
  answer.unshift(before);
  before = comeFrom[before];
}

console.log(graph[k]);
console.log(answer.join(" "));
// console.log("graph", graph);
// console.log("comeFrom", comeFrom);

// console.log(graph[k]);
// console.log(comeFrom[k]);

function BFS(startNode) {
  let queue = [];
  queue.push(startNode);
  let willVisit = new Array(100000 + 1).fill(false);
  willVisit[startNode] = true;

  while (queue.length !== 0) {
    const x = queue.shift();

    if (x === k) {
      return false;
    }

    for (let nx of [x - 1, x + 1, x * 2]) {
      if (willVisit[nx] === false && nx >= 0 && nx <= 100000) {
        queue.push(nx);
        willVisit[nx] = true;
        graph[nx] = graph[x] + 1;
        comeFrom[nx] = x;
      }
    }
  }
}
