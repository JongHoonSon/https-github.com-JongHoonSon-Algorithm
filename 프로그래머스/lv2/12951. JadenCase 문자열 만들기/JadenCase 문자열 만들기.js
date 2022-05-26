function solution(s) {
  var answer = "";

  let words = s.split(" ");

  console.log(words);

  let result = [];

  for (let word of words) {
    let wordArr = word.split("");

    if ("a" <= wordArr[0] && wordArr[0] <= "z") {
      let num = wordArr[0].charCodeAt() - 32;
      let bigAlpha = String.fromCharCode(num);

      wordArr[0] = bigAlpha;
    }

    for (let i = 1; i < wordArr.length; i++) {
      if ("A" <= wordArr[i] && wordArr[i] <= "Z") {
        let num = wordArr[i].charCodeAt() + 32;
        let smallAlpha = String.fromCharCode(num);

        wordArr[i] = smallAlpha;
      }
    }

    result.push(wordArr.join(""));
  }

  answer = result.join(" ");

  return answer;
}
