function solution(n, costs) {
  var answer = 0;

  // 다리를 가장 가격이 저렴한 것부터 오름차순으로 정렬한다.
  costs.sort((a, b) => a[2] - b[2]);

  console.log(costs);

  // 각 섬이 다리로 연결되었는지 여부를 저장할 배열이다.
  let finished = new Array(n).fill(false);

  // 각 다리가 사용되었는지 여부를 저장할 배열이다.
  let usedBridge = new Array(costs).fill(false);

  // 연결된 다리의 총액을 저장할 변수이다.
  let totalCost = 0;

  // 먼저 가장 저렴한 다리를 연결시킨다.
  // (연결된 섬 a,b에 연결 처리를 하고, 사용된 다리 0번째 다리를 사용했다는 처리를 한다.)
  let [a, b, cost] = costs[0];
  finished[a] = true;
  finished[b] = true;
  totalCost = cost;
  usedBridge[0] = true;

  // 사용한 다리의 갯수를 저장하는 변수이다.
  // 섬의 갯수보다 -1이 되면 모든 섬이 연결되었다고 판단할 수 있다.
  let bridgeCnt = 1;

  // 섬의 갯수보다 -1인 갯수의 다리가 연결될 때까지 반복
  while (bridgeCnt < n - 1) {
    // 모든 다리에 대해 반복
    for (let i = 0; i < costs.length; i++) {
      // 만약 다리가 사용된 다리라면, 넘어감
      if (usedBridge[i] === true) {
        continue;
      }

      // 사용되지 않은 다리일 경우, 해당 다리의 정보를 저장함
      let [a, b, cost] = costs[i];
      console.log("a, b, cost", a, b, cost);

      // 만약 해당 다리가, 이미 연결된 섬과 연결되지 않는 섬을 잇는 다리이라면 (= 부분 사이클을 만들지 않기 위한 조건)
      if (
        (finished[a] === true && finished[b] === false) ||
        (finished[a] === false && finished[b] === true)
      ) {
        // 해당 다리를 사용함
        finished[a] = true;
        finished[b] = true;
        totalCost = totalCost + cost;
        usedBridge[i] = true;
        bridgeCnt++;

        // 다시 제일 싼 다리부터 사용여부를 결정하기 위해 반복문 종료
        break;
      }
    }
  }

  // 다리의 총액 저장
  answer = totalCost;

  return answer;
}

// 문제 풀이 접근 방식

// 주어진 다리를 cost 순으로 정렬하여, 먼저 가장 저렴한 다리를 사용하고

// 그 이후 나머지 다리에 대해 반복하면서,
// 해당 다리가 이미 연결된 섬와 연결되지 않은 섬를 잇는 다리라면 해당 다리를 사용한다.
// (이미 연결된 섬과 연결되지 않은 섬을 잇는 다리인지 체크하는 이유는, 모든 섬이 연결되어야 하기 때문이다.)
// (섬이 1, 2, 3, 4, 5로 총 5개가 존재한다고 했을 때,
// 1-2, 3-4-5 식으로 끊기고 서로만 연결되는 것을 방지함)

// 이후 모든 섬이 연결될 때까지 위 과정을 반복한다.
// (모든 섬이 연결되려면 섬의 갯수 - 1개의 다리가 필요하다는 것을 감안)
