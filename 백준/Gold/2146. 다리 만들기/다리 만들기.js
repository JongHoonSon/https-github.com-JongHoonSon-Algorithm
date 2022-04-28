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

// 1. 각 섬을 구분하기 위한 BFS

// 모든 정점을 확인하면서, 해당 정점이 섬일 경우(= 값이 1일 경우)
// 2번째 BFS에서 간척사업을 진행하기 위해 해당 정점의 좌표값을 저장하기 위한 배열
let island = new Array();

// 방문 예약 여부를 판단하기 위한 배열
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

// 각각 떨어진 섬에 붙힐 이름
let landName = 1;

// 모든 노드에 대해 BFS를 수행
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // 시작점을 (i, j)로 하고, landName에 L을 붙힘(콘솔로 보기 편하게끔, 큰 의미x)
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
  // 만일 시작점의 willVisit이 이미 true 일 경우,
  // 시작점은 이미 다른 노드의 BFS 과정에서 탐색되었으므로 return false함

  // 또한 해당 지점이 바다인 경우에도 탐색을 진행할 수 없으므로 return flase 함
  if (willVisit[startI][startJ] === true || graph[startI][startJ] === 0) {
    return false;
  }

  // BFS를 위한 큐 생성
  let queue = [];

  // 시작점을 방문 예정 목록에 넣고, 방문 예약 처리함
  queue.push([startI, startJ]);
  willVisit[startI][startJ] = true;
  // 시작점이 이미 방문되었거나, 바다인 경우는 위에서 걸러졌으므로,
  // 시작점은 무조건 육지일 수 밖에 없음.
  // 따라서 시작점의 graph 상 지명을 변경하고, island 배열에 넣음
  graph[startI][startJ] = landName;
  island.push([startI, startJ]);

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

// 2. 섬 주변 바다에 대한 간척사업 진행

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

// 3. 바다에서 달라지는 부분 확인 및 distance 값으로 다리길이 계산

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
