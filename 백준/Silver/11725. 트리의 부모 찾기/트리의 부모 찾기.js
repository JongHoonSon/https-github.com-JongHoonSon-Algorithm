const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

const tree = new Array(N + 1);
const parent = new Array(N + 1);
let willVisit = new Array(N + 1).fill(false);

for (let i = 0; i < N + 1; i++) {
  tree[i] = new Array();
}

for (let i = 0; i < N - 1; i++) {
  const [a, b] = input[i]
    .trim()
    .split(" ")
    .map((v) => +v);

  tree[a].push(b);
  tree[b].push(a);
}

BFS(1);

function BFS(startNode) {
  let queue = [];
  queue.push(startNode);
  willVisit[startNode] = true;

  let idx = 0;
  let startIndex;
  let lastIndex;

  while (queue.length !== idx) {
    startIndex = idx;
    lastIndex = queue.length - 1;

    for (let i = startIndex; i <= lastIndex; i++) {
      const x = queue[i];
      idx++;

      for (let j = 0; j < tree[x].length; j++) {
        const y = tree[x][j];

        if (willVisit[y] === true) {
          continue;
        }

        willVisit[y] = true;
        parent[y] = x;
        queue.push(y);
      }
    }
  }
}

let answer = [];

for (let i = 2; i < N + 1; i++) {
  answer.push(parent[i]);
}

console.log(answer.join("\n"));
