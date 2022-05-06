const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

input = +input;

let answer = DP(input);

console.log(answer);

function DP(x) {
  let arr = [];
  for (let i = 0; i <= x; i++) {
    arr.push(i);
  }
  for (let i = 1; i <= x; i++) {
    for (let j = 1; j ** 2 <= i; j++) {
      // console.log("i : ", i);
      // console.log("j : ", j);
      // console.log("arr[i] : ", arr[i]);
      // console.log("arr[i-j**2]+1 : ", arr[i-j**2]+1);
      arr[i] = Math.min(arr[i], arr[i - j ** 2] + 1);
    }
    // console.log("----------");
  }
  return arr.pop();
}
