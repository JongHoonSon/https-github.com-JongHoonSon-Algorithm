const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');

const N = +(input.shift());
const inputArray = input[0].split(' ').map(i => Number(i));

// console.log(inputArray);

const stack = [];
const answer = new Array(N).fill(0);


// for(let i=0; i<N; i++) {

// }

for(let i=N-1; i>=0; i--) {
    while(answer[i] === 0) {
        if(stack.length === 0) {
            answer[i] = -1;
            stack.push(inputArray[i]);
        } else {
            if(stack[stack.length-1] <= inputArray[i]) {
                stack.pop();
            } else {
                answer[i] = stack[stack.length-1];
                stack.push(inputArray[i]);
            }
        }
    }
}

console.log(answer.join(' ').trim());