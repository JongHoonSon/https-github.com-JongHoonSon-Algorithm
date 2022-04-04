let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const NS = input.shift().trim().split(' ').map(v=>+v);

const N = NS[0];
const S = NS[1];
// console.log(N);
// console.log(S);

let value = input[0].trim().split(' ').map(v=>+v);
// console.log(value);

let check = [];
for(let i=0; i<N; i++) {
    check.push(false);
}

let arr = [];
let sum;
let answer = 0;

for(let i=1; i<=N; i++) {
    BT(0, 0, i);
}

console.log(answer);

function BT(step, min, length) {
    if(step === length) {
        // console.log(arr);
        sum = 0;
        arr.forEach(el => {
            sum = sum + el;
        });

        // console.log(sum);

        if(sum === S) {
            answer++;
        }
        
        return;
    }

    // 오름차순으로 고르도록 않도록 min 설정
    for(let i=min; i<N; i++) {
        if(check[i] === true) {
            continue;
        }
        arr.push(value[i]);
        check[i] = true;
        BT(step+1, i, length);
        arr.pop();
        check[i] = false;
    }
}