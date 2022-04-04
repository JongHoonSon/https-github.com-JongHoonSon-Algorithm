let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

const N = +input.shift();
let abil = new Array(N);
let person = [];
let check = [];
let team1 = [];
let team2 = [];
let abil1;
let abil2;
let minGap = 2000;

for(let i=0; i<N; i++) {
    abil[i] = input.shift().trim().split(' ').map(v=>+v);
    person.push(i);
    check.push(false);
    // console.log(abil[i]);
}

// console.log(check);

BT(0, 0);

console.log(minGap);

function BT(step, min) {
    if(step === N/2) {
        // 로직
        // console.log("team1 : ", team1);
        abil1 = 0;
        for(let j=0; j<team1.length; j++) {
            for(let k=0; k<team1.length; k++) {
                abil1 = abil1 + abil[team1[j]][team1[k]];
            }
        }
        // console.log("abil1 : ", abil1);
        
        
        team2 = person.filter(x => !team1.includes(x));
        
        // console.log("team2 : ", team2);
        abil2 = 0;
        for(let j=0; j<team2.length; j++) {
            for(let k=0; k<team2.length; k++) {
                abil2 = abil2 + abil[team2[j]][team2[k]];
            }
        }
        // console.log("abil2 : ", abil2);
        // console.log("------------------");

        if(abil1 >= abil2) {
            minGap = Math.min(abil1 - abil2, minGap);
        } else {
            minGap = Math.min(abil2 - abil1, minGap);
        }

        return;
    }
    for(let i=min; i<N; i++) {
        if(check[i] === true) {
            continue;
        }
        team1.push(i);
        check[i] = true;
        BT(step+1, i);
        team1.pop();
        check[i] = false;
    }
}