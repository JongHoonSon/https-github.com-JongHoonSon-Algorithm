const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// 트리
const tree = new Array(N + 1);

for (let i = 0; i < N + 1; i++) {
  tree[i] = new Array();
}

// 입력으로 주어지는 양방향 간선을 tree에 등록
for (let i = 0; i < N - 1; i++) {
  const [a, b, dist] = input[i]
    .trim()
    .split(" ")
    .map((v) => +v);

  tree[a].push([b, dist]);
  tree[b].push([a, dist]);
}

function BFS(startNode) {
  let queue = [];
  queue.push([startNode, 0]);
  let willVisit = new Array(N + 1).fill(false);
  willVisit[startNode] = true;

  // 현재 BFS의 startNode를 기준으로
  // 가장 멀리 위치한 노드의 정보를 저장할 객체
  let farNode = { node: 0, dist: 0 };

  // 메모리 초과를 방지하기 위해 index 기반으로 BFS 수행
  let idx = 0;
  let startIndex;
  let lastIndex;

  while (queue.length !== idx) {
    startIndex = idx;
    lastIndex = queue.length - 1;

    for (let i = startIndex; i <= lastIndex; i++) {
      const [x, distX] = queue[i];
      idx++;

      // x노드의 dist값이 현재까지 찾은 farNode의 dist보다 클 경우 (= 더 멀 경우)
      // farNode를 x의 값으로 갱신
      if (farNode.dist < distX) {
        farNode = { node: x, dist: distX };
      }

      for (let j = 0; j < tree[x].length; j++) {
        const [y, distY] = tree[x][j];

        if (willVisit[y] === true) {
          continue;
        }

        willVisit[y] = true;

        // 처음 시작부터 도착지까지 찾은 노드의 거리를 저장
        queue.push([y, distX + distY]);
      }
    }
  }
  // 가장 멀리 위치한 노드의 정보를 저장한 객체인 farNode를 리턴함
  return farNode;
}

if (N === 1) {
  console.log(0);
} else {
  // 시작점으로부터 가장 멀리 위치한 노드를 리턴하는 BFS를 두 번 이용해서
  // 1번 노드로부터 가장 멀리있는 노드 A를 입력으로 넣고 (노드 A는 트리의 끝 점 두개 중에 하나임)
  // 노드 A로부터 가장 멀리있는 노드 B를 구하고, (끝 점에서 다른 끝 점까지의 거리를 구함)
  // 노드 A와 노드 B 사이의 거리를 출력함
  console.log(BFS(BFS(1).node).dist);
}

// 문제 풀이 접근 방식
