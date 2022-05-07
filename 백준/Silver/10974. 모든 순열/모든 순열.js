let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim();

const N = +input;

// console.log(N);

let values = [];
let check = [];
let string = [];
let answer = [];

for (let i = 0; i < N; i++) {
  values.push(i + 1);
  check.push(false);
}

// console.log(values);
// console.log(check);

BT(0);

console.log(answer.join("\n"));

function BT(step) {
  if (step === N) {
    answer.push(string.join(" "));
    return;
  }
  for (let i = 0; i < N; i++) {
    if (check[i] === true) {
      continue;
    }
    string.push(values[i]);
    check[i] = true;
    BT(step + 1);
    string.pop();
    check[i] = false;
  }
}
