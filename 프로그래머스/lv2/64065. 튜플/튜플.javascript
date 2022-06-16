function solution(s) {
  var answer = [];

  // sArr은 입력으로 주어진 문자열 s를 배열로 변경한 것
  let sArr = s.split("");

  let arr = [];
  let set = [];

  // sArr의 원소에 대해 반복
  for (let i = 0; i < sArr.length; i++) {
    // 만약 괄호 열기가 나오면,
    // 집합의 원소가 나오기 시작하거나
    // 문자열의 첫 시작 부분이라는 뜻이므로
    if (sArr[i] === "{") {
      // 집합의 원소를 담을 set을 초기화함
      set = [];

      // 만약 괄호 닫기가 나오면,
      // 집합의 원소가 다 나왔거나
      // 문자열의 맨 끝 부분이라는 뜻이므로
    } else if (sArr[i] === "}") {
      // 만약 집합의 원소가 set에 담겼다면
      if (set.length > 0) {
        // 해당 집합의 원소를 arr에 넣음
        arr.push(
          set
            .join("")
            .split(",")
            .map((v) => +v)
        );
      }
    } else {
      set.push(sArr[i]);
    }
  }

  arr.sort((a, b) => a.length - b.length);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!answer.includes(arr[i][j])) {
        answer.push(arr[i][j]);
      }
    }
  }

  return answer;
}
