function solution(s) {
  var answer = "";

  let min = Infinity;
  let max = -Infinity;

  let s_arr = s.split(" ");

  console.log(s_arr);

  for (let i = 0; i < s_arr.length; i++) {
    if (+s_arr[i] > max) {
      max = s_arr[i];
    }

    if (+s_arr[i] < min) {
      min = s_arr[i];
    }
  }

  answer = `${min} ${max}`;

  return answer;
}

// 문제 풀이 접근 방식

// 문제에서 주어진 문자열을 split을 이용해 배열로 만든 뒤,
// 각 배열 요소를 확인하며 max값과 min값을 갱신하면 되는 문제이다.
