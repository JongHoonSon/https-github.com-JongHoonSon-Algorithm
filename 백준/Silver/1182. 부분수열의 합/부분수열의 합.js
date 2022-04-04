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


// 문제 풀이 접근 방식

// 주어진 수로 만들 수 있는 순열에 대해
// 각각의 문자열의 합을 S와 비교하여 맞으면 answer를 ++ 시킨다.

// 순열을 이루는 모든 문자열을 찾기 위해
// 길이가 1부터 N까지인 모든 문자열에 대해
// 오름차순으로 이루어진 문자열을 찾는다. (옵션)
// (1, 2, 3)의 합과 (3, 2, 1) 의 합이 같기 때문