function solution(n, words) {
  var answer = [0, 0];

  let usedWords = [words[0]];

  let rounds = 2;

  for (let i = 1; i < words.length; i++) {
    let prevWord = words[i - 1];
    let nowWord = words[i];

    let prevWordArr = prevWord.split("");
    let nowWordArr = nowWord.split("");

    if (
      usedWords.includes(nowWord) === true ||
      prevWordArr[prevWordArr.length - 1] !== nowWordArr[0]
    ) {
      let nthPerson = rounds % n === 0 ? n : rounds % n;
      let nthTimes = Math.floor((rounds - 1) / n) + 1;
      answer = [nthPerson, nthTimes];
      break;
    }

    usedWords.push(words[i]);

    rounds++;
  }

  return answer;
}
