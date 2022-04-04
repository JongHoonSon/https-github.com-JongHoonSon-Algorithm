let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let inequality = input.shift().trim().split(' ');
let value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let check = [];
let comb = [];
let answer = [];
let isFalse;

for(let i=0; i<N; i++) {
    check.push(false);
}

// console.log(check);
// console.log(inequality);
BT(0);
// console.log("answer : ", answer);

let max = Math.max(...answer);
let min = Math.min(...answer);

const maxString = String(max).padStart(N+1, '0');
const minString = String(min).padStart(N+1, '0');

console.log(maxString);
console.log(minString);

function BT(step) {
    if(step === N+1) {
        // console.log(comb);

        isFalse = false;

        for(let j=0; j<N; j++) {
            if(inequality[j] === '<') {
                if(!(comb[j] < comb[j+1])) {
                    isFalse = true;
                    break;
                }
            } else {
                if(!(comb[j] > comb[j+1])) {
                    isFalse = true;
                    break;
                }
            }
        }

        if(!isFalse) {
            answer.push(comb.join(''));
        } 
        return;
    }

    for(let i=0; i<10; i++) {
        if(check[i] === true) {
            continue;
        }
        comb.push(i);
        check[i] = true;
        BT(step+1);
        comb.pop();
        check[i] = false;
    }
}