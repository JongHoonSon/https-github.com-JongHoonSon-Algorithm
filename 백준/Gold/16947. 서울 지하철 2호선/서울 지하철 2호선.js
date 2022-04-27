let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

// 인접리스트 만들기

const n = +input.shift().trim();

// console.log("n", n);

let graph = new Array(n + 1);

for (let i = 1; i <= n; i++) {
  graph[i] = new Array();
}

for (let i = 1; i <= n; i++) {
  const [a, b] = input
    .shift()
    .trim()
    .split(" ")
    .map((v) => +v);

  graph[a].push(b);
  graph[b].push(a);
}

// DFS 수행 (순환선 찾기)

// 특정 노드에 대한 탐색이 완료되었는지 true, false로 기록하는 배열
let visited = new Array(n + 1).fill(false);

// 순환선을 찾은 순간, 해당 순환선의 정보를 저장할 배열
let rotateRoute = new Array();

// DFS의 시작점을 저장할 변수 (DFS는 시작점을 1번부터 n번까지 한번씩 사용)
let startNode;

// DFS 중간에 순환선을 찾았을 경우 endDfsFlag를 true로 변경
let endDfsFlag = false;

// 1번부터 n번까지 모든 노드에 대해 DFS 수행
for (let i = 1; i <= n; i++) {
  // console.log("-----------------");
  startNode = i;
  // console.log("i", i);
  // console.log("Before visited", visited);
  // console.log("Before rotateRoute", rotateRoute);
  DFS(i, 1);
  // console.log("After visited", visited);
  // console.log("After rotateRoute", rotateRoute);

  // 중간에 endDfsFlag가 올라갔다면, 빠른 종료를 위해 반복문 종료
  if (endDfsFlag === true) {
    break;
  }
}

function DFS(x, depth) {
  // console.log(`DFS for ${x} is started`);

  // endDfsFlag가 true라면 (이미 순환선을 찾았다면)
  // 빠른 종료를 위해 return 함
  if (endDfsFlag) {
    return;
  }

  // x번 노드를 방문처리함
  visited[x] = true;

  // x번 노드와 간선으로 연결된 노드를 모두 탐색
  for (let i = 0; i < graph[x].length; i++) {
    // console.log("x", x);
    // console.log("i", i);
    // console.log("graph[x][i]", graph[x][i]);

    // x번 노드와 간선으로 연결된 노드를 변수 y에 저장
    const y = graph[x][i];

    // 만약 y를 방문한적이 없다면
    if (visited[y] === false) {
      // console.log("move to ", y);

      // y번 노드에 대한 DFS 수행, 깊이는 현재 깊이 +1로 설정
      DFS(y, depth + 1);

      // y번 노드를 방문한 적이 있고, y번 노드는 시작점이고,
      // 깊이가 3 이상인 경우 (돌고 돌아 시작점으로 돌아옴 = 순환선)

      // 깊이를 3이상으로 하는 이유 :
      // 시작점의 인접노드에서 바로 다시 시작점으로 돌아오는 경우를 막기 위함
      // ex) 1번 노드에서 시작하였는데 1번 노드 -> 2번 노드 -> 1번 노드 로
      // 돌아오는 경우가 있기 때문
    } else if (visited[y] === true && y === startNode && depth >= 3) {
      // console.log("end");
      // console.log(visited);

      // 찾은 순환선을 rotateRoute에 깊은 복사함
      // rotateRoute에는 1번부터 n번 노드까지 순환선인지의 여부가 들어가 있음
      // (순환선의 조건이 만족할 때의 visited 배열에는 현재 사이클이 완성되어 있음,
      // 이 사이클에 속하는 모든 노드는 순환선임)
      rotateRoute = JSON.parse(JSON.stringify(visited));

      // endFlag를 true로 변경하고 현재 DFS를 종료함
      endDfsFlag = true;
      return;

      // 위 두가지 경우가 아닌 경우, 다음 인접노드로 넘어감
    } else {
      continue;
    }
  }

  // 현재 노드에 대한 탐색이 모두 종료되었다면
  // 방문 처리를 취소함

  // 방문 처리를 취소하는 이유
  // 1. 재귀를 종료하여 다른 길을 찾기 위해
  // 2. 반복문을 통해 다음 노드를 시작점으로 하는 새로운 DFS를 진행해야하므로, visited를 초기화하기 위해
  visited[x] = false;
}

