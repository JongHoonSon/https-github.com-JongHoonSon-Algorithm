function solution(s) {
  var answer = -1;

  let sArr = s.split("");

  let stack = [];

  for (let i = 0; i < sArr.length; i++) {
    stack.push(sArr[i]);
    if (stack.length > 1) {
      if (stack[stack.length - 2] === stack[stack.length - 1]) {
        stack.pop();
        stack.pop();
      }
    }
  }

  if (stack.length === 0) {
    answer = 1;
  } else {
    answer = 0;
  }

  return answer;
}

// 문제 풀이 접근 방식

// 주어진 문자열을 앞에서부터 한 문자씩 stack에 넣은 후,
// stack에 마지막에 들어온 문자와 같은 문자가 들어온 경우(=연속해서 같은 문자가 들어온 경우),
// 해당 문자 2개를 pop하는 방식으로 동작시킨다.

// 위 처럼 동작하게 설계한 후, 문자열의 모든 문자를 stack에 넣은 이후
// stack에 아무것도 남아 있지 않다면 => 짝지어 제거하기 성공 (1 리턴)
// stack에 남아있는 것이 있다면 => 짝지어 제거하기 실패 (0 리턴)
// 을 하면 된다.
