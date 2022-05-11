function solution(participant, completion) {
  var answer = "";

  const cantCompleteMan = new Map();

  participant.forEach((el) => {
    if (!cantCompleteMan.get(el)) {
      cantCompleteMan.set(el, 1);
    } else {
      cantCompleteMan.set(el, cantCompleteMan.get(el) + 1);
    }
  });

  completion.forEach((el) => {
    if (cantCompleteMan.get(el)) {
      cantCompleteMan.set(el, cantCompleteMan.get(el) - 1);
    }
  });

  participant.forEach((el) => {
    if (cantCompleteMan.get(el) && cantCompleteMan.get(el) >= 1) {
      answer = el;
    }
  });

  return answer;
}
