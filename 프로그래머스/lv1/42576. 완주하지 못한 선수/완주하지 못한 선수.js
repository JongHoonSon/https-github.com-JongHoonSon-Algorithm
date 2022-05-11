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
