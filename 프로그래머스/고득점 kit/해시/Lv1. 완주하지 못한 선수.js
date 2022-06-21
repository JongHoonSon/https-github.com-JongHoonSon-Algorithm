function solution(participant, completion) {
  var answer = "";

  let partiMap = new Map();

  participant.forEach((name) => {
    if (partiMap.has(name)) {
      partiMap.set(name, partiMap.get(name) + 1);
    } else {
      partiMap.set(name, 1);
    }
  });

  completion.forEach((name) => {
    if (partiMap.has(name)) {
      partiMap.set(name, partiMap.get(name) - 1);
    }
  });

  participant.forEach((name) => {
    if (partiMap.get(name) === 1) {
      answer = name;
    }
  });

  return answer;
}
