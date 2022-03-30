let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split(' ');

const N = +input[0];
const M = +input[1];

// console.log(N);
// console.log(M);

let values = [];
let string = [];

const answer = [];

// 모든 요소에 대해 탐색을 해야하므로
// 탐색 여부를 판단할 때 사용되는 check가 필요 없어진다.
for(let i=0; i<N; i++) {
    values.push(i+1);
}

// console.log(values);
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