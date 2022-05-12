function solution(answers) {
  var answer = [];

  // A, B, C 가 찍는 번호를 담은 배열
  const solveA = [1, 2, 3, 4, 5];
  const solveB = [2, 1, 2, 3, 2, 4, 2, 5];
  const solveC = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  // A, B, C 가 찍는 번호의 길이
  const a = 5;
  const b = 8;
  const c = 10;

  // A, B, C 가 맞춘 문제의 수를 저장할 변수
  let resultA = 0;
  let resultB = 0;
  let resultC = 0;

  // 모든 문제에 대해서
  for (let i = 0; i < answers.length; i++) {
    // i번째 문제의 답이

    // A가 i번째로 찍는 번호와 같으면
    if (answers[i] === solveA[i % a]) {
      // A가 맞춘 문제 수를 +1 증가시킴
      resultA++;
    }

    // B가 i번째로 찍는 번호와 같으면
    if (answers[i] === solveB[i % b]) {
      // B가 맞춘 문제 수를 +1 증가시킴
      resultB++;
    }

    // C가 i번째로 찍는 번호와 같으면
    if (answers[i] === solveC[i % c]) {
      // C가 맞춘 문제 수를 +1 증가시킴
      resultC++;
    }
  }

  // A, B, C가 맞춘 문제의 수가 같은 경우
  if (resultA === resultB && resultB === resultC) {
    answer.push(1);
    answer.push(2);
    answer.push(3);

    // A와 B가 맞춘 문제 수가 제일 많을 경우
  } else if (resultA === resultB && resultA > resultC) {
    answer.push(1);
    answer.push(2);

    // A와 C가 맞춘 문제 수가 제일 많을 경우
  } else if (resultA === resultC && resultA > resultB) {
    answer.push(1);
    answer.push(3);

    // B와 C가 맞춘 문제 수가 제일 많을 경우
  } else if (resultB === resultC && resultB > resultA) {
    answer.push(2);
    answer.push(3);

    // A가 맞춘 문제 수가 제일 많을 경우
  } else if (resultA > resultB && resultA > resultC) {
    answer.push(1);

    // B가 맞춘 문제 수가 제일 많을 경우
  } else if (resultB > resultA && resultB > resultC) {
    answer.push(2);

    // C가 맞춘 문제 수가 제일 많을 경우
  } else if (resultC > resultA && resultC > resultB) {
    answer.push(3);
  }

  // 정답 출력
  console.log(answer);

  return answer;
}
