let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [m, n] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("m", m);
// console.log("n", n);

let graph = new Array(n);
let redTomato = [];
let countEmptySpot = 0;

const moveX = [1, -1, 0, 0];
const moveY = [0, 0, 1, -1];

for (let i = 0; i < n; i++) {
  const line = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
  graph[i] = line;

  // console.log("line", line);

  for (let j = 0; j < m; j++) {
    if (line[j] === 1) {
      redTomato.push([i, j]);
    }
    if (line[j] === -1) {
      countEmptySpot++;
    }
  }
}
let haveToPill = n * m - countEmptySpot;

for (let i = 0; i < redTomato.length; i++) {
  // console.log(redTomato[i]);
}

let days = 0;

BFS();

let redTomateCnt = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (graph[i][j] === 1) {
      redTomateCnt++;
    }
  }
}
if (haveToPill === redTomateCnt) {
  console.log(days);
} else {
  console.log("-1");
}

function BFS() {
  let idx = 0;
  while (redTomato.length !== idx) {
    // console.log("-------------------");
    // console.log("graph : ");
    // console.log(graph);

    // console.log("redTomato");
    // console.log(redTomato);
    let redTomatoCnt = redTomato.length;
    let change = false;
    for (let b = idx; b < redTomatoCnt; b++) {
      const [i, j] = redTomato[idx++];

      for (let a = 0; a < moveX.length; a++) {
        const ni = i + moveY[a];
        const nj = j + moveX[a];

        if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
          continue;
        }

        if (graph[ni][nj] === 0) {
          graph[ni][nj] = 1;
          redTomato.push([ni, nj]);
          change = true;
        }
        // console.log("[ni, nj] : ", ni, nj);
        // console.log("change", change);
      }
    }
    if (change === false) {
      // console.log("change false end");
      return;
    } else {
      days++;
    }
  }
}
