let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input[0].split(" ")[0];
const M = +input[0].split(" ")[1];
const V = +input[0].split(" ")[2];

// console.log("N", N);
// console.log("M", M);
// console.log("V", V);

// graph : 각 정점이 이동할 수 있는 정점을 갖고 있다.
const graph = new Array();

// DFS, BFS 시 사용할 check배열로, 각 정점의 방문 여부를 기록한다.
const checkDFS = new Array(N + 1).fill(false);
const checkBFS = new Array(N + 1).fill(false);

// DFS, BFS의 결과를 담는 배열
let answerDFS = [];
let answerBFS = [];

// BFS에서 사용되는 큐
let queue = [];

// console.log("checkDFS", checkDFS);

for (let i = 0; i <= N; i++) {
  graph[i] = new Array();
}

// 각 간선의 정보를 graph에 저장한다.
for (let i = 1; i <= M; i++) {
  const a = +input[i].split(" ")[0].trim();
  const b = +input[i].split(" ")[1].trim();
  // console.log("a", a);
  // console.log("b", b);

  // 간선이 양방향이므로 a와 b 둘다 넣어준다.
  graph[a].push(b);
  graph[b].push(a);
}

// 방문할 수 있는 정점이 여러 개인 경우
// 정점 번호가 작은 것부터 방문하기 위해(문제 조건)
// graph를 sorting한다.
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
  // console.log(`graph[${i}]`, graph[i]);
}

// DFS, BFS 수행, 시작점은 V
DFS(V);
BFS(V);

// console.log("answerDFS", answerDFS.join(" "));
// console.log("answerBFS", answerBFS.join(" "));

console.log(answerDFS.join(" "));
console.log(answerBFS.join(" "));

function DFS(x) {
  // console.log("x", x);

  // x를 방문한 적이 있는지 check로 확인
  if (checkDFS[x] === true) {
    // 방문한 적이 있다면 탐색을 종료한다.
    return;
  }

  // 방문한 적이 없는 곳이면, 방문 처리를 하고(checkDFS[x] = true),
  checkDFS[x] = true;
  // 방문한 곳을 순서대로 기록하는 asnwerDFS에 방문한 곳(x)을 push한다.
  answerDFS.push(x);

  // x의 인접 노드가 정리되어 있는 graph[x]를 반복문으로 확인
  for (let i = 0; i < graph[x].length; i++) {
    // x의 인접 노드를 변수 y에 저장
    const y = graph[x][i];
    // 이동 가능 여부를 확인
    if (checkDFS[y] === false) {
      // 이동 가능한 곳은 DFS를 호출하여 이동한다.
      DFS(y);
    }
  }
}

function BFS(start) {
  // 시작점을 방문 예정 목록(queue)에 넣고,
  queue.push(start);
  // 예약 완료 처리를 한다.(checkBFS[start] = true)
  checkBFS[start] = true;

  // queue가 빌 때까지 반복
  while (queue.length !== 0) {
    // 큐의 맨 앞에 들어 있는 값을 빼고 x에 저장한다.
    const x = queue.shift();

    // x를 방문했음을 기록한다.
    // (방문한 곳을 순서대로 기록하는 asnwerBFS에 방문한 곳(x)을 push한다.)
    answerBFS.push(x);
    // console.log("x", x);
    // console.log("graph[x].length", graph[x].length);

    // x의 인접 노드가 정리되어 있는 graph[x]를 반복문으로 확인
    for (let i = 0; i < graph[x].length; i++) {
      // x의 인접 노드를 변수 y에 저장
      const y = graph[x][i];
      // console.log("i", i);

      // y번 노드로의 이동 예정이 없다면(=이동 가능히다면)
      if (checkBFS[y] === false) {
        // y번 노드를 방문 예정 목록(queue)에 넣고,
        queue.push(y);

        // 예약 완료 처리를 한다.(checkBFS[y] = true)
        checkBFS[y] = true;
      }
    }
  }
}
