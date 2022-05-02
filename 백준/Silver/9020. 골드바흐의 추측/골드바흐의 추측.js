const fs = require('fs');
const { stringify } = require('querystring');
const input = fs.readFileSync('./dev/stdin').toString().split('\n');

let testCaseNum = +input[0];
let testCase;

let isPrimeArray = new Array (10000+1).fill(true);
isPrimeArray[0] = isPrimeArray[1] = false;

let m;
let sqrt = Math.ceil(Math.sqrt(10000));
for(let i=2; i<=sqrt; i++) {
    m=2;
    while((i*m)<=10000) {
        isPrimeArray[i*m] = false;
        m++;
    }
}

let gap;
let min=0;
let max=0;
for(let i=0; i<testCaseNum; i++) {
    gap = 10000;
    testCase = +input[i+1];

    let primeArray = [];

    for(let i=2; i<=testCase; i++) {
        if (isPrimeArray[i]) {
            primeArray.push(i);
        }
    }

    // console.log(primeArray);

    for(let j=0; j<primeArray.length; j++) {
        for(let k=0; k<primeArray.length; k++) {
                if(primeArray[j]+primeArray[k] === testCase) {
                    if (j==k) {
                        min = max = primeArray[j];
                        break;
                    } else if (j>k) {
                        if(gap > j-k) {
                            gap = j-k;
                            max = primeArray[j];
                            min = primeArray[k];
                        }
                    } else if (j<k) {
                        if(gap > k-j) {
                            gap = k-j;
                            max = primeArray[k];
                            min = primeArray[j];
                        }
                    }
                }
        }
    }
    console.log(`${min} ${max}`);
}