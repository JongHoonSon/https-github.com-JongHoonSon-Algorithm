let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [n, m] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log(n);
// console.log(m);

let graph = new Array();
let visited = new Array();
// let visited;
let move = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < n; i++) {
  graph[i] = new Array();
  graph[i] = input.shift().trim().split("");
  visited[i] = new Array(m).fill(false);
  // console.log(`graph[${i}]`, graph[i]);
  // console.log(`visited[${i}]`, visited[i]);
}

let endFlag = false;

let startI;
let startJ;
let startValue;
outer: for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    startI = i;
    startJ = j;
    startValue = graph[startI][startJ];
    // console.log("value", value);
    // console.log("-------------------");
    // console.log("startI : ", startI);
    // console.log("startJ : ", startJ);
    // console.log("startValue : ", startValue);
    DFS(startI, startJ, 1);
    // console.log("-------------------");
    if (endFlag === true) {
      break outer;
    }
  }
}

if (endFlag === true) {
  console.log("Yes");
} else {
  console.log("No");
}

function DFS(i, j, depth) {
  // console.log("--------");
  // console.log("DFS i, j : ", i, j);
  if (endFlag === true) {
    return;
  }
  visited[i][j] = true;

  for (let a = 0; a < 4; a++) {
    const ni = i + move[a][0];
    const nj = j + move[a][1];

    if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
      continue;
    }

    const y = graph[ni][nj];

    // console.log("---");
    // console.log("y : ", y);
    // console.log("visited[ni][nj] : ", visited[ni][nj]);
    // console.log("ni : ", ni);
    // console.log("nj : ", nj);
    // console.log("depth : ", depth);
    // console.log("---");
    if (y === startValue && ni === startI && nj === startJ && depth >= 3) {
      // console.log("found!!!");
      endFlag = true;
      return;
    } else if (y === startValue && visited[ni][nj] === false) {
      DFS(ni, nj, depth + 1);
    } else {
      continue;
    }
  }

  visited[i][j] = false;
  // console.log("--------");
}

// 문제 풀이 접근 방식

// 문제의 조건을 DFS의 시점에서 해석하면 다음과 같다.
// 사이클을 이루는 각 칸은 변을 공유한다. => 상하좌우로 인접해있다.
// 모든 점의 색이 같다 => 시작점과 값이 같은 곳으로만 탐색 가능하다.
// 사이클을 이룬다 => DFS를 진행하다가 DFS를 처음으로 시작한 곳(startI, startJ)으로 돌아와야 한다.
// k는 4보다 크거나 같다. => (startI, startJ)로 돌아왔을 때의 깊이가 4 이상이어야 한다.

// 위 조건을 바탕으로 문제는 다음 과정을 통해 풀 수 있다.

// 시작점에 따라 DFS의 결과가 다르므로, 모든 정점에 대해 DFS를 진행한다.
// DFS의 매개변수로는 현재 탐색 중인 위치의 좌표 (i,j) 와 DFS의 깊이 depth가 사용된다.

// DFS를 진행하면서 사이클이 완성되었는지 판단하는 조건을 코드화하면 다음과 같다.

// 변수
// startI, startJ : 시작점의 좌표
// startValue : 시작점의 값
// ni, nj : 현재 좌표(i, j) 에서 상하좌우로 이동할 경우의 좌표
// y : 현재 좌표(i, j) 에서 상하좌우로 이동할 경우, 해당 좌표의 값

// 조건문 (첫 시작점으로 돌아왔는지 판단, 즉 (startI, startJ) === (ni, nj))
// y === startValue  => 상하좌우 좌표의 값이 시작점의 값과 같아야한다.
// visited[ni][nj] === true  => (ni, nj) 가 시작점이라면, 이미 visited한 곳이므로 visited의 값이 true인지 판단
//
