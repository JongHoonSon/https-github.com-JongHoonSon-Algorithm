let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input[0].split(" ")[0];
const M = +input[0].split(" ")[1];
const V = +input[0].split(" ")[2];

// console.log("N", N);
// console.log("M", M);
// console.log("V", V);

const graph = new Array();
const checkDFS = new Array(N + 1).fill(false);
const checkBFS = new Array(N + 1).fill(false);
let answerDFS = [];
let answerBFS = [];
let queue = [];

// console.log("checkDFS", checkDFS);

for (let i = 0; i <= N; i++) {
  graph[i] = new Array();
}

for (let i = 1; i <= M; i++) {
  const a = +input[i].split(" ")[0].trim();
  const b = +input[i].split(" ")[1].trim();
  // console.log("a", a);
  // console.log("b", b);

  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
  // console.log(`graph[${i}]`, graph[i]);
}

DFS(V);

// console.log("answerDFS", answerDFS.join(" "));

BFS(V);

// console.log("answerBFS", answerBFS.join(" "));

console.log(answerDFS.join(" "));
console.log(answerBFS.join(" "));

function DFS(x) {
  // console.log("x", x);
  if (checkDFS[x] === true) {
    return;
  }

  checkDFS[x] = true;

  answerDFS.push(x);

  for (let i = 0; i < graph[x].length; i++) {
    if (checkDFS[graph[x][i]] === false) {
      DFS(graph[x][i]);
    }
  }
}

function BFS(start) {
  queue.push(start);
  checkBFS[start] = true;

  while (queue.length !== 0) {
    const x = queue.shift();
    answerBFS.push(x);
    // console.log("x", x);
    // console.log("graph[x].length", graph[x].length);
    for (let i = 0; i < graph[x].length; i++) {
      // console.log("i", i);
      if (checkBFS[graph[x][i]] === false) {
        queue.push(graph[x][i]);
        checkBFS[graph[x][i]] = true;
      }
    }
  }
}
