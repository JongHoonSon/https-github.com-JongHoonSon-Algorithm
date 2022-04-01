let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

// console.log(input);

let moeum = ['a', 'e', 'i', 'o', 'u'];
let L = +input[0].split(' ')[0];
let C = +input[0].split(' ')[1];
let values = input[1].trim().split(' ');
let check = [];
let string = [];
let answer = [];

for(let i=0; i<C; i++) {
    check.push(false);
}

// console.log(L);
// console.log(C);
// console.log(values);
values.sort((a, b) => a.charCodeAt() - b.charCodeAt());
// console.log(values);
    
BT(0, 0);

console.log(answer.join('\n'));

function BT(step, min) {
    if(step === L) {
        // console.log(string);
        let sumMo = 0;
        let sumJa = 0;

        string.forEach(element => {
            if(moeum.includes(element)) {
                // console.log(element);
                sumMo++;
            } else {
                sumJa++;
            }
        });

        if(sumMo >= 1 && sumJa >= 2) {
            answer.push(string.join(''));
        }

        return;
    }
    for(let i=min; i<C; i++) {
        if(check[i] === true) {
            continue;
        }
        string.push(values[i]);
        check[i] = true;
        BT(step+1, i);
        string.pop();
        check[i] = false;
    }
}