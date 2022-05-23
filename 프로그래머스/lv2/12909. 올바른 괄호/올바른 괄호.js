function solution(s) {
  var answer = true;

  const stack = [];

  // 문자열 s의 각 문자에 대해 반복
  for (let i = 0; i < s.length; i++) {
    // 만약 문자가 "(" 이면 스택에 넣음
    if (s[i] === "(") {
      stack.push(s[i]);

      // 만약 문자가 ")" 이면 스택에서 하나를 뺌
    } else if (s[i] === ")") {
      // 스택의 길이가 0이면 (= 스택에 "("가 없다면)
      // answer에 false를 저장
      if (stack.length === 0) {
        answer = false;
        break;
      } else {
        stack.pop();
      }
    }
  }

  // 만약 스택은 잘 동작했는데 stack에 남은 것이 있다. (= "("이 더 많은 경우라서 짝이 맞아 떨어지지 않음)
  if (answer === true && stack.length !== 0) {
    // answer에 false를 저장
    answer = false;
  }

  return answer;
}

// 문제 풀이 접근 방식

// 괄호 열기를 만나면 스택에 저장하고,
// 괄호 닫기를 만나면 스택에서 값을 하나 지우는 방식으로 푸는 문제이다.
