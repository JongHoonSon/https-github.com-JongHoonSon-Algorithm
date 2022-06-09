function solution(s) {
  const answer = [];

  // s 배열에 들어있는 문자열 _s
  for (const _s of s) {
    // 문자열 _s를 배열로 변경
    const arr = _s.split("");

    // 110을 제거한 횟수
    let removeCnt = 0;

    // 110을 제거할 때 사용할 스택
    let stack = [];

    // 과정1. arr에서 '110' 제거하기

    // arr을 처음부터 끝까지 반복
    for (let i = 0; i < arr.length; i++) {
      stack.push(arr[i]);

      // 스택의 길이가 3 이상이라면
      if (stack.length > 2) {
        // 최근 들어온 3개가 110인지 확인
        if (
          stack[stack.length - 1] === "0" &&
          stack[stack.length - 2] === "1" &&
          stack[stack.length - 3] === "1"
        ) {
          // 110일 경우 스택에서 삭제
          for (let j = 0; j < 3; j++) {
            stack.pop();
          }
          removeCnt++;
          continue;
        }
      }
    }

    // 과정2. 스택에서 0을 찾고, 0의 뒤쪽에 110을 제거한만큼 붙혀넣기

    // 만약 제거된 110이 없다면, 입력 그대로가 정답이 됨
    if (!removeCnt) {
      answer.push(_s);

      // 제거된 110이 있다면
    } else {
      const list = [];
      const keyword = "110";

      // 스택의 뒤쪽부터 하나씩 확인하며 0을 찾음
      while (stack.length) {
        // 스택의 마지막 요소
        const lastValue = stack.pop();

        // 마지막 요소가 0 이면
        if (lastValue === "0") {
          // 스택에 도로 넣고 종료
          stack.push(lastValue);
          break;
        }

        // 마지막 요소가 0이 아니면,
        // list에 push함
        // list에는 스택의 마지막거 부터 들어가기 때문에 스택이 reverse된 형태임
        list.push(lastValue);
      }

      // 110이 제거된 만큼 스택에 push함
      // (현재 스택은 110을 제거하고 남은 문자열에서 맨 앞부터 뒤에서 0이 처음 등장할 때까지의 부분 문자열, 나머지는 list에 역순으로 들어가 있음)
      while (removeCnt) {
        stack.push(...keyword);
        removeCnt--;
      }

      // 스택에 list를 reverse하여 push함
      stack.push(...list.reverse());

      // 현재 _s 문자열로 새로 만든 문자열 result를 answer에 push 함
      const result = stack.join("");

      answer.push(result);
    }
  }

  return answer;
}

// 후기

// 문제를 직접 풀다가 시간초과가 발생하여 구글링을 통해 답을 찾아보았다.

// 문제 풀이 접근 방식

// 일단 주어진 문자열에서 "110" 에 해당하는 문자열을 제거해야하는데,
// 이를 반복문을 통해 제거하면 100만 x 100만의 시간이 소요된다.
// 이를 선형적으로 제거하기 위해 stack을 사용한다

// 예를 들어 1011001 이라는 문자열이 있었다면
// 110은 1개 존재하고, 위치는 11'110'01 이다.

// 만약 이를 반복문으로 제거한다면
// 먼저 11'110'01 에서 110을 제거해서 1101이 된다.
// 또 다시 처음부터 반복해서 '110'1 에서 110을 제거하여 1이 된다.
// 이중 반복문을 사용하므로 O(n^2) 시간이 걸리는데 최대 100만 x 100만이므로
// 최대 1조 번 동작해야해서 시간초과가 필연적으로 발생한다.

// 이를 stack으로 제거한다면
// 문자열의 맨앞부터 스택에 넣고 110이 생길 경우 해당 수를 pop하면 된다.
// 스택에 순서대로 넣는다면
// 1 -> 11 -> 111 -> 1111 -> 11'110' -> (110 발견, pop 수행) -> 11
// -> 110 -> (110 발견, pop 수행) -> "" -> 1
// 이렇게 110이 발견될 때 마다 즉각적으로 제거하므로, O(n) 시간 안에 동작한다

// 이렇게 110을 제거했다면, 제거한 횟수를 기억하고 있다가
// 남은 문자열(stack에 남은 값을 reverse해야 나옴)의 뒤에서부터 앞으로 탐색해서
// 0이 나올 경우 해당 0의 뒤에 '110'을 제거한 횟수만큼 붙혀넣으면 된다.
