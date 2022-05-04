const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();
const inputArray = input[0].split(" ").map((i) => Number(i));

// console.log(inputArray);

const stack = [];
const answer = new Array(N).fill(0);

// answer의 마지막 부분부터 체크함
for (let i = N - 1; i >= 0; i--) {
  // answer의 i번째 인덱스가 아직 0이라면 (=오큰수를 찾지 못했다면) 반복함
  while (answer[i] === 0) {
    // stack에 들어있는 것이 없으면 (=i번 인덱스의 오른쪽의 수가 없으면)
    if (stack.length === 0) {
      // answer의 i번째 인덱스의 값으로 -1를 넣음
      answer[i] = -1;

      // 방금 answer값을 등록한 수를 stack에 push함
      stack.push(inputArray[i]);

      // stack에 들어있는 것이 있으면 (=i번 인덱스의 오른쪽의 수가 있으면)
    } else {
      // stack에 들어가 있는 수 (입력에서 i+1번째로 주어진 수의 오른쪽에 있는 수) 가
      // 입력에서 i+1번째로 주어진 수보다 작으면
      if (stack[stack.length - 1] <= inputArray[i]) {
        // (오큰수가 아니므로) 해당 수 삭제 (*아래서 추가설명)
        stack.pop();

        // stack에 들어가 있는 수 (입력에서 i+1번째로 주어진 수의 오른쪽에 있는 수) 가
        // 입력에서 i+1번째로 주어진 수보다 크면
      } else {
        // 스택의 가장 위에 있는 수
        // (입력에서 i+1번째로 주어진 수보다 크면서 거장 왼쪽에 있는 수 = 오큰수)
        // 를 answer에 넣음
        answer[i] = stack[stack.length - 1];

        // 방금 answer값을 등록한 수를 stack에 push함
        stack.push(inputArray[i]);
      }
    }
  }
}

console.log(answer.join(" ").trim());

// *에 대한 추가설명

// stack의 오른쪽에 본인보다 작은 수가 있다면, 해당 수를 stack에서 제외하는 이유는
// 현재 input의 마지막 인덱스부터 0번째 인덱스까지 answer값을 채워넣고 있는 과정에서
// 다음과 같은 상황이 발생하기 때문이다.

// 1번째 수를 1, 2번째 수를 20, 3번째 수를 3이라고 했을때

// 2번째 수의 오큰수를 찾는 과정에서 stack에 들어있는 3은
// 2번째 수인 20보다 작으므로 삭제해도 무방하다.
// 1번째 수의 오큰수를 구하는 과정에서 어차피 3번째 수인 3보다 2번째 수인 20을
// 택하게 되기 때문에 전혀 상관이 없기 때문이다.

// 이렇게 삭제를 반복하다가 stack의 길이가 0이되면
// 해당 수의 오큰수가 존재하지 않다고 판단하여, -1를 answer에 넣으면 되는 것이다.
