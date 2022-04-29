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
      const [x, clipBoard] = queue[a];
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
      if (x + clipBoard <= 1000) {
        if (clipBoard !== 0 && willVisit[x + clipBoard][clipBoard] === false) {
          queue.push([x + clipBoard, clipBoard]);
          willVisit[x + clipBoard][clipBoard] = true;
        }
      }

      // -1, 클립보드는 그대로

      if (x - 1 >= 0) {
        if (willVisit[x - 1][clipBoard] === false) {
          queue.push([x - 1, clipBoard]);
          willVisit[x - 1][clipBoard] = true;
        }
      }
    }
    times++;
  }
}
