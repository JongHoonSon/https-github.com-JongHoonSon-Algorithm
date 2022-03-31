let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input[0];
const values = input[1].split(' ').map(v=>+v);

// console.log(N);
// console.log(values);

values.sort((a, b) => a - b);

let check = [];
let string = [];
let sum = 0;
let max = 0;

for(let i=0; i<N; i++) {
    check.push(false);
}

// console.log(values);
// console.log(check);

BT(0);

console.log(max);

// console.log(answer.join('\n'));

function BT(step) {
    if(step===N) {
        sum = 0;
        for(let i=0; i<N-1; i++) {
            if(string[i+1] > string[i]) {
                sum = sum + (string[i+1] - string[i]);
            } else {
                sum = sum + (string[i] - string[i+1]);
            }
        }
        if(sum > max) {
            max = sum;
        }
        return;
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


// 문제 접근 방식

// 주어진 수로 만들 수 있는 모든 순열을 만들면서
// 각 순열의 자리별 차이값을 sum에 저장하고
// sum과 max를 비교해가면서
// 만들 수 있는 모든 순열 중 자리별 차이값이 가장 큰 순열의
// 자리별 차이값의 합을 구한다.