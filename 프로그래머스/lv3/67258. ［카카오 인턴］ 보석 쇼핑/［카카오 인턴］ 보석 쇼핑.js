function solution(gems) {
  var answer = [];

  let gemSet = new Set(gems);

  let gemLen = gemSet.size;

  let gemMap = new Map();

  let leftPointer = 0;
  let rightPointer = 0;

  let minLength = [0, Infinity];
  let minGap = Infinity;

  gemMap.set(gems[0], 1);

  while (rightPointer <= gems.length - 1) {
    if (gemLen === gemMap.size) {
      if (minGap > rightPointer - leftPointer) {
        minGap = rightPointer - leftPointer;
        minLength = [leftPointer, rightPointer];
      }
      if (gemMap.get(gems[leftPointer]) === 1) {
        gemMap.delete(gems[leftPointer]);
      } else {
        gemMap.set(gems[leftPointer], gemMap.get(gems[leftPointer]) - 1);
      }
      leftPointer++;
    } else {
      rightPointer++;
      if (gemMap.has(gems[rightPointer]) === true) {
        gemMap.set(gems[rightPointer], gemMap.get(gems[rightPointer]) + 1);
      } else {
        gemMap.set(gems[rightPointer], 1);
      }
    }
  }

  let answer1;
  let answer2;

  [answer1, answer2] = minLength;

  answer = [answer1 + 1, answer2 + 1];

  return answer;
}

// 후기

// 문제 풀이 접근 방식을 약 15분 동안 떠올려봤지만, 생각이 나지 않아 구글링을 통해 접근 방식만 파악하고 직접 구현하였다.

// 문제 풀이 접근 방식

// 2개의 포인터와 Map을 이용한 풀이 방식이다.

// gems 배열에는 진열대에 놓인 보석이 순서대로 들어가 있다.
// 총 보석 종류의 수는 gems를 set으로 변환하여 구한 뒤 gemLen에 저장한다.
// gemMap에는 양쪽 포인터 사이의 보석의 정보에 따라
// { key: 보석의 이름, value: 해당 보석의 갯수 } 형태로 데이터가 들어가는데,
// 만일 gemMap의 size가 총 보석 종류의 수인 gemLen과 같다면,
// 양쪽 포인터 사이에 모든 보석이 존재함을 의미한다.

// 위 개념을 기반으로 하여 구현한 방식은 다음과 같다.

// 맨 처음에는 gems의 첫번째 원소를 gemMap에 넣는다.
// gems[0]을 key로, 1을 value로 한 값을 넣는다.
// 그 후 양쪽 포인터를 gems의 첫번째 원소의 index인 0에다가 놓는다.

// 그 후 반복문을 통해 다음 과정을 체크한다.

// 1. gemMap의 size가 genLen과 같은지 체크한다.

//   1-1. 같은 경우, 양쪽 포인터 사이에 모든 보석의 종류가 존재하는 것이므로,
//   양쪽 포인터 사이의 구간의 길이와 지금까지 구한 최소 구간 길이를 비교하여 최솟값을 갱신한다.

//   그 다음, 왼쪽 포인터를 오른쪽으로 한 칸 옮겨서 구간을 더 줄이기 위한 과정을 진행한다.

//     먼저 왼쪽 포인터가 가르키고 있던 보석의 종류를 genMap에서 1개 제외한다.

//     1-1-1. 만약 genMap에 해당 보석의 갯수가 1개인 경우, genMap에서 완전히 삭제한다.
//     (이로 인해 다음 반복문에서는 genMap에 모든 종류의 보석이 들어가있지 않기 때문에 1-2로 빠져 새로 보석을 genMap에 추가하는 과정을 수행하게 된다.)

//     1-1-2. 만약 genMap에서 해당 보석의 갯수가 2이상인 경우, 보석의 갯수를 -1한다.

//   1-2. 다른 경우, 양쪽 포인터 사이에 모든 보석의 종류가 존재하지 않는 것이므로,
//   오른쪽 포인터를 오른쪽으로 한 칸 옮겨서 다음 보석을 genMap에 저장한다.
//   이미 genMap에 존재하는 보석인 경우 갯수를 늘리고, 존재하지 않는 보석인 경우 새로 추가한다.

// 위 과정을 rightPointer가 gems를 모두 다 탐색할 때까지 반복하면 된다.
