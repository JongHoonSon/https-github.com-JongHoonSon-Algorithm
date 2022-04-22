let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input[0].split(" ")[0];
const M = +input[0].split(" ")[1];
let check = new Array(N + 1).fill(false);
let graph = new Array(N + 1);
let count = 0;

for (let i = 1; i <= N; i++) {
  graph[i] = new Array();
}

for (let i = 1; i <= M; i++) {
  const a = +input[i].split(" ")[0];
  const b = +input[i].split(" ")[1];

  // console.log("a", a);
  // console.log("b", b);

  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 1; i <= N; i++) {
  // console.log(`graph[${i}] : `, graph[i]);
}

for (let i = 1; i <= N; i++) {
  if (DFS(i)) {
    count++;
  }
}

// console.log("count", count);

console.log(count);

function DFS(x) {
  if (check[x] === true) {
    return false;
  }

  check[x] = true;

  for (let i = 0; i < graph[x].length; i++) {
    const y = graph[x][i];

    if (check[y] === false) {
      DFS(y);
    }
  }

  return true;
}
