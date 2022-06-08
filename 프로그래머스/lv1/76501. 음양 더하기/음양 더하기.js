function solution(absolutes, signs) {
  var answer = 123456789;

  let arr = new Array();

  let sum = 0;

  for (let i = 0; i < absolutes.length; i++) {
    // i번째 수가 음수일 경우, sum에 absolutes의 i번째 값을 뺌
    if (signs[i] === false) {
      sum -= absolutes[i];

      // i번째 수가 양수일 경우, sum에 absolutes의 i번째 값을 더함
    } else {
      sum += absolutes[i];
    }
  }

  answer = sum;

  return answer;
}

// 문제 풀이 접근 방식

// i번째 수와 i번째 수의 부호를 판단하고
// 전체 수를 누적하면 되는 쉬운 문제이다.
