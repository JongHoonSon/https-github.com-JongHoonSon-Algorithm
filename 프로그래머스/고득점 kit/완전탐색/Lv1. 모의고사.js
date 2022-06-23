function solution(answers) {
  var answer = [];

  let supo1 = [1, 2, 3, 4, 5];
  let supo1Length = supo1.length;
  let supo1Sum = 0;

  let supo2 = [2, 1, 2, 3, 2, 4, 2, 5];
  let supo2Length = supo2.length;
  let supo2Sum = 0;

  let supo3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let supo3Length = supo3.length;
  let supo3Sum = 0;

  let answersLength = answers.length;

  for (let i = 0; i < answersLength; i++) {
    if (supo1[i % supo1Length] === answers[i]) {
      supo1Sum++;
    }

    if (supo2[i % supo2Length] === answers[i]) {
      supo2Sum++;
    }

    if (supo3[i % supo3Length] === answers[i]) {
      supo3Sum++;
    }
  }

  let max = Math.max(supo1Sum, supo2Sum, supo3Sum);

  if (supo1Sum === max) {
    answer.push(1);
  }

  if (supo2Sum === max) {
    answer.push(2);
  }

  if (supo3Sum === max) {
    answer.push(3);
  }

  answer.sort((a, b) => a - b);

  return answer;
}
