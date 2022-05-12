function solution(N, number) {
  // 모든 요소를 Set으로 변경한 크기 9 짜리의 배열 memo 생성
  // memo의 i번째 인덱스에는 N을 i번 사용해서 만들 수 있는 연산의 결과 값이 저장되어 있음
  let memo = new Array(9).fill(0).map((el) => new Set());

  console.log("memo : ", memo);

  // 만약 구해야하는 number와 주어진 N이 같다면, N 1개로 number를 만들 수 있으므로 1 출력
  if (N === number) {
    return 1;
  } else {
    // memo의 1번 인덱스부터 8번 인덱스까지 사용
    // (문제 조건에서 연산을 최소 1번부터 최대 8번까지 진행하기 때문)
    for (let i = 1; i < 9; i++) {
      // N을 i번 사용한 연산의 결과를 저장하는 memo[i]에
      // i개의 N으로 이루어진 수를 넣음
      // ex) N을 3번 사용한 연산인 memo[3]에 333을 넣음
      memo[i].add(Number(String(N).repeat(i)));

      // memo의 i번째 인덱스의 값을 채우는 과정
      // memo[i]는 memo[j]와 memo[i-j]의 연산으로 이루어짐
      // ex) memo[4]는 memo[1]과 memo[3] 사이의 연산
      //               memo[2]과 memo[2] 사이의 연산
      //               memo[3]과 memo[1] 사이의 연산 의 조합임

      for (let j = 1; j < i; j++) {
        // N을 j번 써서 만들 수 있는 연산의 결과 값을 하나씩 사용
        // 이를 first라 부름
        for (let first of memo[j]) {
          // N을 i-j번 써서 만들 수 있는 연산의 결과 값을 하나씩 사용
          // 이를 second라 부름
          for (let second of memo[i - j]) {
            // first와 second의 사칙연산의 결과를 memo의 i번째 인덱스에 저장
            memo[i].add(first + second);
            memo[i].add(first - second);
            memo[i].add(first * second);
            memo[i].add(first / second);
          }
        }
      }

      // memo[i]에 대한 계산이 끝난 후,
      // 만약 memo[i] 안에 number가 들어있다면
      // 사용한 N의 횟수인 i를 리턴함
      if (memo[i].has(number)) return i;
    }

    // memo를 8번 인덱스까지 모두 채웠지만, 그 와중에 number인 수를 찾지 못했다면
    // -1 리턴
    return -1;
  }
}
