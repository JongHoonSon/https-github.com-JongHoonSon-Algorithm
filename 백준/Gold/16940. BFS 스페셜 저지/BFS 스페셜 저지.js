let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

// 인접리스트 만들기

const n = +input[0].trim();

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

// 입력에 주어진 탐색 순서를 seq 배열에 저장
// 1번 노드부터 시작하는 BFS를 진행하면서, seq 베열의 순서대로 BFS를 진행할 수 있는지 체크한다.
let seq = input[n]
  .trim()
  .split(" ")
  .map((v) => +v);

// BFS

let answer = [];

// DFS에서 확인할 seq의 index
let seqIdx = 1;

// 1번 노드부터 BFS 수행(문제 조건)
BFS(1);

// seq와 answer이 같다면, graph를 seq 순서대로 BFS를 이용해 탐색할 수 있다는 것을 의미함
if (JSON.stringify(seq) === JSON.stringify(answer)) {
  // if (answer.length === seq.length) {
  console.log(1);

  // seq와 answer이 다르다면, graph를 seq 순서대로 BFS를 이용해 탐색할 수 없다는 것을 의미함
} else {
  console.log(0);
}

function BFS(startNode) {
  // 방문 예정 목록(큐)를 생성하고, 시작점을 큐에 넣는다.
  let queue = [];
  queue.push(startNode);
  answer.push(startNode);

  // idx는 큐를 shift하지 않고, index로 사용하기 위해 쓰는 변수이다.
  // idx는 곧 큐에서 방문 완료한 노드의 갯수와 같다.
  let idx = 0;

  // 만일 큐의 길이가 idx 값과 같다면,
  // 큐의 모든 노드를 탐색했다는 것이므로 반복을 종료한다.
  // (큐의 length가 0일 때 멈추는 것과 같은 논리이다.)
  while (queue.length !== idx) {
    // 현재 단계에서 탐색을 수행할 x는 큐에 남아 있는 노드들이다.
    // 따라서 탐색 구간을 startIndex부터 lastIndex까지로 한다.

    // startIndex는 큐의 순서상 다음에 꺼내야할 노드의 index이고,
    // lastIndex는 큐의 마지막 index이다. (BFS를 진행하면서 큐의 길이가 변하므로, 미리 저장한다.)
    const startIndex = idx;
    const lastIndex = queue.length - 1;

    // startIndex부터 lastIndex까지 탐색한다
    for (let a = startIndex; a <= lastIndex; a++) {
      // 큐에서 index a에 저장된 노드를 꺼낸다.
      const x = queue[a];

      // 다음에 꺼내야 할 index의 값을 저장한 idx 변수의 값을 1 증가시킨다.
      idx++;

      // 만약 answer의 길이가 seq의 길이와 같다면
      // 더 이상 BFS를 진행할 필요가 없으므로 종료한다.

      // (ex) seq가 [1, 2, 3, 4] 인데, answer의 길이가 4가 되었다면,
      // 이미 BFS를 진행하는 과정에서 seq대로 answer를 구했다는 것을 의미하므로
      // 더이상의 BFS를 진행하지 않고 종료한다.

      // 순서를 저장하는 answer에 추가로 더 저장할 필요가 없고,
      // seq와 answer가 같은지만 비교하면 된다.)
      while (answer.length !== seq.length) {
        // 이번 BFS 순서에서 방문할 수 있는지 체크할 노드를 target에 넣음
        const target = seq[seqIdx];

        // 만약 x번 노드에서 target으로 이동할 수 없다면
        if (!graph[x].includes(target)) {
          // 종료함
          break;
        }

        // x번 노드의 인접 노드 갯수만큼 반복
        for (let i = 0; i < graph[x].length; i++) {
          // x번 노드의 인접 노드 y번 노드를 변수 y에 저장
          const y = graph[x][i];

          // 만약 y번 노드가 현재 BFS 단계에서 방문해야할 target과 같고, 아직 y를 방문한 적이 없다면
          if (y === target) {
            // seqInx를 1 증가시켜 다음 target을 가르킬 수 있도록 변경하고
            seqIdx++;

            // 큐와 answer에 y를 저장하고
            queue.push(y);
            answer.push(y);

            break;
          }
        }
      }
    }
  }
}

// 시간 초과 관련

// 로직은 잘 작성한 것 같은데, 시간 초과가 발생하여 코드에서 shift()를 모두 index로 대체하였다. (input 포함)
// 그렇게 하니 통과하는데 성공했다. 만약 로직이 문제가 없는 것 같은데 시간 초과가 발생하면
// shift 구문을 모두 index로 대체해보는 것도 좋을 것 같다.

// 코드 설명을 위한 주석을 추가한 이후에는 통과가 안된다.
// (콘솔)이라고 붙은 걸로 제출하면 통과된다. (코드는 완전히 같다.)
// 주석도 시간 초과와 관련이 있는 것 같다. (수정 => 없는 것 같다. 다시 해보니 통과한다.)

// 문제 풀이 접근 방식

// 문제는 간단하다. 입력으로 인접 리스트가 주어지고,
// 마지막 줄에 주어지는 순서대로 BFS를 진행할 수 있느냐를 판단하는 것이다.

// 이를 해결하기 위해 입력으로 주어지는 탐색 순서를 seq라는 배열에 저장하고,
// BFS를 진행하는 과정에서 x번 노드를 탐색한다면 x번 노드의 인접 노드인 y번 노드가
// seq 배열에서 현재 순서상 방문해야할 차례의 노드인지 판단하는 것이다.

// 현재 방문해야할 차례인 노드가 맞다면,
// 다음에 방문할 차례인 노드의 index 값을 기록하고 있는 seqIdx의 값을 1 증가시키고,
// 해당 노드를 방문한다.

// 아니라면 다음 인접 노드를 확인한다.

// 단, 한가지 주의할 점은 다음과 같은 경우이다.

// 1번 노드는 2번, 3번 노드와 연결되어 있다고 가정하고
// 일반적으로 BFS를 진행하면 1 -> 2 -> 3 순서로 진행한다.
// (graph[1]에 [2, 3]으로 저장되어 있기 때문에 grpah[1]의 0번 인덱스부터 탐색을 수행한다면)

// 다만 BFS 특성 상 어느 노드부터 탐색하는지는 중요하지 않기 때문에
// 1 -> 3 -> 2 순서로 진행하는 것도 정답으로 인정되어야 한다.

// 따라서 seq 배열에 1 -> 3 -> 2 로 들어 있는 경우도 잘 처리되도록 하기 위해
// seq에서 target으로 3을 꺼냈을 때, graph[x]의 모든 인접 노드를 반복하면서
// target인 3이 있는지 확인하고, 만약 3이 있으면 3을 answer에 넣는다.

// 또한 다음 target인 2를 꺼냈을 때도
// 마찬가지로 graph[x]의 모든 인접 노드를 반복하면서 target인 2가 있는지
// 확인하여야 한다.
