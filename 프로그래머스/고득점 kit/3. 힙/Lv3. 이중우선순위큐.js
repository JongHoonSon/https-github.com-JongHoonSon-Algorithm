function solution(operations) {
  var answer = [];

  let stack = [];

  // 1. 모든 명령어에 대해 반복
  for (let i = 0; i < operations.length; i++) {
    // command는 명령어
    // value는 값
    let [command, value] = operations[i].split(" ");

    // 2. 명령어가 I라면
    if (command === "I") {
      // value를 스택에 넣음
      stack.push(+value);

      // 3. 명령어가 D이고
    } else if (command === "D") {
      // 값이 1이라면
      if (+value === 1) {
        // 스택의 최댓값(오름차순으로 정렬되어 있으므로 마지막 원소의 값)을 꺼냄
        if (stack.length > 0) {
          stack.pop();
        }

        // 값이 -1이라면
      } else if (+value === -1) {
        // 스택의 최솟값(오름차순으로 정렬되어 있으므로 첫번째 원소의 값)을 꺼냄
        if (stack.length > 0) {
          stack.shift();
        }
      }
    }

    // 4. 스택을 오름차순으로 정렬함
    if (stack.length > 1) {
      stack.sort((a, b) => a - b);
    }
  }

  // 모든 명령어에 대한 처리가 끝난 후,

  // 5. 스택의 길이가 0이면
  // [0, 0] 리턴
  if (stack.length === 0) {
    answer = [0, 0];

    // 6. 스택의 길이가 1이상이면
    // [최댓값, 최솟값] 리턴
  } else {
    answer = [stack[stack.length - 1], stack[0]];
  }

  return answer;
}