// BFS 수행 (각 역과 순환선 사이의 최단 거리 찾기)

// 방문 예정을 기록하는 배열
let willVisit;

// while문을 몇번 반복했는지 기록하는 변수
// (이 문제에서 while문은 1회당 순환선과의 거리가 1씩 증가함)
let times;

// 최종 정답(각 역에서 순횐선까지의 거리)이 저장될 배열
let answer = [];

// 1번 노드부터 n번 노드까지 BFS 진행, BFS의 결과를 answer 배열에 넣음
for (let i = 1; i <= n; i++) {
  willVisit = new Array(n + 1).fill(false);
  times = 0;
  answer.push(BFS(i));
}

// console.log("---------------answer---------------");
console.log(answer.join(" "));

// 1번 노드부터 n번 노드까지 수행하는 BFS는
// 각 노드의 순환선까지의 최단 거리를 구하기 위해 사용된다.
// (x번 노드의 인접노드의 인접노드의 인접노드를 방문하는데,
// 이를 순환선이 등장할 때까지 반복한다.)

// 만약 1번 노드가 2번 노드와, 2번 노드가 3번 노드와 연결되어 있고,
// 3번 노드는 4번 노드와 연결되어 있으며, 4번, 5번, 6번 노드가 순환선이라면

// 1번 노드의 입장에서 순환선까지의 최단 거리를 구하는 과정은 다음과 같다.

// 1. 1번 노드의 인접노드인 2번 노드에 방문
// 2. 2번 노드는 순환선이 아니므로 times++
// 3. 2번 노드의 인접노드인 3번 노드에 방문
// 4. 3번 노드는 순환선이 아니므로 times++
// 5. 3번 노드의 인접노드인 4번 노드에 방문
// 6. 4번 노드는 순환선 이므로 times 리턴

// 1번에서 출발에 2번 3번을 거쳐 순환선에 도착했다는 것으로 생각하면 된다.

function BFS(startNode) {
  // 반복 예정 목록 생성
  let queue = [];

  // 시작점을 방문 예정 목록에 넣음
  queue.push(startNode);
  willVisit[startNode] = true;

  while (queue.length !== 0) {
    // 방문 예정 목록의 길이를 저장 (BFS를 진행하는 과정에서 큐가 늘어나므로)
    const queueLength = queue.length;

    // 방문 예정 목록의 길이만큼 반복
    for (let i = 0; i < queueLength; i++) {
      // x는 이번에 방문한 노드
      const x = queue.shift();

      // x번 노드가 순환선에 속한 노드라면
      if (rotateRoute[x] === true) {
        // times 리턴
        return times;
      }

      // x번 노드의 인접노드의 갯수만큼 반복
      for (let i = 0; i < graph[x].length; i++) {
        // x번 노드의 인접노드인 y번 노드를 변수 y에 저장
        const y = graph[x][i];

        // y번 노드의 방문 예약이 false 없다면
        if (willVisit[y] === false) {
          // 방문 예정 목록에 y번 노드를 넣음
          queue.push(y);

          // y번 노드의 방문 예약을 true로 변경함
          willVisit[y] = true;
        }
      }
    }

    // x번 노드의 인접노드를 모두 방문 예정 목록에 넣었을 경우
    // times를 증가시킴
    times++;
  }
}

// 문제 풀이 접근 방식

// 이 문제는 두 개의 과정을 진행해야 풀 수 있다.

// 두 가지 과정은 아래와 같다.

// 1. 순환선 찾기 (DFS)
// 2. 각 역과 순환선까지의 최단 거리 찾기 (BFS)

// 각 과정에 대한 자세한 설명은 아래와 같다.

// 1. 순환선 찾기
// DFS를 이용해 시작점으로 되돌아오는 사이클을 찾는다.
// 사이클에 포함된 모든 노드는 순환선에 포함된다.

// 2. 각 역과 순환선까지의 최단 거리 찾기 (BFS)
// 모든 노드에 대해 BFS를 진행한다.
// BFS는 시작점에서 인접노드, 인접노드의 인접노드를 계속 반복하면서
// 순환선에 속하는 노드를 찾을 때까지 진행하며
// 순환선에 속하는 노드를 찾았을 경우,
// 해당 노드까지 진행한 거쳐간 노드의 수(times)를 return 한다.
