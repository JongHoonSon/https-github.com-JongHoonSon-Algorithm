let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [m, n] = input[0]
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("m", m);
// console.log("n", n);

let graph = new Array(n);

for (let i = 0; i < n; i++) {
  const line = input[i + 1]
    .trim()
    .split("")
    .map((v) => +v);
  graph[i] = line;
}

for (let i = 0; i < n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

let willVisit = new Array(n);
let move = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < n; i++) {
  willVisit[i] = new Array(m).fill(false);
}

let answer = BFS(0, 0);

// n과 m이 1일 경우, 예외처리
if (n === 1 && m === 1 && graph[0][0] === 0) {
  console.log(0);

  // 벽을 하나도 뚫지 않은 경우
} else if (answer === false) {
  console.log(0);

  // 벽을 뚫은 경우
} else {
  console.log(answer);
}

// console.log("result");
// console.log(BFS(0, 0));

function BFS(startI, startJ) {
  let queue = [];
  queue.push([startI, startJ, 0]);
  willVisit[startI][startJ] = true;

  while (queue.length !== 0) {
    // console.log(queue);
    const queueLength = queue.length;
    for (let a = 0; a <= queueLength - 1; a++) {
      // console.log("----------------");
      const [i, j, cnt] = queue.shift();
      // console.log("i, j, cnt : ", i, j, cnt);

      for (let b = 0; b < 4; b++) {
        // console.log("------");
        const ni = i + move[b][0];
        const nj = j + move[b][1];

        if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
          continue;
        }

        // (N, M)에 도착했을 경우, 벽을 뚫은 갯수인 cnt 리턴
        if (ni === n - 1 && nj === m - 1) {
          return cnt;
        }

        // 벽이 존재한다면 => 뚫고 queue에 넣을때 cnt의 값을 1 늘린다.
        if (graph[ni][nj] === 1) {
          graph[ni][nj] = 0;
          queue.push([ni, nj, cnt + 1]);
          willVisit[ni][nj] = true;
        }

        // 빈 방이고 방문한 적이 없다면 => 방문한다.
        if (graph[ni][nj] === 0 && willVisit[ni][nj] === false) {
          queue.unshift([ni, nj, cnt]);
          willVisit[ni][nj] = true;
        }
        // console.log("------");
      }

      // console.log("----------------");
    }
  }
}

// 후기

// 처음에 접근 방식이 잘못된 것 같다.
// 기존의 내가 풀이했던 방식은 BFS를 여러번 진행했는데,
// 먼저 첫번째 BFS인 BFS1를 진행하고, (N,M)에 도달하지 못했을 경우 (false를 리턴할 경우)
// 첫번째 BFS에서 담아두었던 emptyRoom 배열로 두번째 BFS를 진행하였다.
// 두번째 BFS는 emptyRoom을 반복하면서, BFS 도중 빈방이면서 방문하지 않은 곳을 찾지 못한 경우
// 벽을 부수고, 벽을 부순 횟수를 기록하며 BFS를 진행했다.

// 위 처럼 코드를 작성했는데 실패하여, 구글링을 통해 방법을 알게되었다.

// 먼저, 생각한것보다 문제는 간단하였다.
// 내가 설계한 것처럼 BFS1, BFS2를 나눠서 설계할 필요는 없었다.
// 그냥 하나의 BFS를 진행하면서 진행이 막히면 벽을 뚫는 형식으로 하면 되었다.
// 하나 주의할 점은 벽을 뚫었을 경우 그냥 queue에 push해주고 (우선순위상 맨 마지막에 들어감)
// 벽을 뚫지 않고, 방문한적 없는 빈방에 접근한 경우는 queue에 unshift 해주었다는 점이다.
// 최대한 벽을 뚫지 않고 진행하기 위해 위 방법을 사용했다고 생각하면 된다.

// 또한 이번 문제를 풀면서, BFS 중간에 필요한 변수를 어디다가 써야할지를 배울 수 있었다.
// 기존에는 벽을 뚫은 횟수를 따로 변수를 만들어 저장했는데,
// 문제는 모든 BFS가 같은 변수를 참고하고 있다보니,
// A벽을 뚫지 않은 경우의 BFS가 A벽을 뚫은 것처럼 값을 갖고 있었다.
// 이러한 일이 발생한 이유는 BFS 특성상 자식이 자식을 낳고 이것을 지속적으로 반복하는데,
// (ex) 부모 -> 자식3 -> 자식9 -> 자식 27 ..... 이런 느낌)
// 벽을 뚫고 말고의 값을 BFS 내의 전역변수로 갖고 있었기 때문이다.

// 따라서 여러 갈래로 나눠지는 BFS가 각각 벽을 몇개를 뚫었는지를
// 큐 자체에 cnt 형태로 저장하였더니 각 BFS 마다 벽을 뚫은 횟수를 오류없이 저장할 수 있없다.

// 전역변수로 처리하는 것은 몇일이 지났는지 몇초가 지났는지 등에는 적합하나,
// 각 BFS가 처리해야될 게 다를 경우에는 queue에 해당 정보를 저장해오자
// (여기서 queue에 저장하는 이유, 계속 queue에 push, queue에서 shift 해오기 때문에,
// 이전에 진행한 BFS에서 저장한 값을 다음 BFS에서 사용할 수 있다.)
