let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const n = +input.shift().trim();

// console.log("n", n);

let graph = new Array(n + 1);
let visited = new Array(n + 1).fill(false);
visited[0] = undefined;
let rotateRoute = new Array();
let answer = [];

for (let i = 1; i <= n; i++) {
  graph[i] = new Array();
}

for (let i = 1; i <= n; i++) {
  const [a, b] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);

  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 1; i <= n; i++) {
  graph[i].sort((a, b) => a - b);
  // console.log(`graph[${i}]`, graph[i]);
}

let endDfsFlag = false;
let startNode;

for (let i = 1; i <= n; i++) {
  // console.log("-----------------");
  startNode = i;
  // console.log("i", i);
  // console.log("Before visited", visited);
  // console.log("Before rotateRoute", rotateRoute);
  DFS(i, 1);
  // console.log("After visited", visited);
  // console.log("After rotateRoute", rotateRoute);
  if (endDfsFlag === true) {
    break;
  }
}

let willVisit;
let times;

for (let i = 1; i <= n; i++) {
  willVisit = new Array(n + 1).fill(false);
  willVisit[0] = undefined;
  times = 0;
  answer.push(BFS(i));
}

// console.log("---------------answer---------------");
console.log(answer.join(" "));

function BFS(startNode) {
  let queue = [];
  queue.push(startNode);
  willVisit[startNode] = true;

  while (queue.length !== 0) {
    const queueLength = queue.length;

    for (let i = 0; i < queueLength; i++) {
      const x = queue.shift();

      if (rotateRoute[x] === true) {
        return times;
      }

      for (let i = 0; i < graph[x].length; i++) {
        const y = graph[x][i];

        if (willVisit[y] === false) {
          queue.push(y);
          willVisit[y] = true;
        }
      }
    }
    times++;
  }
}

function DFS(x, depth) {
  // console.log(`DFS for ${x} is started`);

  if (endDfsFlag) {
    return;
  }

  visited[x] = true;

  for (let i = 0; i < graph[x].length; i++) {
    // console.log("x", x);
    // console.log("i", i);
    // console.log("graph[x][i]", graph[x][i]);
    const y = graph[x][i];
    if (visited[y] === false) {
      // console.log("move to ", y);
      DFS(y, depth + 1);
    } else if (visited[y] === true && y === startNode && depth >= 3) {
      // console.log("end");
      // console.log(visited);
      rotateRoute = JSON.parse(JSON.stringify(visited));
      endDfsFlag = true;
      return;
    } else {
      continue;
    }
  }

  visited[x] = false;
}
