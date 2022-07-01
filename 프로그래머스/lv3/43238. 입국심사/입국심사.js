function solution(n, times) {
  let answer = 0;

  // 각 심사관의 심사에 걸리는 시간을 오름차순으로 정렬함
  times.sort((a, b) => a - b);

  // n명을 검사하는 최소 시간 : 1일만에 심사를 완료한다고 가정 (임의대로 설정한 값)
  let left = 1;

  // n명을 검사하는 최대 시간 : n명을 모두 심사가 가장 오래걸리는 심사관이 심사하는 경우라고 가정하여 n x times에서 가장 큰 값
  let right = n * times[times.length - 1];

  // 현재 최소로 걸리는 시간을 최대 시간으로 설정(이분 탐색 과정에서 값을 점차 낮출 것임)
  let minDays = right;

  // 이분 탐색의 진행 조건
  while (left <= right) {
    // left와 right의 중간에 mid를 설정
    let mid = Math.floor((left + right) / 2);

    // mid일 동안 각 심사관이 심사할 수 있는 사람의 수를 누적하기 위한 변수 totalPersonCnt 누적함
    let totalPersonCnt = 0;
    times.forEach((time) => {
      // mid일 동안 각 심사관이 심사할 수 있는 사람의 수를 누적
      totalPersonCnt = totalPersonCnt + Math.floor(mid / time);
    });

    // 만약 totalPersonCnt가 n보다 크다면 (= mid일동안 n명보다 많은 수의 사람을 심사할 수 있다면)
    if (totalPersonCnt >= n) {
      // minDays를 갱신
      minDays = Math.min(mid, minDays);
    }

    // totalPersonCnt에 따라 새로운 이분탐색을 위한 left, right값 조정
    if (totalPersonCnt >= n) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  answer = minDays;
  return answer;
}

// 문제 풀이 접근 방식

// 이진 탐색을 이용해서 times.length명의 심사관이 총 n명의 인원을 심사하는데 드는 최소 시간을 구하는 문제이다.
// 이진 탐색의 범위에서 시작값은 1일로 설정하고,
// 끝값은 심사관 중 심사 시간이 가장 오래걸리는 심사관이 n명을 모두 심사할 경우인 n * Math.max[...times]로 한다.
// 시작값과 끝값의 중간값인 mid를 구하고,

// mid일 동안 모든 심사관이 심사할 수 있는 사람의 수가 n보다 클 경우 (시간적 여유가 있을 경우)
// 중간값인 mid의 값을 낮춰 다시 심사하기 위해 끝값을 중간값 -1로 설정한다.

// 반대로 mid일 동안 모든 심사관이 심사할 수 있는 사람의 수가 n보다 작을 경우 (시간적 여유가 없을 경우)
// 중간값인 mid의 값을 높혀 다시 심사하기 위해 시작값을 중간값 +1로 설정한다.

// 그리고 모든 심사관이 심사할 수 있는 사람의 수가 n보다 크면서 제일 작을 때까지 이 과정을 반복한다.
