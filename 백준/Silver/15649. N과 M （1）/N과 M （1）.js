let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split(' ');

const N = +input[0];
const M = +input[1];

let arr = [];
let check = [];
let answer = []; 

for(let i=1; i<=N; i++) {
    arr.push(i);
    check.push(false);
}

// console.log(arr);
// console.log(check);

BT(0, []);
console.log(answer.join('\n'));

function BT(index, string) {
    if(index===M) {
        answer.push(string.join(' '));
        return
    }
    for(let i=0; i<N; i++) {
        if(check[i] === true) {
            continue;
        }
        string.push(arr[i]);
        check[i] = true;
        BT(index+1, string);
        check[i] = false;
        string.pop();
    }
}