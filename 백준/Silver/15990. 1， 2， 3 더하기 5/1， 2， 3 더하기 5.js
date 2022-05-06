const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const testCaseNum = +input.shift();

// console.log(input);

let D = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [1, 1, 1],
];

for (let i = 4; i <= 100001; i++) {
  D[i] = [
    (D[i - 1][1] + D[i - 1][2]) % 1000000009,
    (D[i - 2][0] + D[i - 2][2]) % 1000000009,
    (D[i - 3][0] + D[i - 3][1]) % 1000000009,
  ];
  // console.log(D[i]);
}

input.forEach((element) => {
  // console.log(element);
  console.log((D[+element][0] + D[+element][1] + D[+element][2]) % 1000000009);
});
