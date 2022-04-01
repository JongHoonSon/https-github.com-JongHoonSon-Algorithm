let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const day = [];
const reward = [];
const memo = [];

for(let i=0; i<N; i++) {
    day.push(+input[i].split(' ')[0]);
    reward.push(+input[i].split(' ')[1].trim());
    memo.push(0);
}

// console.log(N);
// console.log(day);
// console.log(reward);
// console.log(memo);

for(let i=0; i<N; i++) {
    if(day[i]+i > N) {
        continue;
    }
    memo[i] = memo[i] + reward[i];
    for(let j=i+day[i]; j<N; j++) {
        memo[j] = Math.max(memo[j], memo[i])
    }
}

console.log(Math.max(...memo));