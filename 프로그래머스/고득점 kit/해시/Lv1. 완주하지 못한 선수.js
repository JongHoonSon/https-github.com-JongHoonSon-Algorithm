function solution(participant, completion) {
  var answer = "";

  let partiMap = new Map();

  // 1. 참가자의 이름을 key로 갖고,
  // 해당 이름을 갖는 참가자의 수를 value로 갖는
  // Map 생성

  // 해당 이름이 Map에 없는 경우, 1로 set
  // 이미 있는 경우, 기존 값 +1로 set

  participant.forEach((name) => {
    if (partiMap.has(name)) {
      partiMap.set(name, partiMap.get(name) + 1);
    } else {
      partiMap.set(name, 1);
    }
  });

  // 2. 전체 완주자의 이름을 Map에서 찾아 값을 -1함

  completion.forEach((name) => {
    if (partiMap.has(name)) {
      partiMap.set(name, partiMap.get(name) - 1);
    }
  });

  // 3. 최종적으로 남아 있는 참가자는 완주하지 못한 참가자임

  participant.forEach((name) => {
    if (partiMap.get(name) === 1) {
      answer = name;
    }
  });

  return answer;
}
