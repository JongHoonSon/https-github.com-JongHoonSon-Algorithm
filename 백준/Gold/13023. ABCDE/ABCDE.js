let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [n, m] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log(n);
// console.log(m);

let graph = new Array(n);
let visited = new Array(n).fill(false);

for (let i = 0; i < n; i++) {
  graph[i] = new Array();
}

for (let i = 0; i < m; i++) {
  const [from, to] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);

  graph[from].push(to);
  graph[to].push(from);
}

for (let i = 0; i < n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

// 깊이가 5이상 들어갔는지(문제 조건) 체크하기 위한 flag 변수
let depthFlag = false;

// 모든 node를 한번씩 시작점으로 사용하여 DFS 진행
for (let i = 0; i < n; i++) {
  // i번 노드를 시작점으로 하는 새로운 DFS를 진행하기 위해
  DFS(i, 1);

  // 중간에 depthFlag가 올라간 경우 반복 종료
  if (depthFlag === true) {
    break;
  }
}

// DFS가 깊이 5 이상 수행됐을 경우
if (depthFlag === true) {
  // 1 출력
  console.log(1);

  // DFS가 깊이 5 이상 수행되지 못한 경우
} else {
  // 0 출력
  console.log(0);
}

function DFS(x, depth) {
  // console.log("visited : ", visited);

  // 만약 이전에 depthFlag가 true로 바뀌었다면,
  // 이미 문제 조건을 충족했기 때문에 빠른 종료를 위해 return 한다.
  if (depthFlag === true) {
    return;
  }

  // 현재 방문한 곳을 방문처리한다.
  visited[x] = true;

  // 현재 깊이가 5라면, 문제 조건을 충족하였기 때문에
  // depthFlag를 true로 설정하고, 현재 호출된 DFS를 종료한다.
  if (depth === 5) {
    depthFlag = true;
    return;
  }

  // console.log("x : ", x);
  // console.log("graph[x] : ", graph[x]);

  // 일반 DFS
  for (let i = 0; i < graph[x].length; i++) {
    const y = graph[x][i];

    if (visited[y] === false) {
      DFS(y, depth + 1);
    }
  }
  visited[x] = false;
}

// 문제 풀이 접근 방식

// 문제에서 주어진 조건은 DFS를 진행할 때 깊이가 5이상이 되면 충족된다.
// 이는 DFS 안에서 DFS의 재귀호출을 4번 이상 호출하는 경우에 충족된다.
// 즉, DFS에서 또 다시 DFS로 들어가는 과정을 4번 반복하면 되는 것이다.

// DFS의 깊이가 5인지를 확인하기 위해서
// depth라는 변수를 DFS의 매개변수로 이용한다.
// depth의 값은 DFS를 재귀호출할 때마다 값이 +1 증가시키면 된다.

// (재귀 호출의 각 층이 있다고 생각하면 된다.
// 1층에서 2층으로 내려가고, 2층에서는 3층으로 내려간다.
// 만약 1층에서 2층으로 내려갔는데, 더 이상 내려갈 수 없으면,
// 2층에서 1층으로 올라와야한다.
// 5층까지 내려가게 된다면 문제 조건을 충족하게 된다.)

// DFS를 수행한 결과는 두 가지 경우로 나뉠 수 있다.

// 1. 깊이 5까지 내려간 경우
// DFS를 진행하는 과정에서 만약 depth가 5인 DFS가 호출되었다면,
// 이전까지의 depth를 지나 depth 5까지 도착했다는 것이고,
// 이는 곧 문제의 조건에 충족했다는 뜻이다.
// 따라서 문제의 조건을 충족했는지 기록하는 depthFlag의 값을 true로 변경하고,
// 이후에 발생하는 모든 DFS를 return으로 종료한다.

// 2. 깊이 5까지 내려가지 못한 경우
// depth 5인 DFS가 호출된 적이 없다면, 이는 depth 5까지 재귀호출이 수행되지
// 못했다는 것이고, 이 경우 depthFlag 값이 변하지 않으므로 초깃값인 false 값을 갖고 있다.

// 따라서 마지막에는 depthFlag의 값에 따라 1또는 0을 출력하면 된다.
