const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// 트리
const tree = new Array(N + 1);

for (let i = 0; i < N + 1; i++) {
  tree[i] = new Array();
}

// 입력으로 주어지는 양방향 간선을 tree에 등록, 거리로 함께 등록함
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

  // BFS를 두번 진행해야하므로,
  // wiilVisit을 BFS마다 사용할 수 있게끔 BFS 안에서 초기화함
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

        // 처음 시작점부터 가장 멀리 떨어진 노드까지의 거리를 누적함
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
  // 아래 코드는 다음 순서로 수행된다.
  console.log(BFS(BFS(1).node).dist);

  // 1. BFS(1)
  // => 1번 노드에서 가장 멀리 떨어진 노드 farNode의 정보를 리턴 받는다.

  // 1-1. BFS(1).node
  // => 1에서 돌려 받은 farNode의 node 속성의 값

  // 2. BFS(BFS(1).node)
  // => 1에서 돌려 받은 farNode의 node 속성의 값을 이용해
  // 해당 노드로부터 가장 멀리 떨어진 노드의 정보를 리턴 받는다.

  // 2-1. BFS(BFS(1).node).dist
  // => 2에서 돌려 받은 farNode의 node 속성의 값
}

// 문제 풀이 접근 방식

// 문제에서 나온대로 트리의 지름이란, 트리의 노드 간의 거리 중에서
// 가장 긴 거리를 갖고 있는 노드들 사이의 길이이고,
// 이 문제는 트리를 이루는 간선들의 정보가 주어졌을 때,
// 해당 간선들로 이루어진 트리의 지름을 구하는 문제이다.

// 문제를 푸는 아이디어는 트리는 사이클이 없기 때문에
// 트리의 특정 노드에서 가장 멀리 있는 노드가 트리의 양 끝 점 중 하나라는 것에서 시작한다.
// 또한 특정 노드에서 양 끝 점 중 하나인 노드로 이동한 후,
// 다시 그 노드에서 가장 멀리 떨어진 노드로 이동하면
// 그 점 역시 양 끝 점 중 하나인 노드일 것이다.

// 예시를 들면, 우리나라의 양 끝 점이 부산과 서울이고, 수원이 특정 노드라고 했을 때,
// 일단 수원에서 가장 멀리 떨어진 부산로 이동하고,
// 부산에서 제일 멀리 떨어진 서울로 방문하는 방식으로
// 트리 상의 양 끝 점을 찾을 수 있다.

// 이 방식대로 1번 노드부터 수행하는 BFS로 1번 노드와 가장 멀리 떨어진 노드 A를 찾고,
// 노드 A로 다시 BFS를 수행하여 노드 A로부터 가장 멀리 떨어진 노드인 노드 B를 찾는다.
// 그러면, 노드 A와 노드 B는 트리 상에서 가장 멀리 떨어진 양 끝 점이되고,
// 노드 A와 노드 B사이의 거리를 출력하면, 그것이 트리의 지름이 된다.
