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
for(let i=1; i<N; i++) {
    BT(0, 0, i);
}

console.log(minGap);

function BT(step, min, team1Num) {
    if(step === team1Num) {
        // 로직
        
        // 팀1의 abil 값 abil1 를 구함
        abil1 = 0;
        for(let j=0; j<team1.length; j++) {
            for(let k=0; k<team1.length; k++) {
                abil1 = abil1 + abil[team1[j]][team1[k]];
            }
        }
        // console.log("team1 : ", team1);
        // console.log("abil1 : ", abil1);
        
        // 팀2를 구함 (팀1에 속하지 않은 나머지 사람)
        team2 = person.filter(x => !team1.includes(x));
        
        // 팀1의 abil 값 abil1 를 구함
        abil2 = 0;
        for(let j=0; j<team2.length; j++) {
            for(let k=0; k<team2.length; k++) {
                abil2 = abil2 + abil[team2[j]][team2[k]];
            }
        }
        // console.log("team2 : ", team2);
        // console.log("abil2 : ", abil2);

        // console.log("------------------");

        // 양쪽팀의 abil 값의 차이를 구해서 minGap 갱신하기
        if(abil1 >= abil2) {
            minGap = Math.min(abil1 - abil2, minGap);
        } else {
            minGap = Math.min(abil2 - abil1, minGap);
        }

        return;
    }

    // 오름차순으로 고르도록 min 설정
    for(let i=min; i<N; i++) {
        if(check[i] === true) {
            continue;
        }
        team1.push(i);
        check[i] = true;
        BT(step+1, i, team1Num);
        team1.pop();
        check[i] = false;
    }
}


// 문제 접근 방식

// 이번 문제는 이전 문제와 다르게 인원을 반으로 나누지 않고
// 양팀을 구성하는 인원수가 차이나도 되므로,
// 각 팀이 최소 1명의 인원을 가져야함을 고려할 때,
// 팀 별로 가질 수 있원은 최대 1명에서 N-1명까지이다.

// 따라서 BT에 team1의 인원을 나타내는 team1Num 매개변수를 추가하여
// step === N/2 조건을 step === team1Num 로 변경하여
// team1을 이루는 인원이 1명부터 N-1명까지 모든 조합을 찾고,
// 그 조합 중에서 team2과 가장 abil 차이가 적은 값을 minGap에 저장한다.