let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const n = +input[0].trim();

// console.log("n", n);

const willVisit = new Array(1001);

for (let i = 0; i <= 1000; i++) {
  willVisit[i] = new Array(1001).fill(false);
}

let answer;

answer = BFS(1);

console.log(answer);

function BFS(startNode) {
  let queue = [];
  queue.push([startNode, 0]);
  willVisit[startNode][0] = true;
  let idx = 0;
  let times = 0;

  while (queue.length !== idx) {
    let startIndex = idx;
    let lastIndex = queue.length - 1;

    for (let a = startIndex; a <= lastIndex; a++) {
      const [x, clipboard] = queue[a];
      idx++;

      if (x === n) {
        return times;
      }

      // 복사, 클립보드 덮어쓰기
      if (x >= 1 && willVisit[x][x] === false) {
        queue.push([x, x]);
        willVisit[x][x] = true;
      }

      // 붙혀넣기, 클립보드는 그대로
      if (x + clipboard <= 1000) {
        if (clipboard !== 0 && willVisit[x + clipboard][clipboard] === false) {
          queue.push([x + clipboard, clipboard]);
          willVisit[x + clipboard][clipboard] = true;
        }
      }

      // -1, 클립보드는 그대로

      if (x - 1 >= 0) {
        if (willVisit[x - 1][clipboard] === false) {
          queue.push([x - 1, clipboard]);
          willVisit[x - 1][clipboard] = true;
        }
      }
    }
    times++;
  }
}

// 문제 풀이 접근 방식

// 문제에서 주어진 이모티콘의 수 S개를 만들기 위해서
// 기본으로 주어진 1개부터 BFS를 시작해서
// 중간에 큐에서 꺼낸 값 x가 S와 같다면 BFS를 종료하고,
// 그 시점까지 걸린 시간(times)을 출력한다.
// 큐에는 x의 값과 당시 클립보드의 값이 배열 형태로 저장된다.

// 문제에서 주어진 탐색 조건은 다음 세 가지이다.

// 1. 클립보드에 복사하는 경우
// => 큐에 [x, x]를 넣는다.

// 2. 붙혀넣기 하는 경우
// => 큐에 [x+clipboard, clipboard]를 넣는다.

// 3. -1 하는 경우
// => 큐에 [x-1, clipboard]를 넣는다.

// 위 세가지를 수행하기 이전에 x값의 범위를 체크하고,
// willVisit으로 이미 한번 탐색한 [x, clipboard]인지 체크한다.
// (후자를 체크하지 않았더니 메모리초과가 발생했다.
// 같은 x값 clipboard를 다시 탐색해서 발생하는 것 같다.)
