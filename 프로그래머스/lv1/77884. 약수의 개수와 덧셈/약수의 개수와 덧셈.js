function solution(left, right) {
  var answer = 0;

  let total = 0;

  // left부터 right까지의 모든 수를 하나씩 확인
  for (let i = left; i <= right; i++) {
    let cnt = 0;

    // 각 수 i의 약수인 j의 갯수 확인
    for (let j = 1; j <= i; j++) {
      // j가 i의 약수라면
      if (i % j === 0) {
        // 갯수 추가
        cnt++;
      }
    }

    // i의 약수의 갯수가 짝수이면 i를 더함
    if (cnt % 2 === 0) {
      total += i;

      // i의 약수의 갯수가 홀수이면 i를 뺌
    } else {
      total -= i;
    }
  }

  answer = total;

  return answer;
}
