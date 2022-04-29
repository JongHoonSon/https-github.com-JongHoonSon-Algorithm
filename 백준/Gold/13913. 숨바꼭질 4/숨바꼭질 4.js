let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [n, k] = input[0]
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("n", n);
// console.log("k", k);

let graph = new Array(100000 + 1).fill(0);
let comeFrom = new Array(100000 + 1);

BFS(n);

let answer = [k];

let before = comeFrom[k];

for (let i = 0; i < graph[k]; i++) {
  answer.unshift(before);
  before = comeFrom[before];
}

console.log(graph[k]);
console.log(answer.join(" "));
// console.log("graph", graph);
// console.log("comeFrom", comeFrom);

// console.log(graph[k]);
// console.log(comeFrom[k]);

function BFS(startNode) {
  let queue = [];
  queue.push(startNode);
  let willVisit = new Array(100000 + 1).fill(false);
  willVisit[startNode] = true;

  while (queue.length !== 0) {
    const x = queue.shift();

    if (x === k) {
      return false;
    }

    // x에서 -1, +1, *2 만큼 이동한 좌표를 nx에 저장

    for (let nx of [x - 1, x + 1, x * 2]) {
      if (willVisit[nx] === false && nx >= 0 && nx <= 100000) {
        queue.push(nx);
        willVisit[nx] = true;

        // nx까지 이동하는데 드는 시간(초), 이전 좌표 + 1초
        graph[nx] = graph[x] + 1;

        // nx로 이동해온 좌표(x)를 comeFrom 저장
        comeFrom[nx] = x;
      }
    }
  }
}

// 후기

// 원래는 comeFrom 배열을 2차원 배열로 만들어서
// 0부터 100000번째 노드를 각각 방문할 때의 경로를 저장했는데
// 이 경우 메모리 초과가 발생한다.
// (100000개 노드에 평균 10개씩만 잡아도 배열을 위해 필요한 공간이 백만개가 되니 그럴듯하다)

// 따라서 구글링을 통해 찾아보니 각 노드는 이전 노드의 정보만 담도록하고,
// graph[k]의 값 만큼 (k로 이동하는데 드는 times 만큼)
// for문을 반복하며 이전노드를 찾았더니 메모리초과없이 잘 통과했다.

// 문제 풀이 접근 방식

// 수빈이의 위치 N에서 -1, +1, *2로 이동하는 BFS를 진행하고
// BFS과정에서 찾은 위치까지의 거리를 graph에 저장하고,
// 해당 좌표의 이전 좌표를 comeFrom에 저장한다. (어디로부터 왔는지)
// BFS과정에서 K를 발견했을 경우 그 즉시 BFS를 중단하고
// graph[k]로 k를 방문하는데 드는 최소 시간을 출력하고,
// comeFrom을 역으로 탐색하며 경로를 찾아낸 후 출력한다.

// (17를 방문하는 최단 경로가 5 -> 4 -> 8 -> 16 -> 17일 경우)

// comeFrom[17] = 16
// comeFrom[16] = 8
// comeFrom[8] = 4
// comeFrom[4] = 5

// 위와 같은 과정으로 경로를 찾을 수 있다.
