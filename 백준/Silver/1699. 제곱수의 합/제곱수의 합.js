const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

let N = +input;

let answer = DP(N);

console.log(answer);

function DP(x) {
  // arr의 i번째 index에는 i를 제곱수를 저장
  let arr = [];

  // 0부터 x(N)까지 반복하면서 arr에 넣음
  // (각 수는 1의 제곱의 덧셈으로 나타낼 수 있기 때문에,
  // 각 수의 값을 arr에 저장함)
  // (2는 1^2 + 1^2로 나타낼 수 있으므로 arr[2]에 2를 저장함)
  for (let i = 0; i <= x; i++) {
    arr.push(i);
  }

  // i는 1부터 x(N)까지 반복
  for (let i = 1; i <= x; i++) {
    // j는 1부터 i의 제곱근까지 반복
    for (let j = 1; j ** 2 <= i; j++) {
      // console.log("i : ", i);
      // console.log("j : ", j);
      // console.log("arr[i] : ", arr[i]);
      // console.log("arr[i-j**2]+1 : ", arr[i-j**2]+1);

      // 현재까지 구한 i의 최대 제곱수가 저장된 arr[i]과
      // 방금 구한 arr[i - j ** 2] + 1 과 비교하여
      // (arr[i - j ** 2] + 1는 j제곱수를 이용해서 i를 표현한 경우)
      // 더 작은 값으로 arr[i] 값 갱신
      arr[i] = Math.min(arr[i], arr[i - j ** 2] + 1);
    }
    // console.log("----------");
  }

  // N의 제곱수가 들어 있는 arr[N]을 pop하여 리턴함
  return arr.pop();
}
