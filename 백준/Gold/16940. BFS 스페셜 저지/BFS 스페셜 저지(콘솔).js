let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

// 인접리스트 만들기

const n = +input[0].trim();

// console.log("n", n);

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

for (let i = 1; i <= n; i++) {
  // console.log(`graph[${i}]`, graph[i]);
}

let seq = input[n]
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log("seq", seq);

// BFS

let answer = [];
let willVisit = new Array(n + 1).fill(false);

// console.log("willVisit", willVisit);

let seqIdx = 0;
const firstTarget = seq[seqIdx++];
const startNode = 1;
if (firstTarget === startNode) {
  BFS(startNode);
}

// console.log("answer : ", answer);

if (JSON.stringify(seq) === JSON.stringify(answer)) {
  console.log(1);
} else {
  console.log(0);
}

function BFS(startNode) {
  let queue = [];
  queue.push(startNode);
  answer.push(startNode);
  willVisit[startNode] = true;

  let idx = 0;

  while (queue.length !== idx) {
    // console.log("-----------------------");
    // console.log("queue : ", queue);

    const startIndex = idx;
    const lastIndex = queue.length - 1;

    // console.log("startIndex", startIndex);
    // console.log("lastIndex", lastIndex);

    for (let a = startIndex; a <= lastIndex; a++) {
      const x = queue[a];
      idx++;
      // console.log("x : ", x);

      // console.log("-----------------------");
      while (answer.length !== seq.length) {
        // console.log("------------------");
        const target = seq[seqIdx];
        // console.log("new target : ", target);
        // console.log(`graph[${x}]`, graph[x]);
        // console.log("------------------");

        if (!graph[x].includes(target)) {
          // console.log("the target is not in the graph[x]");
          break;
        }

        for (let i = 0; i < graph[x].length; i++) {
          // console.log("------------");
          const y = graph[x][i];

          // console.log("target : ", target);
          // console.log("y : ", y);
          // console.log("------------");
          if (y === target && willVisit[y] === false) {
            // console.log("same");
            seqIdx++;
            queue.push(y);
            answer.push(y);
            willVisit[y] = true;
            // console.log("------------");
            break;
          }

          // console.log("------------");
        }
      }
    }
  }
}
