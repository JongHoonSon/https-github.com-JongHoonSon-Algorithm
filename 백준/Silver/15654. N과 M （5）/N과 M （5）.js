let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input[0].split(' ')[0];
const M = +input[0].split(' ')[1];

const values = input[1].split(' ');
values.sort((a, b) => a - b);

// console.log(N);
// console.log(M);
// console.log(values);

let check = [];
let string = [];
const answer = [];

for(let i=0; i<N; i++) {
    check[i] = false;
}

// console.log(check);

BT(0);

console.log(answer.join('\n'));

function BT(step) {
    if(step === M) {
        answer.push(string.join(' '));
        return ;
    }

    for(let i=0; i<N; i++) {
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