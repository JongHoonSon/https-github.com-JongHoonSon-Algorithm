let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const line = input.shift().trim();
const n = +line.split(" ")[0];
const m = +line.split(" ")[1];
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
  queue.push(startI);
  queue.push(startJ);

  while (queue.length !== 0) {
    const i = queue.shift();
    const j = queue.shift();

    const x = graph[i][j];

    if (x !== 0) {
      for (let a = 0; a < moveX.length; a++) {
        const ni = i + moveY[a];
        const nj = j + moveX[a];

        if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
          continue;
        }

        if (graph[ni][nj] === 1) {
          graph[ni][nj] = graph[i][j] + 1;
          queue.push(ni);
          queue.push(nj);
        }
      }
    } else if (x === 0) {
      return false;
    }
  }

  console.log(graph[n - 1][m - 1]);
}
