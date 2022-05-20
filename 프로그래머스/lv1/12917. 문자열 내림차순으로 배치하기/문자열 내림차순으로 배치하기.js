function solution(s) {
  var answer = "";

  let arr = s.split("");

  arr.sort((a, b) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });

  answer = arr.join("");

  return answer;
}

// 후기

// 문자열을 이루는 문자를 기준으로 내림차순으로 정렬하는 쉬운 문제였다.
