function solution(s) {
  var answer = "";

  // 입력으로 주어지는 문자열 s를 공백을 기준으로 나눔
  let words = s.split(" ");

  console.log(words);

  let result = [];

  // words에서 각 원소를 word에 저장
  for (let word of words) {
    // 문자열인 word를 배열 형태로 변경함
    let wordArr = word.split("");

    // 1. 맨 앞 문자를 대문자로 변경하기

    // 0번째 문자가 소문자라면
    if ("a" <= wordArr[0] && wordArr[0] <= "z") {
      // 해당 문자의 아스키코드 값을 가져와서 -32한 값을 num에 저장
      // (소문자 -> 대문자)
      let num = wordArr[0].charCodeAt() - 32;

      // num을 아스키코드로 갖는 문자(대문자)를 bigAlpha에 저장
      let bigAlpha = String.fromCharCode(num);

      // 0번째 문자를 대문자로 변경함
      wordArr[0] = bigAlpha;
    }

    // 2. 맨 앞 이후의 문자를 소문자로 변경하기
    for (let i = 1; i < wordArr.length; i++) {
      // 만약 i번째 문자가 대문자라면
      if ("A" <= wordArr[i] && wordArr[i] <= "Z") {
        // 해당 문자의 아스키코드 값을 가져와서 +32한 값을 num에 저장
        // (대문자 -> 소문자)
        let num = wordArr[i].charCodeAt() + 32;

        // num을 아스키코드로 갖는 문자(소문자)를 smallAlpha 저장
        let smallAlpha = String.fromCharCode(num);

        // 0번째 문자를 소문자로 변경함
        wordArr[i] = smallAlpha;
      }
    }

    // 변경된 단어를 result 배열에 넣음
    result.push(wordArr.join(""));
  }

  // 각 단어 사이에 공백이 있으므로,
  // result를 각 단어 사이에 공백을 넣은 문자열로 변환함
  answer = result.join(" ");

  return answer;
}
