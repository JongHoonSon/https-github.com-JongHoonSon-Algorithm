function solution(routes) {
  var answer = 0;

  // 모든 차량을 고속도로에서 빠져나가는 순으로 오름차순 정렬함
  routes.sort((a, b) => a[1] - b[1]);

  // 각 차량이 카메라에 찍혔는지 여부를 저장할 배열
  let checkPictured = new Array(routes.length).fill(false);

  // 빠져나간 차량의 수를 저장할 변수 (로직 내에서는 사용 안되나, 설명을 위해 삭제하지 않음)
  let outCarsCnt = 0;

  // 사용된 카메라의 수를 저장할 변수
  let cameraCnt = 0;

  // 모든 차량에 대해 반복하면서
  for (let i = 0; i < routes.length; i++) {
    // 만약 해당 차량이 이미 카메라에 찍힌 적이 있다면 넘어감
    if (checkPictured[i] === true) {
      continue;
    }

    // 카메라에 찍히지 않은 차량 중에서 시간 상으로 가장 일찍 고속도로를 나가게 될 차량의
    // 고속도로에 진입한 시간과 나간 시간을 저장함
    let [entryTimeI, outTimeI] = routes[i];

    // 차량 i가 카메라에 찍힌 것으로 설정함.
    checkPictured[i] = true;

    // 나간 차량의 수를 늘림 (사용되지 않음)
    outCarsCnt++;

    // 해당 차량이 나간 시점에 카메라를 설치했다고 가정하여 카메라의 수를 1개 늘림
    cameraCnt++;

    // 나머지 차량에 대해서
    for (let j = 0; j < routes.length; j++) {
      // 방금 나간 차량이랑 같은 차량이면 넘어감
      if (i === j) {
        continue;
      }

      let [entryTimeJ, outTimeJ] = routes[j];
      // 방금 나간 차량 i의 나간 시점보다 차량 j의 입장 시간이 더 빨랐다면
      if (entryTimeJ <= outTimeI && checkPictured[j] === false) {
        // 차량 j가 카메라에 찍힌 것으로 설정함.
        checkPictured[j] = true;

        // 나간 차량의 수를 늘림 (사용되지 않음)
        outCarsCnt++;
      }
    }
  }

  // 최종적으로 카메라의 수를 저장
  answer = cameraCnt;

  return answer;
}

// 문제 풀이 접근 방식

// 각 차량을 고속도로에서 빠져나가는 순으로 정렬하고,
// 각 차량이 고속도로에서 빠져나갈 때, 해당 차량이 이전에 카메라에 찍힌 적이 없다면,
// 해당 차량이 나가는 시점에 카메라를 설치하고,
// 다른 차량들의 입장 시간을 탐색하면서 해당 카메라로 찍을 수 있는 차량을 모두 찍은 것으로 처리한다.
// 위 과정을 모든 차량이 카메라에 찍힐 때까지 반복하면 된다.
