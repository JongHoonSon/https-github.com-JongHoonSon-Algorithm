function solution(priorities, location) {
  var answer = 0;

  // key로 index값을, value로 값을 갖는 새로운 배열을 생성
  let printStack = new Array(priorities.length);

  for (let i = 0; i < priorities.length; i++) {
    printStack[i] = { key: i, value: priorities[i] };
  }

  // console.log(printStack);

  // 몇번째 출력인지 카운트하는 변수
  let cnt = 1;

  // 프린트 목록인 printStack이 빌때까지 반복
  while (printStack.length > 0) {
    // 프린트 목록의 가장 앞의 원소를 빼서 item에 저장
    let item = printStack.shift();

    // 가장 큰 값인지 아닌지를 기록하는 변수
    let mostBigNum = true;

    // 나머지 모든 프린트 항목에 대해서
    for (let i = 0; i < printStack.length; i++) {
      // 방금 뺀 원소인 item보다 값이 큰 원소가 있다면
      if (printStack[i].value > item.value) {
        // mostBigNum를 fale로 변경
        mostBigNum = false;

        // 반복문 종료
        break;
      }
    }

    // item이 프린트 목록에서 값이 가장 큰 원소였다면
    if (mostBigNum === true) {
      // target의 index인 location과 item의 key값(priorities 상의 index 값)이 같다면
      if (item.key === location) {
        // answer에 몇번째 출력인지를 기록하는 cnt를 answer에 저장하고
        answer = cnt;

        // 종료함
        break;
      }

      // 아닌 경우 몇번째 출력인지를 기록하는 cnt의 값을 +1함
      cnt++;

      // item이 프린트 목록에서 값이 가장 큰 원소가 아니었다면
    } else {
      // printStack에 다시 넣음 (끝에 넣음)
      printStack.push(item);
    }
  }

  // 최종적으로 정답 출력
  return answer;
}

// 문제 풀이 접근 방식

// priorities로 shift와 push를 수행하면, 기존의 index 값이 바뀌어
// location의 값을 index로 갖는 원소가 언제 출력되는지 파악할 수 없으므로

// key로 priorities[i]의 index인 i, value로 priorities[i]를 갖는 새로운 배열 printStack을 만들고,
// 해당 배열의 맨 앞의 원소를 shift로 빼서

// 나머지 원소보다 큰지 확인하고,

//   1-1. 나머지 원소보다 크다면
//     해당 원소의 key값이 location과 같은지 확인하고,
//       같다면(정답을 찾음)
//       몇번째 출력인지를 answer에 저장함
//       다르다면
//       몇번째 출력인지를 기록함 (+1)

//   1-2. 나머지 원소보다 작다면
//     해당 원소를 다시 printStack에 push함
