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

// DFS를 진행하다가 사이클이 완성되었다면 true로 변경되는 flag 변수
let endFlag = false;

// 시작점의 좌표, 시작점의 값
let startI;
let startJ;
let startValue;
outer: for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    // DFS를 시작하기 전에, 탐색을 시작할 좌표의 정보로 startI, startJ, startValue 값 갱신
    startI = i;
    startJ = j;
    startValue = graph[startI][startJ];
    // console.log("value", value);
    // console.log("-------------------");
    // console.log("startI : ", startI);
    // console.log("startJ : ", startJ);
    // console.log("startValue : ", startValue);

    // DFS 수행 (깊이 1부터)
    DFS(startI, startJ, 1);
    // console.log("-------------------");

    // 이번 DFS에서 endFlag가 true가 되었다면(=사이클을 찾았다면), 반복문 종료
    if (endFlag === true) {
      break outer;
    }
  }
}

// endFlag의 값에 따라 결과 출력
if (endFlag === true) {
  console.log("Yes");
} else {
  console.log("No");
}

function DFS(i, j, depth) {
  // console.log("--------");
  // console.log("DFS i, j : ", i, j);

  // endFlag가 true가 되었다면(=사이클을 찾았다면), 빠른 종료를 위해 현재 DFS 탐색 종료
  if (endFlag === true) {
    return;
  }

  // 방문처리
  visited[i][j] = true;

  // 현재 좌표에서 상하좌우로 이동할 수 있는 좌표 (ni, nj)
  for (let a = 0; a < 4; a++) {
    const ni = i + move[a][0];
    const nj = j + move[a][1];

    // 범위를 벗어나면 넘어감
    if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
      continue;
    }

    // 이동가능한 좌표의 값
    const y = graph[ni][nj];

    // console.log("---");
    // console.log("y : ", y);
    // console.log("visited[ni][nj] : ", visited[ni][nj]);
    // console.log("ni : ", ni);
    // console.log("nj : ", nj);
    // console.log("depth : ", depth);
    // console.log("---");

    // (ni, nj)로 이동할 경우 다음 3가지 경우가 발생할 수 있음

    // 1. 사이클을 완성한 경우
    if (ni === startI && nj === startJ && depth >= 3) {
      // console.log("found!!!");

      // endFlag를 true로 변경 후 DFS 종료
      endFlag = true;
      return;

      // 2. 사이클을 완성하지 못한 경우, 새로 탐색할 수 있는 곳인지 확인
    } else if (y === startValue && visited[ni][nj] === false) {
      // 새로 탐색할 수 있는 곳이면 DFS 수행 (깊이는 현재 깊이 +1)
      DFS(ni, nj, depth + 1);

      // 3. 사이클 완성도 못하고, 탐색할 수도 없는 곳인 경우
    } else {
      // 넘어감
      continue;
    }
  }

  // 현재 탐색한 곳 (i, j)의 DFS가 종료될 때 해당 구역의 visited를 false로 변경
  // (다른 시작점으로 DFS를 또 진행해야하므로)
  visited[i][j] = false;
  // console.log("--------");
}

// 문제 풀이 접근 방식

// 문제의 조건을 DFS의 시점에서 해석하면 다음과 같다.
// 사이클을 이루는 각 칸은 변을 공유한다. => 상하좌우(move)로 인접해있다.
// 모든 점의 색이 같다 => 시작점 값(startValue)과 값이 같은 곳으로만 탐색 가능하다.
// 사이클을 이룬다 => DFS를 진행하다가 DFS를 처음으로 시작한 곳(startI, startJ)으로 돌아와야 한다.
// k는 4보다 크거나 같다. => (startI, startJ)로 돌아왔을 때의 깊이가 4 이상이어야 한다.

// 위 조건을 바탕으로 문제는 다음 과정을 통해 풀 수 있다.

// 시작점에 따라 DFS의 결과가 다르므로, 모든 정점에 대해 DFS를 진행한다.
// DFS의 매개변수로는 현재 탐색 중인 위치의 좌표 (i,j) 와 DFS의 깊이 depth가 사용된다.
// DFS를 진행하면서 다음 좌표로 탐색을 진행할 경우 사이클이 완성되는지 체크한다.

// DFS를 진행하면서 사이클이 완성되는지 판단하는 조건을 코드화하면 다음과 같다.

// 변수
// ni, nj : 현재 좌표(i, j) 에서 상하좌우로 이동할 경우의 좌표
// startI, startJ : 시작점의 좌표
// depth : DFS 깊이

// 조건문 (첫 시작점으로 돌아왔는지 판단, 즉 (startI, startJ) === (ni, nj))
// ni === startI && nj === startJ   => (ni, nj) 가 시작점인지 판단
// depth >= 3   => 현재 DFS 깊이가 3이상인지 판단(시작점이 visited = true가 되어 있어 탐색을 진행할 수 없지만, 사이클을 만들기 위해 진행할 수 있다고 가정하면 시작점 포함 깊이가 4가 되기 때문)
