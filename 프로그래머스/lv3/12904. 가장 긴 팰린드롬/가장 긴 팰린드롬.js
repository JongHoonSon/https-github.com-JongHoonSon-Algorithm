function solution(s) {
  var answer = 0;

  let maxLength = 0;

  // 부분 문자열의 길이 (문자열 s의 최대길이부터 1까지 1씩 감소)
  out: for (let i = s.length; i >= 1; i--) {
    // 부분문자열의 시작 위치 (i 값에 따라 가능한 범위)
    for (let j = 0; j <= s.length - i; j++) {
      // 맨앞의 요소와 맨 뒤의 요소를 비교하기 위해
      // 각 index를 저장함
      let front = j;
      let back = i + j - 1;

      while (true) {
        // 만약 front와 back이 같아졌거나(부분문자열의 길이가 홀수일 때 탐색 완료 시)
        // front가 1더 증가했으면 (부분문자열의 길이가 짝수일 때 탐색 완료 시)
        if (front === back || front - 1 === back) {
          // 찾은 부분문자열의 길이 i를 maxLength에 저장한 후
          // 모든 반복문을 빠져나옴
          maxLength = i;
          break out;

          // 만약 맨 앞의 문자와 맨 끝의 문자가 같으면
        } else if (s[front] === s[back]) {
          // 다음에 비교할 위치 조정
          front++;
          back--;

          // 만약 맨 앞의 문자와 맨 끝의 문자가 다르면
        } else if (s[front] !== s[back]) {
          // 다음 index에서 탐색하기 위해 이번 반복문을 종료
          break;
        }
      }
    }
  }

  answer = maxLength;

  return answer;
}

// 문제 풀이 접근 방식

// 3중 반복문을 이용해서 푸는 문제이다.

// 3중 반복문은 다음과 같이 이뤄진다.
// 1. 부분문자열의 길이의 범위
// 2. 부분문자열의 각 길이 별로 가능한 index 범위
// 3. 부분문자열의 맨앞부터 +1씩 이동한 위치의 값과
// 맨뒤부터 -1씩 이동한 위치의 값을 비교
