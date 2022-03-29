let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString();

input = +input;


// 자릿수 별로 문자를 나열하였을 때의 총 길이를 담은 배열
// ex) 0의 자리는 0, 1의자리는 1부터 9까지 합 9, 10의 자리는 10부터 99까지의 합 180
const partition = [];
partition.push(0);
partition.push(9);

// 각 구간 별 값을 구하는 공식 : 자릿수의 길이(i) * 9 * 10의 (i-1)제곱
for(let i=2; i<9; i++) {
    partition.push(i*9*(10**(i-1)));
}
// console.log(partition);

// input의 자릿수 찾기
let length;
for(let i=1; i<10; i++) {
    if(input < 10**i) {
        length=i;
        break;
    }
}
// console.log(length);

// 해당 자릿수의 전 자릿수까지 나열했을 때의 길이를 가져옴
// ex) input 이 198 일 경우, 자릿수가 세자리 이므로
// 두자릿 수까지 나열한 partition[0]과 partition[1]을 가져옴 
// while문을 도는 시간을 줄이기 위함

let totalLength = 0;
for(let i=length-1; i>=0; i--) {
    totalLength = totalLength + partition[i];
}
// console.log(totalLength);

// 본인의 자릿수의 시작지점(i)에서 1씩 증가하며 자신까지 도달하면서
// totalLength에 해당 숫자의 길이(length)을 누적함
let i = 10**(length-1);
while(i<=input) {
    totalLength = totalLength + length;
    i++;
}

console.log(totalLength);