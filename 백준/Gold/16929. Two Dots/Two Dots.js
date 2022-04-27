let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [n, m] = input
  .shift()
  .trim()
  .split(" ")
  .map((v) => +v);

// console.log(n);
// console.log(m);

let graph = new Array();
let visited = new Array();
// let visited;
let move = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < n; i++) {
  graph[i] = new Array();
  graph[i] = input.shift().trim().split("");
  visited[i] = new Array(m).fill(false);
  // console.log(`graph[${i}]`, graph[i]);
  // console.log(`visited[${i}]`, visited[i]);
}

let endFlag = false;

let startI;
let startJ;
let startValue;
outer: for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    startI = i;
    startJ = j;
    startValue = graph[startI][startJ];
    // console.log("value", value);
    // console.log("-------------------");
    // console.log("startI : ", startI);
    // console.log("startJ : ", startJ);
    // console.log("startValue : ", startValue);
    DFS(startI, startJ, 1);
    // console.log("-------------------");
    if (endFlag === true) {
      break outer;
    }
  }
}

if (endFlag === true) {
  console.log("Yes");
} else {
  console.log("No");
}

function DFS(i, j, depth) {
  // console.log("--------");
  // console.log("DFS i, j : ", i, j);
  if (endFlag === true) {
    return;
  }
  visited[i][j] = true;

  for (let a = 0; a < 4; a++) {
    const ni = i + move[a][0];
    const nj = j + move[a][1];

    if (ni < 0 || nj < 0 || ni >= n || nj >= m) {
      continue;
    }

    const y = graph[ni][nj];

    // console.log("---");
    // console.log("y : ", y);
    // console.log("visited[ni][nj] : ", visited[ni][nj]);
    // console.log("ni : ", ni);
    // console.log("nj : ", nj);
    // console.log("depth : ", depth);
    // console.log("---");
    if (
      y === startValue &&
      visited[ni][nj] === true &&
      ni === startI &&
      nj === startJ &&
      depth >= 3
    ) {
      // console.log("found!!!");
      endFlag = true;
      return;
    } else if (y === startValue && visited[ni][nj] === false) {
      DFS(ni, nj, depth + 1);
    } else {
      continue;
    }
  }

  visited[i][j] = false;
  // console.log("--------");
}
