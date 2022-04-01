let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

let i = 0;
let answer = [];
let values;
let N;
let check;
let string;

while(true) {
    if(input[i] === '0') {
        break;
    }

    values = input[i].trim().split(' ').map(v=>+v);
    N = +values.shift();
    check = [];
    string = [];
    
    for(let j=0; j<N; j++) {
        check.push(false);
    }
    
    BT(0, 0);

    answer.push('');
    i++;
} 

console.log(answer.join('\n'));

function BT(step, min) {
    if(step === 6) {
        answer.push(string.join(' '));
        return;
    }
    for(let j=min; j<N; j++) {
        if(check[j] === true) {
            continue;
        }
        string.push(values[j]);
        check[j] = true;
        BT(step+1, j);
        string.pop();
        check[j] = false;
    }
}