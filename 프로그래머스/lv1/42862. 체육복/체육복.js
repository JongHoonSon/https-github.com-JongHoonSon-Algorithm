function solution(n, lost, reserve) {
  let answer = 0;

  // n명의 학생에 대해 각 학생이 갖고 있는 체육복의 수를 저장할 객체
  const students = {};

  // 모든 학생의 체육복 수를 1개로 함 (기본 값)
  for (let i = 1; i <= n; i++) {
    students[i] = 1;
  }

  // 체육복을 잃어버린 사람(number)의 체육복 수를 1개 줄임
  lost.forEach((number) => {
    console.log(number);
    students[number] -= 1;
  });

  // 여벌 체육복이 있는 사람(number)의 체육복 수를 1개 늘림
  reserve.forEach((number) => (students[number] += 1));

  // 모든 학생에 대해
  for (let i = 1; i <= n; i++) {
    // 체육복이 2개인 사람 i가 있고, i의 앞사람인 i-1의 체육복의 수가 0개이면
    if (students[i] === 2 && students[i - 1] === 0) {
      // 체육복을 빌려줌
      students[i - 1]++;
      students[i]--;

      // 체육복이 2개인 사람 i가 있고, i의 뒷사람인 i+1의 체육복의 수가 0개이면
    } else if (students[i] === 2 && students[i + 1] === 0) {
      // 체육복을 빌려줌
      students[i + 1]++;
      students[i]--;
    }
  }

  // 모든 학생에 대해
  for (let number in students) {
    // 체육복을 갖고 있는 사람의 수를 answer에 카운트 함
    if (students[number] >= 1) {
      answer++;
    }
  }
  return answer;
}
