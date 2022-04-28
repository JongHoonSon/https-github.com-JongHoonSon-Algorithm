let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

// 인접리스트 만들기

const n = +input[0].trim();

// console.log("n", n);

let graph = new Array(n + 1);

for (let i = 1; i <= n; i++) {
  graph[i] = new Array();
}

for (let i = 1; i <= n - 1; i++) {
  const [a, b] = input[i]
    .trim()
    .split(" ")
    .map((v) => +v);

  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 1; i <= n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

let seq = input[n]
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("seq", seq);

// DFS

let answer = [seq[0]];
let visited = new Array(n + 1).fill(false);
let seqIdx = 1;

// console.log("visited", visited);

DFS(1);

// console.log("answer : ", answer);

if (JSON.stringify(seq) === JSON.stringify(answer)) {
  console.log(1);
} else {
  console.log(0);
}

function DFS(x) {
  // console.log("DFS for x : ", x);
  if (visited[x] === true) {
    // console.log("X is already visited");
    return false;
  }

  visited[x] = true;

  let roopFlag = true;

  while (roopFlag) {
    roopFlag = false;
    for (let i = 0; i < graph[x].length; i++) {
      const y = graph[x][i];
      // console.log("y", y);

      if (y === seq[seqIdx] && visited[y] === false) {
        roopFlag = true;
        seqIdx++;
        answer.push(y);
        // console.log("answer", answer);
        DFS(y);
      }
    }
    visited[x] = false;
  }
}

// 75%에서 시간 초과 발생
// shift, console.log 등 시간을 많이 잡아먹는 내장함수를 사용하지 않았음에도
// 시간초과가 발생하여 원인을 찾기 힘듬

// 시도 해본 것
// graph를 seq의 순서대로 인접리스트를 정렬함 => 시간초과 실패 (시간초과가 더 일찍 뜸)
// answer을 구하고 나서 DFS를 빠르게 종료하도록 설계 => 시간초과 실패

// node.js로 제출해서 "맞았습니다." 가 뜬 사람이 꽤 있는 걸로 봐서 풀 수는 있지만
// 구글링 해서도 답을 찾지 못해 풀지 못하였음

// BFS 스페셜 저지 문제와 푸는 방식은 동일, BFS냐 DFS냐 그 차이
