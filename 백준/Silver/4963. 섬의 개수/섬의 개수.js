let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

let answer = [];
let graph;
let visited;
let w;
let h;

const moveX = [1, -1, 0, 0, 1, -1, -1, 1];
const moveY = [0, 0, 1, -1, 1, -1, 1, -1];

while (true) {
  const line = input.shift().trim();
  w = +line.split(" ")[0];
  h = +line.split(" ")[1];

  if (w === 0 && h === 0) {
    break;
  }

  // console.log("w", w);
  // console.log("h", h);

  graph = new Array(h);
  visited = new Array(h);

  for (let i = 0; i < h; i++) {
    graph[i] = input
      .shift()
      .trim()
      .split(" ")
      .map((v) => +v);
    // console.log(`graph[${i}]`, graph[i]);
    visited[i] = new Array(w).fill(false);
  }

  let count = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (DFS(i, j) === true) {
        count++;
      }
    }
  }

  answer.push(count);
}

console.log(answer.join("\n"));

function DFS(i, j) {
  if (i < 0 || j < 0 || i >= h || j >= w) {
    return false;
  }

  if (visited[i][j] === true) {
    return false;
  }

  const x = graph[i][j];
  visited[i][j] = true;

  if (x === 0) {
    return false;
  }

  if (x === 1) {
    for (let a = 0; a < moveX.length; a++) {
      const ni = i + moveY[a];
      const nj = j + moveX[a];

      DFS(ni, nj);
    }

    return true;
  }
}
