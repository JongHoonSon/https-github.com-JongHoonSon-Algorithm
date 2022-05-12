function solution(participant, completion) {
  var answer = "";

  // 1. 참가자를 이름에 따라 count 한 Map 만들기

  // 참가자의 이름 별로 값을 저장하는 Map 생성
  const nameMap = new Map();

  // 참가자의 이름의 등장 횟수를 이름 별로 저장
  participant.forEach((el) => {
    // el이라는 이름을 가진 요소가 nameMap이 없으면
    if (!nameMap.has(el)) {
      // set()으로 추가함 (한 번 등장했으므로, 기본 값 : 1)
      nameMap.set(el, 1);

      // el이라는 이름을 가진 요소가 이미 nameMap에 있으면
    } else {
      // set()으로 해당 요소의 값을 + 1함
      nameMap.set(el, nameMap.get(el) + 1);
    }
  });

  // 2. 완주자를 Map에서 빼기
  // (완주자의 이름을 키로 갖는 요소의 값을 -1 하기)

  completion.forEach((el) => {
    // 완주한 사람의 이름을 키로 갖는 요소의 값을 -1함
    // (최종적으로 완주를 못한 사람은 completion배열에 없으므로
    // 자신의 이름을 키로 갖는 요소의 값을 - 1하지 못하여
    // 1 이라는 값을 갖게됨)
    nameMap.set(el, nameMap.get(el) - 1);
  });

  // 3. Map에서 값이 1인 요소를 answer에 저장하고 출력하기
  // (값이 1이라는 것은, 완주자가 들어있는 completion배열에 없었던 사람
  // = 완주하지 못한사람)

  participant.forEach((el) => {
    if (nameMap.get(el) === 1) {
      answer = el;
    }
  });

  return answer;
}

// 문제 풀이 접근 방식

// 이름이 동일한 인물이 존재할 수 있으므로, 참가자의 이름을 key로 하는 Map을 생성한 후,
// 참가자 배열의 모든 원소를 forEach로 돌면서,
// 참가자 이름을 key로 하는 원소를 Map에서 찾아 해당 원소의 값을 +1 시킨다.

// 이후, 완주자의 수가 참가자의 수 -1임을 고려해서
// 완주자 배열의 모든 원소를 forEach로 돌면서,
// 완주자 이름을 key로 하는 원소를 Map에서 찾아 해당 원소의 값을 -1 시킨다.

// 최종적으로 Map 상에서 완주를 하지 못한 사람의 이름을 key로 하는 원소만이 값이 1이 되고,
// 나머지 사람들의 이름을 key로 하는 원소의 값은 0이 된다.
// 따라서, 값이 1인 원소를 찾아 해당 원소의 key 값을 출력하면 된다.
