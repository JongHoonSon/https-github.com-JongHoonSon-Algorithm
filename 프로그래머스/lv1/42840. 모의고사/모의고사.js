function solution(answers) {
  var answer = [];

  const solveA = [1, 2, 3, 4, 5];
  const solveB = [2, 1, 2, 3, 2, 4, 2, 5];
  const solveC = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const a = 5;
  const b = 8;
  const c = 10;

  let resultA = 0;
  let resultB = 0;
  let resultC = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === solveA[i % a]) {
      resultA++;
    }

    if (answers[i] === solveB[i % b]) {
      resultB++;
    }

    if (answers[i] === solveC[i % c]) {
      resultC++;
    }
  }

  if (resultA === resultB && resultB === resultC) {
    answer.push(1);
    answer.push(2);
    answer.push(3);
  } else if (resultA === resultB && resultA > resultC) {
    answer.push(1);
    answer.push(2);
  } else if (resultA === resultC && resultA > resultB) {
    answer.push(1);
    answer.push(3);
  } else if (resultB === resultC && resultB > resultA) {
    answer.push(2);
    answer.push(3);
  } else if (resultA > resultB && resultA > resultC) {
    answer.push(1);
  } else if (resultB > resultA && resultB > resultC) {
    answer.push(2);
  } else if (resultC > resultA && resultC > resultB) {
    answer.push(3);
  }

  console.log(answer);

  return answer;
}
