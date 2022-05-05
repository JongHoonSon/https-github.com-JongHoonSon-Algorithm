const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const A = +input[0].split(" ")[0];
const B = +input[0].split(" ")[1];

const m = +input[1];

const numArray = input[2].split(" ").map((v) => +v);

// A진수를 10진수로 변환하기

let Ato10 = 0;

for (let i = 0; i < m; i++) {
  // 가장 끝의 값부터 앞까지 하나씩 빼서
  const num = numArray.pop();

  // i제곱한 값을 누적함 (i는 0부터 m-1까지 커짐)
  Ato10 = Ato10 + num * Math.pow(A, i);
}

// 10진수를 B진수로 변환하기

let toB = [];

while (Ato10 !== 0) {
  // 10진수를 B로 나눈 나머지 값을
  const rest = Ato10 % B;

  // toB 리스트에 하나씩 push함
  toB.push(rest);
  Ato10 = Math.floor(Ato10 / B);
}

// toB를 거꾸로 돌림
toB.reverse();

console.log(toB.join(" ").trim());
