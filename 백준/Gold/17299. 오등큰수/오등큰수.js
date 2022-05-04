const fs = require('fs');
let input = (process.platform === "linux"
  ? fs.readFileSync("/dev/stdin").toString()
  : `7
1 1 2 3 4 2 1`
)
  .split("\n")[1]
  .split(" ")
  .map((x) => +x);
let result = new Array(input.length).fill(-1);
let count = {};
input.forEach((x) => {
  count[x] = (count[x] || 0) + 1;
});
let stack = [];
for (let i = 0; i < input.length; i++) {
  while (
    stack.length &&
    count[input[stack[stack.length - 1]]] < count[input[i]]
  ) {
    result[stack.pop()] = input[i];
  }
  stack.push(i);
}

console.log(result.join(" "));