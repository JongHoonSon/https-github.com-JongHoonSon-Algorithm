let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// console.log("N", N);

let graph = new Array(N + 1);
let moveX = [-1, 1, 0, 0];
let moveY = [0, 0, -1, 1];

for (let i = 0; i < N; i++) {
  const line = input.shift().trim();
  graph[i] = line.split("").map((v) => +v);
}

for (let i = 0; i < N; i++) {
  // console.log(`graph[${i}] : `, graph[i]);
}

let townNum = 2;
let townArr = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (DFS(i, j, townNum) === true) {
      townArr.push(townNum);
      townNum++;
    }
  }
}

console.log(townArr.length);

let houseCntPerTownArr = new Array(townArr.length).fill(0);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < townArr.length; k++) {
      if (graph[i][j] === townArr[k]) {
        houseCntPerTownArr[k]++;
      }
    }
  }
}

houseCntPerTownArr.sort((a, b) => a - b);

console.log(houseCntPerTownArr.join("\n"));

function DFS(i, j, toBe) {
  // console.log("i & j : ", i, j);
  if (i < 0 || i >= N || j < 0 || j >= N) {
    return false;
  }

  const x = graph[i][j];

  if (x === 0) {
    return false;
  }

  if (x === 1) {
    graph[i][j] = toBe;

    for (let a = 0; a < moveX.length; a++) {
      const ni = i + moveY[a];
      const nj = j + moveX[a];

      DFS(ni, nj, toBe);
    }

    return true;
  }
}
