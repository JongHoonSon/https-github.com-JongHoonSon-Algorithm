const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim();

input = Number(input);

const memo = new Array(input+1).fill(0);

for(let i = 2; i <= input; i++) {
  memo[i] = memo[i-1] + 1;

  if(i%2 === 0) {
    memo[i] = Math.min(memo[i], memo[i/2] + 1);
  }

  if(i%3 === 0) {
    memo[i] = Math.min(memo[i], memo[i/3] + 1);
  }
}

console.log(memo[input]);