function solution(n) {
  var answer = [];

  const numArr = [4, 1, 2];

  while (n) {
    // n을 3으로 나눈 나머지
    const rest = n % 3;

    // numArr rest를 index로 하는 요소의 값을 answer에 넣음
    answer.push(numArr[rest]);

    // 만약 n이 3으로 나눠 떨어지면
    if (n % 3 === 0) {
      // 3으로 나눈 후에 1을 더 뺌
      // 3진법은 3^n 마다 길이가 증가하는 반면
      // 124진수는 3n+1 마다 길이가 증가하기 때문에
      // (그저 현상이 그런것이므로 자세히 이해x)
      n = n / 3 - 1;
    } else {
      // 3으로 나눠 떨어지지 않으면 3으로 나누고 내림함
      n = Math.floor(n / 3);
    }
  }

  return answer.reverse().join("");
}

// 문제 풀이 접근 방식

// 3진법과 유사한 방식으로 숫자를 표시하는 124 나라의 숫자의 규칙성을 찾고
// 3진법과의 차이를 찾은 뒤에 푸는 방식이다.

// 이런 종류의 문제는 깊히 이해하려고 하지말고, 패턴을 찾는다는 느낌으로 접근하자
