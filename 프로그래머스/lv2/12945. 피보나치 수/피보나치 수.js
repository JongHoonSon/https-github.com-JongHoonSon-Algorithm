function solution(n) {
  var answer = 0;

  let d = new Array(n + 1);

  d[0] = 0;
  d[1] = 1;

  for (let i = 2; i <= n; i++) {
    d[i] = (d[i - 1] + d[i - 2]) % 1234567;
  }

  answer = d[n] % 1234567;

  return answer;
}

// 문제 풀이 접근 방식

// 피보나치 수를 DP를 이용해 상향식으로 계산한 후,
// n번째 피보나치 수를 출력하면 되는 문제이다.
