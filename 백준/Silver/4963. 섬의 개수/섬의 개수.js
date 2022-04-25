let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

let answer = [];
let graph;
let visited;
let w;
let h;

// 이동 가능한 방향, 상하좌우 + 대각선
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

  // 모든 좌표에 대해 DFS 수행
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (DFS(i, j) === true) {
        // DFS가 true가 나온다는 것은 i,j 좌표부터 시작해서 DFS를 진행한 것이
        // count 1회 됨(섬 크기는 DFS의 결과에 따라 다름)
        count++;
      }
    }
  }

  // 각 테스트케이스의 섬의 갯수를 answer에 저장
  answer.push(count);
}

console.log(answer.join("\n"));

function DFS(i, j) {
  // 이동 불가능한 지역 => false 리턴
  if (i < 0 || j < 0 || i >= h || j >= w) {
    return false;
  }

  // 이미 방문한 곳 => false 리턴
  if (visited[i][j] === true) {
    return false;
  }

  // (i, j)를 x 변수에 저장
  const x = graph[i][j];

  // (i, j) 방문 처리
  visited[i][j] = true;

  // 방문할 수 없는 곳(문제 조건) => false 리턴
  if (x === 0) {
    return false;
  }

  // 방문할 수 있는 곳, 가능한 모든 방향으로 DFS 수행
  if (x === 1) {
    for (let a = 0; a < moveX.length; a++) {
      const ni = i + moveY[a];
      const nj = j + moveX[a];

      DFS(ni, nj);
    }

    return true;
  }
}

// 문제 풀이 접근 방식

// 이동할 수 있는 방향이 상하좌우 + 대각선으로 총 8가지인 경우인 DFS 문제이다.
