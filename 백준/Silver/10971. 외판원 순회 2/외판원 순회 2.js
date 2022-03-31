let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let values = new Array(N);
let check = [];
let string = [];
let sum = 0;
let min = 5000000;

for(let i=0; i<N; i++) {
    values[i] = input[i].split(' ').map(v=>+v);
    check.push(false);
    // console.log(values[i]);
}

// console.log(check);
// console.log(values[0][0]);
// console.log(values[0][1]);
// console.log(values[0][2]);
// console.log(values[0][3]);

BT(0);

console.log(min);

function BT(step) {
    if(step===N) {
        // console.log("String : ", string);

        if(values[string[string.length-1]][string[0]] === 0) {
            return;
        }
        for(let i=1; i<N; i++) {
            if(values[string[i-1]][string[i]] === 0) {
                return;
            }
        }

        sum = values[string[string.length-1]][string[0]];
        for(let i=1; i<N; i++) {
            sum = sum + values[string[i-1]][string[i]];
        }
        if(sum < min) {
            min = sum;
        }
        // console.log(sum);
        return;
    }
    for(let i=0; i<N; i++) {
        if(check[i] === true) {
            continue;
        }
        string.push(i);
        // string.push(values[step][i]);
        check[i] = true;
        BT(step+1);
        string.pop();
        check[i] = false;
    }
}