let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

let N = +input[0];
const string = input[1].split(' ').map(v=>+v);
const arr = [];
arr.push(string[--N]);
let changeIndex;
let endFlag = false;

// console.log(N);
// console.log(string);
// console.log(arr);

while(true) {
    if(N === 0) {
        endFlag = true;
        break;
    }
    if(string[N] > string[--N]) {
        changeIndex = N;
        break;
    }
    arr.push(string[N]);
}

if(endFlag) {
    console.log(-1);
} else {
    // console.log("string", string);
    // console.log("changeIndex", changeIndex);
    // console.log("arr", arr);
    
    let temp1 = string[changeIndex];
    let minGap=10000;
    let minGapIndex;
    for(let i=0; i<arr.length; i++) {
        if(arr[i] > temp1 && arr[i] - temp1 < minGap) {
            minGap = arr[i] - temp1;
            minGapIndex = i;
        }
    }
    string[changeIndex] = arr[minGapIndex];
    arr[minGapIndex] = temp1;
    
    // console.log("string", string);
    // console.log("changeIndex", changeIndex);
    // console.log("arr", arr);
    
    console.log(string.slice(0, changeIndex+1).join(' ') + ' ' + arr.join(' '));
    // console.log("string.slice(0, changeIndex+1)", string.slice(0, changeIndex+1));
    // console.log("arr", arr);
}