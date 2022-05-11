function solution(participant, completion) {
  var answer = "";

  const nameMap = new Map();

  participant.forEach((el) => {
    if (!nameMap.has(el)) {
      nameMap.set(el, 1);
    } else {
      nameMap.set(el, nameMap.get(el) + 1);
    }
  });

  completion.forEach((el) => {
    nameMap.set(el, nameMap.get(el) - 1);
  });

  participant.forEach((el) => {
    if (nameMap.get(el) >= 1) {
      answer = el;
    }
  });

  return answer;
}
