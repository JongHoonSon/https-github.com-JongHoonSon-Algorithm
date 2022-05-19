function solution(bridge_length, weight, truck_weights) {
  var answer = 0;

  let truckInfo = new Array(truck_weights.length);

  // 각 트럭의 무게와, 다리 상의 위치 값을 갖는 truckInfo 2차원 배열 생성,
  // 아직 다리 위에 올라간 트럭이 없으므로 위치 값은 0으로 한다.
  //  [--------------------] <- 길이 10짜리 다리라면
  // 0 1 2 3 4 5 6 7 8 9 10 11
  // 0 : 다리에 올라가기 이전
  // 11 : 다리를 지나간 직 후
  for (let i = 0; i < truck_weights.length; i++) {
    truckInfo[i] = [truck_weights[i], 0];
  }

  for (let i = 0; i < truck_weights.length; i++) {
    console.log("truckInfo[i][0]", truckInfo[i][0]);
  }

  let times = 0;

  let stack = [];

  // 대기 중인 트럭이 들어있는 truckInfo와
  // 다리 위에 있는 트럭인 stack이 아무것도 없을 때,
  // 즉, 모든 트럭이 다리를 건넜을 때 종료한다.
  while (truckInfo.length !== 0 || stack.length !== 0) {
    // 새로운 트럭을 다리 위에 올릴지 말지의 여부를 저장하는 flag 변수
    let pushFlag = false;

    // 만약 다리 위에 트럭이 하나도 없을 경우
    if (stack.length === 0) {
      // flag를 true로 변경
      pushFlag = true;

      // 만약 다리 위에 트럭이 있는 경우
    } else {
      // 모든 트럭을 1보 전진
      for (let i = 0; i < stack.length; i++) {
        stack[i][1] = stack[i][1] + 1;
      }

      // 만약 가장 선두의 트럭의 위치가 다리 밖(bridge_length + 1)이 됐을 경우
      if (stack[0][1] === bridge_length + 1) {
        // 해당 트럭을 다리 위의 트럭에서 제외함
        stack.shift();
      }

      // 현재 다리 위의 트럭의 무게의 합을 저장할 변수
      let sumWeight = 0;

      // 다리 위에 트럭이 있다면
      if (stack.length > 0) {
        // 각 트럭의 무게를 sumWeight에 누적함
        stack.forEach((el) => {
          sumWeight = sumWeight + el[0];
        });
      }

      // 대기 중인 트럭이 있다면
      if (truckInfo.length > 0) {
        // 다리 위의 트럭의 무게의 합과, 대기 중인 트럭 중에 첫번째 트럭의 무게의 합이
        // 다리가 견딜 수 있는 무게인 weight보다 작은지 확인함
        if (weight >= sumWeight + truckInfo[0][0]) {
          // 작다면, 새로 트럭을 다리 위에 올리기 위해 flag를 true로 변경함
          pushFlag = true;
        }
      }
    }

    // 만약 flag가 true라면
    if (pushFlag === true) {
      // 새로운 트럭을 truckInfo에서 빼서, 위치 값을 1로 수정한 뒤, stack에 넣음
      let newTruck = truckInfo.shift();
      newTruck[1] = newTruck[1] + 1;
      stack.push(newTruck);
    }

    // 매번 1초 동안 위의 과정을 진행한다.
    // (0초부터 시작)
    times++;
  }

  answer = times;

  return answer;
}

// 후기

// 스택을 활용한 구현 문제이다.
// 문제의 설명에 다리를 건너는데 드는 시간이 안나와있는데,
// 입력 예시를 보고 길이 n짜리 다리를 건너는데 n+1초가 걸린다는 것을 알게되었다.
// (따라서 길이 2짜리 다리를 건너는데 3초가 걸림, 0 -> 1 -> 2 -> 3)

// 문제 풀이 접근 방식

// 먼저 각 트럭의 무게와 매 초에 다리 상의 위치 값을 갖고 있는 truckInfo 2차원 배열을 만들었다.
// 각 truckInfo[i]는 [i번째 트럭의 무게, i번째 트럭의 다리 상의 위치] 값을 가진다.
// 아직 다리를 건너고 있지 않은 다리는 0, 다리를 모두 건넌 다리는 다리의 길이를 값으로 갖는다.

// 그 후 다음 과정을 반복한다.

// A. stack이 비어있다면 (다리 위에 트럭이 없다면), 대기 중인 트럭 중에 맨 앞 트럭을 빼서 stack에 넣는다. (새로운 트럭을 다리의 길이 상 1 위치에 놓는 과정)
// => 1초 소요

// B. stack에 트럭이 들어있다면 (다리 위에 트럭이 있다면), 각 트럭의 위치를 + 1 시킨 후, 다리의 밖에 도달한 트럭이 있는지 확인한다.
//      B-1. 다리의 밖에 도달한 트럭이 있다면, 다리 위의 트럭의 무게를 재서, 새로 트럭을 추가해도 되는지 판단한다.
//      B-2. 새로 추가해도 된다면, stack에 truckInfo의 첫번째 요소를 넣는다. (새로운 트럭을 다리의 길이 상 1 위치에 놓는 과정)
// => 1초 소요

// 위 과정을 truckInfo와 stack의 모든 요소가 없어질 때까지
// (= 대기 중인 트럭과 다리를 건너는 중인 트럭이 모두 없을 때까지, 즉 모든 트럭이 다리를 건널 때까지) 반복한다
