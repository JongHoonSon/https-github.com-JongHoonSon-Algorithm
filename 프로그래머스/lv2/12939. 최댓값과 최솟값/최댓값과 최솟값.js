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
