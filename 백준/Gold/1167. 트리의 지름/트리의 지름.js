const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// 트리
let tree = new Array(N + 1);

for (let i = 0; i < N + 1; i++) {
  tree[i] = new Array();
}

// 입력으로 주어지는 양방향 간선을 tree에 등록, 거리로 함께 등록함
for (let i = 0; i < N; i++) {
  const line = input[i]
    .trim()
    .split(" ")
    .map((v) => +v);
  const a = line.shift();
  while (line.length > 0) {
    const b = line.shift();

    if (b === -1) {
      break;
    }

    const dist = line.shift();

    // 간선이 중복해서 주어지므로
    // ex) 1-3 간선이면 1번 노드에도 3번 노드의 정보가,
    // 3번 노드에도 1번 노드의 정보가 주어지기 때문에
    // 간선의 정보를 A->B만 저장하도록 함
    // (추후에 B 노드에서 A 노드로 이어지는 간선의 정보를 저장함)
    tree[a].push([b, dist]);
  }
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

// 입력 받는 방식만 다를뿐, 1967번 문제와 완전 동일하다.
