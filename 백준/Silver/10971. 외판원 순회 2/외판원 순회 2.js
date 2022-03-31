let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let values = new Array(N);
let visited = [];
let path = [];
let sum = 0;
let min = 5000000;

for(let i=0; i<N; i++) {
    values[i] = input[i].split(' ').map(v=>+v);
    visited.push(false);
    // console.log(values[i]);
}

// console.log(visited);
// console.log(values[0][0]);
// console.log(values[0][1]);
// console.log(values[0][2]);
// console.log(values[0][3]);

BT(0);

console.log(min);

function BT(step) {
    if(step===N) {
        // console.log("path : ", path);
        const firstIndex = path[0];
        const lastIndex = path[path.length-1];

        for(let i=1; i<N; i++) {
            if(values[path[i-1]][path[i]] === 0) {
                return;
            }
        }
        if(values[lastIndex][firstIndex] === 0) {
            return;
        }

        sum = 0;
        for(let i=1; i<N; i++) {
            sum = sum + values[path[i-1]][path[i]];
        }
        sum = sum + values[lastIndex][firstIndex];

        if(sum < min) {
            min = sum;
        }
        // console.log(sum);
        return;
    }
    for(let i=0; i<N; i++) {
        if(visited[i] === true) {
            continue;
        }
        path.push(i);
        visited[i] = true;
        BT(step+1);
        path.pop();
        visited[i] = false;
    }
}