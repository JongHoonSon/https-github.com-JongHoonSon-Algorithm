let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input[0].split(' ')[0];
const M = +input[0].split(' ')[1];

const values = input[1].split(' ');
// 입력 값을 오름차순으로 정렬
values.sort((a, b) => a - b);

// console.log(N);
// console.log(M);
// console.log(values);

// 중복으로 선택할 수 있으므로 check 제거
let check = [];
let string = [];
const answer = [];

// console.log(check);

BT(0);

console.log(answer.join('\n'));

function BT(step) {
    if(step === M) {
        answer.push(string.join(' '));
        return ;
    }
    
    for(let i=0; i<N; i++) {
        string.push(values[i]);
        BT(step+1);
        string.pop();
    }
}