const { BADFLAGS } = require("dns");
let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [n, m] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log(n);
// console.log(m);

let graph = new Array(n);
let visited = new Array(n).fill(false);

for (let i = 0; i < n; i++) {
  graph[i] = new Array();
}

for (let i = 0; i < m; i++) {
  const [from, to] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);

  graph[from].push(to);
  graph[to].push(from);
}

for (let i = 0; i < n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

let depthFlag = false;

for (let i = 0; i < n; i++) {
  DFS(i, 1);
}

if (depthFlag === true) {
  console.log(1);
} else {
  console.log(0);
}

function DFS(x, depth) {
  // console.log("visited : ", visited);
  if (depthFlag === true) {
    return;
  }
  visited[x] = true;
  if (depth === 5) {
    depthFlag = true;
    return;
  }

  // console.log("x : ", x);
  // console.log("graph[x] : ", graph[x]);
  for (let i = 0; i < graph[x].length; i++) {
    const y = graph[x][i];

    if (visited[y] === false) {
      DFS(y, depth + 1);
    }
  }
  visited[x] = false;
}
