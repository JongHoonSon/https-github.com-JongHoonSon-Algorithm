function solution(array, commands) {
  var answer = [];

  // 1. 모든 명령어에 대해 반복
  for (let i = 0; i < commands.length; i++) {
    // 배열 복사
    let copy = JSON.parse(JSON.stringify(array));

    // 명령어 저장
    let [start, end, n] = commands[i];

    // 2. 명령어에 따라 start-1부터 end-start+1 개를 잘라서
    // spliceArr에 저장
    let spliceArr = copy.splice(start - 1, end - start + 1);

    // 3. spliceArr을 정렬
    spliceArr.sort((a, b) => a - b);

    console.log(spliceArr);

    // 4. spliceArr의 n번째에 들어있는 수를 answer에 저장 (index 상은 n-1)
    answer.push(spliceArr[n - 1]);
  }

  return answer;
}
