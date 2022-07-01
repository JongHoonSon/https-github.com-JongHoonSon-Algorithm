function solution(numbers, target) {
  var answer = 0;

  // 0번째 인덱스, sum의 값은 0부터 시작
  DFS(0, 0);

  function DFS(index, sum) {
    // index가 numbers.length이고 (= 마지막 index + 1 이면)
    if (index === numbers.length) {
      // sum === target이면
      if (sum === target) {
        // answer + 1;
        answer++;
      }
      // 종료
      return;
    }

    // 다음 index를 값을 더하는 경우
    DFS(index + 1, sum + numbers[index]);

    // 다음 index의 값을 뺴는 경우
    DFS(index + 1, sum - numbers[index]);
  }

  return answer;
}

// 문제 풀이 접근 방식

// 입력으로 주어지는 배열 numbers의 각 원소 1번씩 더하거나 빼서
// 만들 수 있는 연산식에 대해서
// 입력으로 주어지는 target의 값과 연산식의 수를 구하는 문제이다.

// DFS를 이용해 모든 경우의 수를 체크하는데
// DFS는 numbers 배열의 index와, 현재 단계까지의 합산인 sum을 매개변수로 갖는다.

// 또, 각 DFS는 다음 index의 수를 + 한 경우와 - 한 경우를 각각 재귀호출한다.

// DFS의 종료조건은 index가 마지막 index +1 인 numbers.length와 값이 같을 경우이고,
// 종료 시에 sum의 값이 target과 같으면
// numbers 배열의 원소로 만든 연산식이 target과 값이 같은 것이므로
// answer의 값을 + 1 한다.

// 최종적으로 answer을 출력하면
// target과 값이 같은 numbers 배열의 원소로 만든 연산식의 수를 구할 수 있다.
