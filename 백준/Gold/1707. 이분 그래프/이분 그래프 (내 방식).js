let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const K = +input.shift();
// console.log("K", K);
let graph;
let willVisit;
const answer = [];

for (let i = 0; i < K; i++) {
  const testCase = input.shift();
  const v = +testCase.split(" ")[0];
  const e = +testCase.split(" ")[1];
  // console.log("v", v);
  // console.log("e", e);

  graph = new Array(v + 1);
  for (let k = 1; k < v + 1; k++) {
    graph[k] = new Array();
  }

  // console.log("graph", graph);

  willVisit = new Array(v + 1).fill(0);

  // console.log("willVisit", willVisit);

  for (let j = 0; j < e; j++) {
    const edge = input.shift();
    const a = +edge.split(" ")[0];
    const b = +edge.split(" ")[1];
    // console.log("edge", edge);
    // console.log("a", a);
    // console.log("b", b);

    graph[a].push(b);
    graph[b].push(a);
  }

  let flag = true;
  for (let k = 1; k < v + 1; k++) {
    if (willVisit[k] === 0) {
      if (!BFS(k)) {
        flag = false;
        break;
      }
    }
  }

  if (flag) {
    answer.push("YES");
  } else {
    answer.push("NO");
  }

  // console.log("-----------------------");
}

console.log(answer.join("\n"));

function BFS(start) {
  const queue = [];
  willVisit[start] = 1;
  queue.push(start);

  while (queue.length !== 0) {
    // console.log("queue", queue);
    const x = queue.shift();

    for (let i = 0; i < graph[x].length; i++) {
      // console.log("WillVisit in BFS : ", willVisit);
      const y = graph[x][i];

      if (!willVisit[y]) {
        if (willVisit[x] === 1) {
          willVisit[y] = 2;
        } else {
          willVisit[y] = 1;
        }
        queue.push(y);
      } else if (willVisit[x] === willVisit[y]) {
        return false;
      }
    }
  }

  return true;
}

// 제출한 코드는 구글링해서 얻은 코드인데

// 구조가 같음에도 불구하고 시간 초과 오류 발생 (해결 못함)
