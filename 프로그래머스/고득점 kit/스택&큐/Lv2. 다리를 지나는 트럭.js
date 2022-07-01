function solution(bridge_length, weight, truck_weights) {
  var answer = 0;

  // 1. 각 트럭의 다리 상에서의 위치와 무게를 갖고 있는 truckInfo 배열 생성
  let truckInfo = new Array();

  for (let i = 0; i < truck_weights.length; i++) {
    truckInfo[i] = { position: 0, weight: truck_weights[i] };
  }

  // console.log(truckInfo);

  let finishedAcrossCnt = 0;
  let truckCnt = truck_weights.length;
  let timer = 0;
  let across = [];

  let acrossTruckWeights = 0;

  // 2. 다리를 건넌 트럭의 수가 전체 트럭의 수와 같지 않다면 반복
  // (같아지면 반복 종료)
  while (finishedAcrossCnt !== truckCnt) {
    // 1초 증가
    timer++;

    // 3. 다리 위의 트럭을 1만큼 이동
    for (let i = 0; i < across.length; i++) {
      across[i].position += 1;
    }

    // 4. 만약, 다리 위의 트럭 중에 가장 먼저 올라간 트럭이
    // 다리 밖으로 나왔다면 (건너기 성공)

    // - 건너는 중인 트럭의 무게에서 해당 트럭의 무게 제외
    // - 건너는 중인 트럭의 배열에서 해당 트럭 삭제
    // - 건너기를 완료한 트럭의 수 추가
    if (across.length > 0) {
      if (across[0].position === bridge_length + 1) {
        acrossTruckWeights -= across[0].weight;
        across.shift();
        finishedAcrossCnt++;
      }
    }

    // 5. 아직 대기 중인 트럭이 있고,
    // 현재 건너고 있는 트럭의 무게의 합과 대기 중인 트럭 중 첫번째 트럭의 무게의 합이
    // 다리가 견딜 수 있는 무게보다 같거나 낮은 경우
    // 새로 트럭을 추가함

    // - 새로운 트럭을 대기열에서 뽑음
    // - 새로운 트럭의 위치를 다리의 1 위치에 놓음
    // - 건너는 중인 트럭의 배열에서 새로운 트럭 추가
    // - 건너는 중인 트럭의 무게에서 새로운 트럭의 무게 추가
    if (truckInfo.length > 0) {
      if (acrossTruckWeights + truckInfo[0].weight <= weight) {
        let newTruck = truckInfo.shift();
        newTruck.position = 1;
        across.push(newTruck);
        acrossTruckWeights += newTruck.weight;
      }
    }

    // console.log("timer : ", timer);
    // console.log(across);
  }

  // 6. 모든 트럭이 건너기를 완료한 순간의 시간을 출력
  answer = timer;

  return answer;
}
