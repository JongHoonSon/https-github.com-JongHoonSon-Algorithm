var fs = require('fs');
var inputs = fs.readFileSync('./dev/stdin').toString().split('\n');

const NM = inputs.shift()

const N = +NM.split(' ')[0];
const M = +NM.split(' ')[1];

// console.log(N);
// console.log(M);

let A = new Array(N+6);

for(let i=0; i<N+6; i++) {
    A[i] = new Array(M+6).fill(0);
    // console.log(A[i]);
}

for(let i=3; i<N+3; i++) {
    const line = inputs[i-3];
    const lineArray = line.split(' ').map(v=>+v);
    // console.log(lineArray);
    for(let j=3; j<M+3; j++) {
        A[i][j] = lineArray[j-3];
    }
}

// for(let i=0; i<N+6; i++) {
//     console.log(A[i]);
// }

let result = [];

// 길쭉이
result.push(getMax(1, 4, [0, 0], [1, 0], [2, 0], [3, 0]));
result.push(getMax(4, 1, [0, 0], [0, 1], [0, 2], [0, 3]));

// 뚱뚱이
result.push(getMax(2, 2, [0, 0], [0, 1], [1, 0], [1, 1]));

// 기억자
result.push(getMax(2, 3, [0, 0], [1, 0], [2, 0], [2, 1]));
result.push(getMax(3, 2, [0, 0], [1, 0], [0, 1], [0, 2]));
result.push(getMax(2, 3, [0, 0], [0, 1], [1, 1], [2, 1]));
result.push(getMax(3, 2, [1, 0], [1, 1], [1, 2], [0, 2]));

// 기억자2
result.push(getMax(2, 3, [0, 1], [1, 1], [2, 0], [2, 1]));
result.push(getMax(3, 2, [0, 0], [0, 1], [0, 2], [1, 2]));
result.push(getMax(2, 3, [0, 0], [1, 0], [2, 0], [0, 1]));
result.push(getMax(3, 2, [0, 0], [1, 0], [1, 1], [1, 2]));

// Z 자
result.push(getMax(2, 3, [0, 0], [1, 0], [1, 1], [2, 1]));
result.push(getMax(3, 2, [1, 0], [1, 1], [0, 1], [0, 2]));
result.push(getMax(2, 3, [0, 1], [1, 0], [1, 1], [2, 0]));
result.push(getMax(3, 2, [0, 0], [0, 1], [1, 1], [1, 2]));

// 법규 자
result.push(getMax(3, 2, [1, 0], [0, 1], [1, 1], [1, 2]));
result.push(getMax(3, 2, [0, 0], [0, 1], [1, 1], [0, 2]));
result.push(getMax(2, 3, [0, 0], [1, 0], [2, 0], [1, 1]));
result.push(getMax(2, 3, [1, 0], [0, 1], [1, 1], [2, 1]));

console.log(Math.max(...result));

function getMax(width, height, one, two, three, four) {
    // for(let i=0; i<N+6; i++) {
    //     console.log(A[i]);
    // }
    let max = 0;
    let sum = 0;
    let endflag = false;
    let a;
    let b;
    let c;
    let d;
    for(let i=0; i<N+6-height+1; i++) {
        for(let j=0; j<M+6-width+1; j++) {
            // console.log("i, j", i, j);
            a = A[i+one[0]][j+one[1]];
            b = A[i+two[0]][j+two[1]];
            c = A[i+three[0]][j+three[1]];
            d = A[i+four[0]][j+four[1]];

            if(a === 0 || b === 0 || c === 0 || d === 0) {
            } else {
                // console.log("a, b, c, d : ", a, b, c, d);
                sum = a + b + c + d;
                max = Math.max(max, sum);
            }
        }
    }

    return max;
}