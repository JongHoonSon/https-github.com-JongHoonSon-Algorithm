let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split(' ');

const N = +input[0];
const M = +input[1];

// console.log(N);
// console.log(M);

let values = [];
let check = [];
let string = [];

const answer = [];

for(let i=0; i<N; i++) {
    values.push(i+1);
    check[i] = false;
}

// console.log(values);
// console.log(check);

BT(0, 0);

console.log(answer.join('\n'));

function BT(step, min) {
    if(step === M) {
        answer.push(string.join(' '));
        return ;
    }

    for(let i=min; i<N; i++) {
        if(check[i] === true) {
            continue;
        }
        string.push(values[i]);
        check[i] = true;
        BT(step+1, values[i]);
        string.pop();
        check[i] = false;
    }
}