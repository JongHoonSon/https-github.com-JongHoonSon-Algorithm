const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim();

input = Number(input);

// console.log(DP(input));

let memo = new Array(1001).fill(0);

console.log(DP(input));

function DP(x) {
  if(x===1) {
    return 1;
  }
  if(x===2) {
    return 2;
  } 
  if(memo[x] !== 0) {
    return memo[x];
  }
  return memo[x] = ((DP(x-1) + DP(x-2)) % 10007);
}

// console.log(memo);