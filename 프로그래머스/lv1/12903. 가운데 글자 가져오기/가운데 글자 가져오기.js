function solution(s) {
  var answer = "";

  // 문자열 s의 가운데 index를 구하고,
  let middleIndex = Math.floor(s.length / 2);

  // 문자열의 길이가 짝수이면
  if (s.length % 2 === 0) {
    // 가운데 -1과 가운데를 answer에 넣음
    answer = s[middleIndex - 1] + s[middleIndex];

    // 홀수이면
  } else {
    // 가운데를 answer에 넣음
    answer = s[middleIndex];
  }

  return answer;
}
