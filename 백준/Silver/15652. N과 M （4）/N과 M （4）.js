let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split(' ');

const N = +input[0];
const M = +input[1];

// console.log(N);
// console.log(M);

let values = [];
let string = [];

const answer = [];

for(let i=0; i<N; i++) {
    values.push(i+1);
}

// console.log(values);
// console.log(check);

BT(0, 1);

console.log(answer.join('\n'));


function BT(step, min) {
    if(step === M) {
        answer.push(string.join(' '));
        return ;
    }

    for(let i=min-1; i<N; i++) {
        string.push(values[i]);
        BT(step+1, values[i]);
        string.pop();
    }
}