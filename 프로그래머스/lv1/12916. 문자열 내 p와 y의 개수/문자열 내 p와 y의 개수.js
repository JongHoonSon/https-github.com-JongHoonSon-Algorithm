function solution(s) {
  var answer = false;

  let cnt_p = 0;
  let cnt_y = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "p" || s[i] === "P") {
      cnt_p++;
    } else if (s[i] === "y" || s[i] === "Y") {
      cnt_y++;
    }
  }

  if (cnt_p === cnt_y) {
    answer = true;
  }

  return answer;
}

// 문제 풀이 접근 방식

// 입력으로 주어지는 문자열 s의 각 자릿수의 문자를 확인하여
// y와 Y의 등장횟수의 합이 p와 P의 등장횟수의 합과 같은지 확인하는 간단한 문제이다.
