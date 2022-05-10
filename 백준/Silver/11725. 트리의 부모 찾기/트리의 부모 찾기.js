const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// 트리
const tree = new Array(N + 1);

// 각 노드의 부모 노드의 정보를 저장하는 배열
const parent = new Array(N + 1);
let willVisit = new Array(N + 1).fill(false);

for (let i = 0; i < N + 1; i++) {
  tree[i] = new Array();
}

// 입력으로 주어지는 양방향 간선을 tree에 등록
for (let i = 0; i < N - 1; i++) {
  const [a, b] = input[i]
    .trim()
    .split(" ")
    .map((v) => +v);

  tree[a].push(b);
  tree[b].push(a);
}

BFS(1);

function BFS(startNode) {
  let queue = [];
  queue.push(startNode);
  willVisit[startNode] = true;

  // 메모리 초과를 방지하기 위해 index 기반으로 BFS 수행
  let idx = 0;
  let startIndex;
  let lastIndex;

  while (queue.length !== idx) {
    startIndex = idx;
    lastIndex = queue.length - 1;

    for (let i = startIndex; i <= lastIndex; i++) {
      const x = queue[i];
      idx++;

      for (let j = 0; j < tree[x].length; j++) {
        const y = tree[x][j];

        if (willVisit[y] === true) {
          continue;
        }

        willVisit[y] = true;

        // y의 부모 노드 정보로 x를 저장
        parent[y] = x;
        queue.push(y);
      }
    }
  }
}

let answer = [];

for (let i = 2; i < N + 1; i++) {
  answer.push(parent[i]);
}

console.log(answer.join("\n"));

// 문제 풀이 접근 방식

// 트리의 부모 찾기 문제는 입력으로 양방향 간선이 주어지고,
// 해당 간선들로 만들 수 있는 그래프에서
// 시작점을 1번으로 하여 BFS를 수행했을 때,
// 각 노드를 탐색할 때의 이전 노드인 부모 노드를 찾는 문제이다.
