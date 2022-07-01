function solution(priorities, location) {
  var answer = 0;

  let cnt = 0;

  let prioritiesLength = priorities.length;

  let printedHistory = [];

  // 1. 각 인쇄물에 대해 입력된 순서를 index,
  // 우선 순위를 value로 갖는 객체 배열 priorities 생성
  // 여기서 priorities는 인쇄물의 대기열을 의미
  for (let i = 0; i < priorities.length; i++) {
    priorities[i] = { index: i, value: priorities[i] };
  }

  console.log(priorities);

  // 2. 우선 순위가 가장 높은 인쇄물의 우선 순위를 max에 저장
  let max = getMax(priorities);

  // 3. 인쇄된 인쇄물의 수(cnt)가 전체 인쇄물의 갯수와 같지 않다면 반복
  // (같아지면 반복 종료)
  while (cnt !== prioritiesLength) {
    // 4. 만약 대기열에서 맨 앞에 있는 인쇄물의 우선 순위가
    // 전체 인쇄물의 가장 높은 우선 순위인 max와 같다면,
    // 해당 인쇄물의 index를 인쇄 완료 목록에 추가하고
    // 대기열에서 삭제하고,
    // 인쇄한 인쇄물의 갯수를 늘림
    if (priorities[0].value === max) {
      printedHistory.push(priorities[0].index);
      priorities.shift();
      cnt++;

      // 5. 남은 인쇄물 중에서 다음 max 계산
      max = getMax(priorities);

      // 6. 만약 대기열에서 맨 앞에 있는 인쇄물의 우선 순위가
      // 전체 인쇄물의 가장 높은 우선 순위인 max와 같지 않다면,
    } else {
      // 7. 대기열의 맨 앞에 있는 인쇄물을 뺴서, 맨 뒤에 넣음
      priorities.push(priorities.shift());
    }
  }

  console.log(printedHistory);

  // 내가 요청한 인쇄물의 index인 location을
  // 인쇄한 순서대로 인쇄물의 index를 갖고 있는
  // printedHistory 배열에서 찾아서 i+1를 출력하면 된다.

  // (ex) location이 두번째로 출력되었다면,
  // printedHistory의 1번 index에 들어있기 때문)
  for (let i = 0; i < printedHistory.length; i++) {
    if (printedHistory[i] === location) {
      answer = i + 1;
      break;
    }
  }

  return answer;
}

// 전체 배열의 우선 순위 중에서 가장 큰 우선 순위를 반환하는 함수
function getMax(arr) {
  let max = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i].value) {
      max = arr[i].value;
    }
  }

  return max;
}
