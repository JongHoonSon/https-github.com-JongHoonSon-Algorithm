let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

// 인접행렬 만들기

const [m, n] = input[0]
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("m", m);
// console.log("n", n);

let graph = new Array(n);

for (let i = 0; i < n; i++) {
  const line = input[i + 1]
    .trim()
    .split("")
    .map((v) => +v);
  graph[i] = line;
}

for (let i = 0; i < n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

let willVisit = new Array(n);
let move = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < n; i++) {
  willVisit[i] = new Array(m).fill(false);
}

let answer = BFS(0, 0);

if (n === 1 && m === 1 && graph[0][0] === 0) {
  console.log(0);
} else if (n === 1 && m === 1 && graph[0][0] === 1) {
  console.log(1);
} else if (answer === false) {
  console.log(0);
} else {
  console.log(answer);
}

// console.log("result");
// console.log(BFS(0, 0));

function BFS(startI, startJ) {
  let queue = [];
  queue.push([startI, startJ, 0]);
  willVisit[startI][startJ] = true;

  while (queue.length !== 0) {
    // console.log(queue);
    const queueLength = queue.length;
    for (let a = 0; a <= queueLength - 1; a++) {
      // console.log("----------------");
      const [i, j, cnt] = queue.shift();
      // console.log("i, j, cnt : ", i, j, cnt);

      for (let b = 0; b < 4; b++) {
        // console.log("------");
        const ni = i + move[b][0];
        const nj = j + move[b][1];

        if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
          continue;
        }

        if (ni === n - 1 && nj === m - 1) {
          return cnt;
        }

        if (graph[ni][nj] === 1) {
          graph[ni][nj] = 0;
          queue.push([ni, nj, cnt + 1]);
          willVisit[ni][nj] = true;
        }

        if (graph[ni][nj] === 0 && willVisit[ni][nj] === false) {
          queue.unshift([ni, nj, cnt]);
          willVisit[ni][nj] = true;
        }
        // console.log("------");
      }

      // console.log("----------------");
    }
  }
}
