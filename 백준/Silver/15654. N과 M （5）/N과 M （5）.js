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

let check = [];
let string = [];
const answer = [];

// 중복한 수를 고를 수 없으므로 check 사용
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
        BT(step+1);
        string.pop();
        check[i] = false;
    }
}