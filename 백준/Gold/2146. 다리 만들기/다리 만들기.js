let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

// 인접행렬 만들기

const n = +input[0].trim();

// console.log("n", n);

let graph = new Array(n + 1);

for (let i = 0; i < n; i++) {
  graph[i] = new Array();
}

for (let i = 1; i < n + 1; i++) {
  const line = input[i]
    .trim()
    .split(" ")
    .map((v) => +v);

  graph[i - 1] = line;
}

for (let i = 0; i < n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

// 각 섬을 구분하기 위한 BFS

let island = new Array();
let willVisit = new Array(n);

for (let i = 0; i < n; i++) {
  willVisit[i] = new Array(n).fill(false);
}

let move = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let landName = 1;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (BFS1(i, j, landName + "L") === true) {
      landName++;
    }
  }
}

// console.log("After graph");
for (let i = 0; i < n; i++) {
  // console.log(graph[i]);
}

function BFS1(startI, startJ, landName) {
  if (willVisit[startI][startJ] === true || graph[startI][startJ] === 0) {
    return false;
  }
  let queue = [];
  queue.push([startI, startJ]);
  willVisit[startI][startJ] = true;

  if (graph[startI][startJ] === 1) {
    graph[startI][startJ] = landName;
    island.push([startI, startJ]);
    willVisit[startI][startJ] = true;
  }

  let idx = 0;

  while (queue.length !== idx) {
    let startIndex = idx;
    let lastIndex = queue.length - 1;

    for (let k = startIndex; k <= lastIndex; k++) {
      const [i, j] = queue[k];
      idx++;

      for (let a = 0; a < 4; a++) {
        const ni = i + move[a][0];
        const nj = j + move[a][1];

        if (ni < 0 || nj < 0 || ni >= n || nj >= n) {
          continue;
        }

        if (graph[ni][nj] === 1) {
          graph[ni][nj] = landName;
          queue.push([ni, nj]);
          island.push([ni, nj]);
          willVisit[ni][nj] = true;
        }
      }
    }
  }
  return true;
}

// 섬 주변 바다에 대한 간척사업 진행

// console.log("After 1st BFS, island");
for (let i = 0; i < island.length; i++) {
  // console.log(island[i]);
}

// console.log("After 1st BFS, willVisit");
for (let i = 0; i < n; i++) {
  // console.log(willVisit[i]);
}

let distance = new Array(n);
for (let i = 0; i < n; i++) {
  distance[i] = new Array(n).fill(0);
}

BFS2();

function BFS2() {
  let queue = JSON.parse(JSON.stringify(island));
  let idx = 0;

  while (queue.length !== idx) {
    // console.log(queue);
    const firstIndex = idx;
    const lastIndex = queue.length - 1;

    for (let k = firstIndex; k <= lastIndex; k++) {
      const [i, j] = queue[k];
      idx++;

      // console.log("[i, j] : ", [i, j]);

      for (let a = 0; a < 4; a++) {
        const ni = i + move[a][0];
        const nj = j + move[a][1];

        if (ni < 0 || nj < 0 || ni >= n || nj >= n) {
          continue;
        }

        if (graph[ni][nj] === 0 && willVisit[ni][nj] === false) {
          graph[ni][nj] = String(graph[i][j]);
          willVisit[ni][nj] = true;
          queue.push([ni, nj]);
          distance[ni][nj] = distance[i][j] + 1;
        }
      }
    }
  }
}

// console.log("After 2nd BFS, graph");
for (let i = 0; i < n; i++) {
  // console.log(graph[i]);
}

// console.log("After 2nd BFS, distance");
for (let i = 0; i < n; i++) {
  // console.log(distance[i]);
}

// 바다에서 달라지는 부분 확인 및 distance 값으로 다리길이 계산

let minNum = -1;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    BFS3(i, j);
  }
}

console.log(minNum);

function BFS3(startI, startJ) {
  let queue = [];
  queue.push([startI, startJ]);
  let idx = 0;

  while (queue.length !== idx) {
    const firstIndex = idx;
    const lastIndex = queue.length - 1;

    for (let k = firstIndex; k <= lastIndex; k++) {
      const [i, j] = queue[k];
      idx++;

      for (let a = 0; a < 4; a++) {
        const ni = i + move[a][0];
        const nj = j + move[a][1];

        if (ni < 0 || nj < 0 || ni >= n || nj >= n) {
          continue;
        }

        if (graph[ni][nj] !== graph[i][j]) {
          const newDistance = distance[ni][nj] + distance[i][j];
          if (minNum === -1 || minNum > newDistance) {
            minNum = newDistance;
          }
        }
      }
    }
  }
}
