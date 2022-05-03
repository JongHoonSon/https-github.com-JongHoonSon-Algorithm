const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString();

const n = +input;

// console.log("n", n);

let graph = new Array(n);

for (let i = 0; i < n; i++) {
  graph[i] = new Array(n).fill("*");
}

for (let i = 0; i < n; i++) {
  // console.log(graph[i]);
}

puncher(n, 0, 0);

// console.log("after");
for (let i = 0; i < n; i++) {
  console.log(graph[i].join(""));
}

function puncher(length, x, y) {
  if (length === 1) {
    return;
  }

  const startPunchIndex = length / 3;

  const endPunchIndex = (length / 3) * 2;

  for (let i = startPunchIndex; i < endPunchIndex; i++) {
    for (let j = startPunchIndex; j < endPunchIndex; j++) {
      graph[i + x][j + y] = " ";
    }
  }

  puncher(startPunchIndex, 0 + x, 0 + y);
  puncher(startPunchIndex, 0 + x, startPunchIndex + y);
  puncher(startPunchIndex, 0 + x, endPunchIndex + y);
  puncher(startPunchIndex, startPunchIndex + x, 0 + y);
  puncher(startPunchIndex, startPunchIndex + x, endPunchIndex + y);
  puncher(startPunchIndex, endPunchIndex + x, 0 + y);
  puncher(startPunchIndex, endPunchIndex + x, startPunchIndex + y);
  puncher(startPunchIndex, endPunchIndex + x, endPunchIndex + y);
}
