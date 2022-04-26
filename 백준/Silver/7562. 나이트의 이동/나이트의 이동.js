let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

// console.log("testCaseNum", testCaseNum);

let graph;
const move = [
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
];

for (let i = 0; i < testCaseNum; i++) {
  const l = +input.shift();
  const [startI, startJ] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
  const [destI, destJ] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);
  // console.log("startI startJ : ", startI, startJ);
  // console.log("destI destJ", destI, destJ);
  // console.log("l", l);

  graph = new Array(l);

  for (let j = 0; j < l; j++) {
    graph[j] = new Array(l).fill(0);
  }

  BFS(startI, startJ, l);

  console.log(graph[destI][destJ]);
}

function BFS(startI, startJ, l) {
  const queue = [];

  queue.push([startI, startJ]);

  while (queue.length !== 0) {
    const [i, j] = queue.shift();
    for (let a = 0; a < 8; a++) {
      const ni = i + move[a][0];
      const nj = j + move[a][1];

      if (ni < 0 || nj < 0 || ni >= l || nj >= l) {
        continue;
      }

      if (graph[ni][nj] === 0 && (ni !== startI || nj !== startJ)) {
        graph[ni][nj] = graph[i][j] + 1;
        queue.push([ni, nj]);
      }
    }
  }
}
