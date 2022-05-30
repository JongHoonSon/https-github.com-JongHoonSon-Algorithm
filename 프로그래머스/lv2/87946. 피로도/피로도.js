function solution(k, dungeons) {
  var answer = -1;

  let results = [];

  // 특정 던전을 탐험했는지 여부를 체크하는 check 배열
  let check = new Array(dungeons.length).fill(false);

  // 던전을 방문한 순서를 기록하는 배열
  let path = [];

  // BT 수행
  // 매개변수
  // 0 : 탐험한 던전 수
  // k : 현재 피로도
  BT(0, k);

  function BT(step, k) {
    // BT를 더 진행할 수 있는 지 (현재 상황에서 다른 던전을 더 탐험할 수 있는지) 판단
    let canGo = false;

    // 모든 던전에 대해서
    for (let i = 0; i < dungeons.length; i++) {
      // 아직 방문하지 않은 던전 i에 대해서 (check[i] === false)
      // 해당 던전을 방문하기 위한 최소 필요 피로도가 현재 내 피로도 보다 같거나 작으면 (k >= dungeons[i][0])
      if (check[i] === false && k >= dungeons[i][0]) {
        // 더 탐험을 할 수 있으므로 canGo를 true로 변경함
        canGo = true;
        break;
      }
    }

    // 만약 canGo가 false인 경우
    // 1. 남은 던전 중에서 내 피로도보다 최소 필요 피로도가 더 작은 던전이 없거나
    // 2. 모든 던전에 대해 다 탐방한 경우
    if (canGo === false) {
      // 현재까지 방문한 던전의 경로 path를 results에 넣고 종료
      results.push(path.join(""));
      return false;

      // canGo가 true인 경우
    } else {
      // 다음에 방문할 던전을 찾음
      for (let i = 0; i < dungeons.length; i++) {
        if (check[i] === true) {
          continue;
        }

        // 아직 방문하지 않았고(위의 조건에 걸리지 않음)
        // 해당 던전의 최소 필요 피로도보다 내 피로도가 같거나 더 높으면
        if (k >= dungeons[i][0]) {
          // 해당 던전 방문
          check[i] = true;
          path.push(i);
          BT(step + 1, k - dungeons[i][1]);
          path.pop();
          check[i] = false;
        }
      }
    }
  }

  let maxLength = 0;

  // 던전을 방문하는 모든 방법의 경로 중에서
  // 가장 긴 경로의 값을 maxLength에 저장
  for (let i = 0; i < results.length; i++) {
    if (maxLength < results[i].length) {
      maxLength = results[i].length;
    }
  }

  console.log(results);

  // answer에 maxLength 저장
  answer = maxLength;

  return answer;
}

// 문제 풀이 접근 방식

// BT를 이용해 완전 탐색을 할 경우 시간 복잡도는 O(n^n)이다.
// dungeons의 길이가 최대 8이므로 8^8 = 16777216(천만) 이므로
// 시간복잡도 상에서 BT를 이용해서 풀어도 문제가 없다.

// 따라서 모든 던전에 대해 피로도를 고려하면서 BT를 수행하면서
// 방문할 수 있는 던전의 경로의 가짓수를 모두 찾고,
// 그 중 가장 긴 경로의 길이를 출력하면 된다.
