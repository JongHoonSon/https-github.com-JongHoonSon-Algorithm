function solution(s) {
  var answer = [];

  let deletedZeroCnt = 0;
  let transCnt = 0;

  while (true) {
    // 문자열 s를 배열로 만들기
    let sArr = s.split("");

    console.log(sArr);

    // 0 지우기 (문제 조건)
    for (let i = 0; i < sArr.length; i++) {
      if (sArr[i] === "0") {
        sArr[i] = "";
        deletedZeroCnt++;
      }
    }

    // 0을 지운 후의 새로운 문자열
    let newS = sArr.join("");

    let length = newS.length;

    // 만약 새로운 문자열의 길이가 1이면 (문제의 종료 조건)
    // (= 문자열이 '1'인 것이고, 2진수로 변환할 경우 값이 1이다.)
    transCnt++;
    if (length === 1) {
      //종료
      break;

      // 문자열의 길이가 1이 아니면, (ex 5, 6 등)
    } else {
      // 길이를 2진수로 변환한 값을 s에 저장 (문제 조건)
      s = length.toString(2);
    }
  }

  answer = [transCnt, deletedZeroCnt];

  return answer;
}
