function solution(s) {
  var answer = "";

  let middleIndex = Math.floor(s.length / 2);

  if (s.length % 2 === 0) {
    answer = answer + s[middleIndex - 1] + s[middleIndex];
  } else {
    answer = s[middleIndex];
  }

  return answer;
}
