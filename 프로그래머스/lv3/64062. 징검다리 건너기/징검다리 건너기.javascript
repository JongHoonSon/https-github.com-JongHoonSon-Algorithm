function checkStone(stones, mid, k) {
  let consec = 0;

  // 모든 디딤돌에 대해 반복하며
  // mid 보다 작은 값이 k번이상 나오는지 확인
  for (let i = 0; i < stones.length; i++) {
    // mid보다 stones[i]의 값이 작다면, i번째 디딤돌은 mid번 징검다리를 건너기 전에 값이 이미 0이 되어버림

    // mid보다 작은 디딤돌(stones[i])을 발견하면, 연속으로 몇개를 반복했는지에 세는 consec에 1을 추가함
    if (stones[i] < mid) {
      consec += 1;

      // mid보다 크거나 같은 디딤돌(stones[i])을 발견하면, 연속으로 몇개를 반복했는지에 세는 consec을 0으로 초기화함
    } else {
      consec = 0;
    }

    // 만약 mid보다 작은 디딤돌이 k개 이상 연속으로 놓여있는 구간이 있다면, 해당 구간을 k번 점프하는 걸로 넘을 수 없으므로,
    // (값이 0인 디딤돌이 4개 연속 놓여져 있는 구간, 한 번에 5단 점프해야 함)
    // 이 징검다리는 mid명이 건너는 방법은 없음 => false 리턴
    if (consec >= k) {
      return false;
    }
  }

  // 만약 mid보다 작은 디딤돌이 k개 이상 연속으로 놓여있는 구간이 없다면, 이 징검다리는 mid명이 건널 수 있다. => true 리턴
  return true;
}

function solution(stones, k) {
  // 탐색 범위는 1부터 2억,
  // 이진 탐색의 시간 복잡도는 O(logN) 이므로, log 2억 은 약 8.3
  // (10의 8.3 제곱은 약 2억, 10의 10 제곱은 100억)
  let left = 1;
  let right = 200000000;
  let mid;

  while (true) {
    mid = Math.floor((left + right) / 2);

    if (left === right - 1) {
      return mid;
    }

    // checkStone이 true를 리턴하면
    // left를 mid로 변경함
    if (checkStone(stones, mid, k)) {
      left = mid;
    } else {
      right = mid;
    }
  }
}

// 문제 풀이 접근 방식

// 이분 탐색을 이용해서 답을 찾는 방법이다.
// 징검다리를 넘을 수 있는 사람의 수는 모든 디딤돌의 숫자가 1인 경우이므로 최소 1명이고
// 징검다리를 넘을 수 있는 사람의 수는 모든 디딤돌의 숫자가 2억인 경우이므로 최대 2억명이다.
// 이를 평균 값을 내면 약 1억이다.
// 따라서 mid값을 1억으로 해서 이분탐색을 시작한다.

// 답이 left와 mid 사이에 존재한다면 right를 mid-1로 변경하고
// 답이 mid와 right  사이에 존재한다면 left를 mid+1로 변경한다.
// 위 과정을 left가 right보다 커질 때까지 반복한다.

// mid값을 이용해서 답이 어디에 존재하는지 찾는 방법은 다음과 같다.

// 모든 stones[i]의 값에서 mid를 뻈는데 0보다 작은 원소가 k번 이상 나올 경우
// 징검다리를 mid번 건널 수 없다는 뜻이므로(mid번 건널 때 쯤에 특정 구간이 점프로 뛰어 넘을 수 있는 구간 보다 길어지므로)
// 정답은 mid보다 더 낮은 곳에 있다.
// 따라서 이 경우 right를 mid로 설정한다.

// 만약 k번 이상 나온 적이 없을 경우,
// 징검다리를 mid번 건널 수 있다는 뜻이므로,
// mid번 보다 더 많이 건널 수 있는지 확인하기 위해
// left를 mid로 설정한다.

// 후기

// 나는 이분 탐색에 대해 고려는 해보았지만
// 시간적으로 안된다는 것을 알면서도 완전탐색으로 코드를 짰다.
// 이분탐색으로 해야하는 건 알았으나, 어떻게 접근하는지를 몰랐다.

// 징검다리의 끝과 끝에서 접근하는 걸로만 생각했기 때문에
// 정작 답을 이분 탐색해서 직접적으로 구하는 방법을 생각을 못했다.

// 완전탐색으로 구현한 코드는 모든 테케를 통과했지만 효율성 테스트에서 모두다 시간초과가 떴다.
// 이분 탐색에 대해 더 연습해야겠다.
