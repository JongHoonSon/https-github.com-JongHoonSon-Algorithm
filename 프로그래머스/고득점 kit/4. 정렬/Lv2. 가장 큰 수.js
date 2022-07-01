function solution(numbers) {
  var answer = "";

  // 1. 모든 입력이 0인 경우를 체크
  let allIsZero = true;

  numbers.forEach((el) => {
    if (el !== 0) {
      allIsZero = false;
    }
  });

  // 2. 모든 입력이 0인 경우, 0 출력
  if (allIsZero) {
    answer = "0";

    // 3. 모든 입력이 0이지는 않은 경우
  } else {
    // 4. numbers에 들어있는 모든 수에 대해서
    // a,b 순서로 붙힌 경우와 b,a 순서로 붙힌 경우 중에
    // 더 큰 값을 앞으로 오도록 정렬함
    numbers.sort((a, b) => {
      let strA = a.toString();
      let strB = b.toString();

      if (BigInt(strA + strB) > BigInt(strB + strA)) {
        return -1;
      } else {
        return 1;
      }
    });

    console.log(numbers);

    // 5. 정렬한 결과를 answer에 저장
    answer = numbers.join("");
  }

  return answer;
}
