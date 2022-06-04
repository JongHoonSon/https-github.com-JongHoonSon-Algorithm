function solution(A, B) {
  var answer = -1;

  // A팀과 B팀의 선수들을 실력순으로 정렬
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  let wins = 0;
  let indexA = 0;
  let indexB = 0;

  while (true) {
    // 만약 B팀이 indexB의 선수가 A팀의 indexA 선수를 이길 수 있다면
    if (B[indexB] > A[indexA]) {
      // 두팀 다 다음 사람으로 넘어감
      indexA++;
      indexB++;

      // B팀 승리 횟수 1증가
      wins++;

      // B팀이 이길 수 없다면,
      // B팀의 더 강한 사람으로 이동 (실력 순으로 정렬되어 있기 때문에)
    } else {
      indexB++;
    }

    // B팀의 모든 선수에 대해 확인하였으면 반복문 종료
    if (indexB === B.length) {
      break;
    }
  }

  answer = wins;

  return answer;
}

// 후기

// 레벨 3짜리 문제이지만, 굉장히 쉬웠다. 문제 설명만 어려울 뿐 사실상 필요한 로직은 1~2레벨 수준이다.

// 문제 풀이 접근 방식

// 문제에서는 A팀은 이미 경기 순서가 정해졌고, B팀이 A팀과 맞써 싸워 최대한 많이 이기는 경우를 요한다.
// 처음에는 A팀의 경기 순서를 고정하고 풀어야하나 싶었지만,
// 실제로 A팀의 1명과 B의 1명이 싸우고, 다음 경기와는 이전 경기는 전혀 상관이 없는 독립적인 수행이다.
// (특정 선수가 연승할 수 있거나 그러한 것이 아니기 때문)

// 따라서 A팀의 경기 순서를 깡그리 무시하고,
// A팀의 선수들의 power와
// B팀의 선수들의 power를 오름차순으로 정렬하고

// 양쪽의 맨 앞부터 확인하면서
// A[indexA]를 이길 수 있는 B[indexB]를 발견할 때까지 indexB를 증가시키고,
// A[indexA]를 이길 수 있는 B[indexB]를 발견하면,
// indexA와 indexB를 모두 증가시키고, B팀이 이긴 경기 수인 wins를 1 증가시킨다.

// 이 것을 B팀의 모든 선수를 확인할 때까지 반복하면
// B팀이 이길 수 있는 경기 수를 구할 수 있다.
