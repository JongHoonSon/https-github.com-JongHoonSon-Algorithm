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


// 오름차순으로 정렬하기 위해 BT는 for문의 시작점을 나타내는
// min 값을 파라미터로 받는다.
function BT(step, min) {
    if(step === M) {
        answer.push(string.join(' '));
        return ;
    }

    // 반복 시 0번째(첫번째) 요소가 아닌
    // 이전에 호출된 함수로부터 받은 min번째 요소부터 시작한다.
    for(let i=min; i<N; i++) {
        if(check[i] === true) {
            continue;
        }
        string.push(values[i]);
        check[i] = true;

        // 다음 함수를 호출할 때 현재 단계에서 선택한 수 value[i]를 넘긴다.
        // 이로 인해 다음 함수는 value[i]이후부터 탐색하게 된다.
        BT(step+1, values[i]);
        string.pop();
        check[i] = false;
    }
}