let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

input = +input;

// 자릿수 별로 문자를 나열하였을 때의 총 길이를 담은 배열
// ex) 0의 자리는 0, 1의자리는 1부터 9까지 합 9, 10의 자리는 10부터 99까지의 합 180
const partition = [];
partition.push(0);
partition.push(9);

// 각 구간 별 값을 구하는 공식 : 자릿수의 길이(i) * 9 * 10의 (i-1)제곱
for (let i = 2; i < 9; i++) {
  partition.push(i * 9 * 10 ** (i - 1));
}
// console.log(partition);

// input의 자릿수 찾기
let length;
for (let i = 1; i < 10; i++) {
  if (input < 10 ** i) {
    length = i;
    break;
  }
}
// console.log(length);

// 해당 자릿수의 전 자릿수까지 나열했을 때의 길이를 가져옴
// ex) input 이 198 일 경우, 자릿수가 세자리 이므로
// 두자릿 수까지 나열한 partition[0]과 partition[1]을 가져옴
// while문을 도는 시간을 줄이기 위함

let totalLength = 0;
for (let i = length - 1; i >= 0; i--) {
  totalLength = totalLength + partition[i];
}
// console.log(totalLength);

// 본인의 자릿수의 시작지점(i)에서 1씩 증가하며 자신까지 도달하면서
// totalLength에 해당 숫자의 길이(length)을 누적함
let i = 10 ** (length - 1);
while (i <= input) {
  totalLength = totalLength + length;
  i++;
}

console.log(totalLength);

// 후기

// 시간 초과가 났기 때문에 각 자릿수별로 모든 수를 나열했을 때의 길이를
// 미리 구해서 배열에 담아놓고 사용하면 좀 더 수월할 것이라 생각했고,
// 그런 방식으로 진행했더니 더 깔끔하게 떨어졌다.
// 총 0.15초 안에 연산이 마무리 되어야하는데
// 만일 9천9백9십9만 9999 라는 숫자가 있을 때
// 1천만 까지의 배열에 1천만부터 9천9백9십9만 9999 까지 ++ 해가면서
// 총 8자리 수를 누적시킬 경우 약 9000천만번의 연산이 필요한데
// 해당 연산을 어떻게 0.15초 안에 처리하는지는 의문이다.

// 좀 더 좋은 방법이 있을 것 같아 찾아보니
// 굳이 ++해가면서 누적시킬필요 없이
// 해당 자릿수의 수의 길이에 시작지점과 구할지점까지의 값을 차이를 구하면 되는 것이었다.
//  ex) 1024를 구한다면, 1000까지는 배열에서 꺼내오고
//      1000부터 1024까지는 ++하면서 매번 4씩 누적시키는 것이 아니라
//      (1024 - 1000) * 4 해주면 되는 것이었다.

// 더욱 쉬운 방법이 있는데 너무 성급히 시작한 것 같아 아쉽다. 좀 더 꼼꼼하게 생각해야겠다.
