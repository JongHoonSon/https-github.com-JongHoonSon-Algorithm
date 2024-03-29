function solution(answers) {
  var answer = [];

  // 1. 각 학생이 반복해서 찍는 번호를 갖는 배열 생성
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

  // 2. 전체 정답에 대해 반복하며 각 학생이 맞춘 횟수를 기록
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

  // 3. 가장 많이 맞춘 학생의 점수를 max에 저장
  let max = Math.max(supo1Sum, supo2Sum, supo3Sum);

  // 4. 각 학생 중이 맞춘 점수가 max와 같을 경우, 해당 학생을 answer에 넣음
  if (supo1Sum === max) {
    answer.push(1);
  }

  if (supo2Sum === max) {
    answer.push(2);
  }

  if (supo3Sum === max) {
    answer.push(3);
  }

  // 5. 학생을 번호순으로 정렬
  answer.sort((a, b) => a - b);

  return answer;
}
