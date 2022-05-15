function solution(arr, divisor) {
  var answer = [];

  // 0으로 나누어 떨어지는 수를 answer에 push
  arr.forEach((el) => {
    if (el % divisor === 0) {
      answer.push(el);
    }
  });

  // answer의 길이가 0이면, -1 push
  if (answer.length === 0) {
    answer.push(-1);
    // answer의 길이가 1이상이면, 정렬
  } else {
    answer.sort((a, b) => a - b);
  }

  return answer;
}
