const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const A = +input[0].split(" ")[0];
const B = +input[0].split(" ")[1];

const m = +input[1];

const numArray = input[2].split(" ").map((v) => +v);

let Ato10 = 0;

for (let i = 0; i < m; i++) {
  const num = numArray.pop();
  Ato10 = Ato10 + num * Math.pow(A, i);
}

let toB = [];

while (Ato10 !== 0) {
  const rest = Ato10 % B;
  toB.push(rest);
  Ato10 = Math.floor(Ato10 / B);
}

toB.reverse();

console.log(toB.join(" ").trim());
