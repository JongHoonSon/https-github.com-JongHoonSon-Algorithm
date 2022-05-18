function solution(a, b) {
  var answer = 0;

  let sum = 0;

  if (a > b) {
    let temp = a;
    a = b;
    b = temp;
  }

  for (let i = a; i <= b; i++) {
    sum = sum + i;
  }

  answer = sum;

  return answer;
}

// 문제 풀이 접근 방식

// 두 숫자 a, b를 입력 받아서
// a부터 b까지의 모든 수의 합을 출력하면 된다.
