function solution(bridge_length, weight, truck_weights) {
  var answer = 0;

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

  while (finishedAcrossCnt !== truckCnt) {
    // 1초 증가
    timer++;

    // 다리 위의 트럭을 1만큼 이동
    for (let i = 0; i < across.length; i++) {
      across[i].position += 1;
    }

    // 만약, 다리 위의 트럭 중에 가장 먼저 올라간 트럭이 다리 밖으로 나왔다면 (건너기 성공)
    if (across.length > 0) {
      if (across[0].position === bridge_length + 1) {
        acrossTruckWeights -= across[0].weight;
        across.shift();
        finishedAcrossCnt++;
      }
    }

    // 아직 대기 중인 트럭이 있고,
    // 현재 건너고 있는 트럭의 무게의 합과 대기 중인 트럭 중 첫번째 트럭의 무게의 합이
    // 다리가 견딜 수 있는 무게보다 같거나 낮은 경우
    // 새로 트럭을 추가함
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

  answer = timer;

  return answer;
}
