function solution(n, words) {
  var answer = [0, 0];

  // 끝말잇기의 첫번째 단어는 잘못된 단어일 수 없기 때문에, 사용된 단어에 넣고 시작
  let usedWords = [words[0]];

  // 1라운드(첫번째 단어)가 끝났으므로, 두번째 단어부터 시작하기 위해 round를 2로 설정
  let rounds = 2;

  // 첫번째 단어를 제외한 모든 단어를 각각 확인
  for (let i = 1; i < words.length; i++) {
    // 이전 단어, 현재 단어에 대한 문자열
    let prevWord = words[i - 1];
    let nowWord = words[i];

    // 이전 단어, 현재 단어를 배열로 만든 것
    let prevWordArr = prevWord.split("");
    let nowWordArr = nowWord.split("");

    // 종료조건 :
    // 만약 현재 단어가 사용한 적이 있거나,
    // 현재 단어의 맨 첫 문자가 이전 단어의 마지막 문자와 일치하지 않는 경우
    if (
      usedWords.includes(nowWord) === true ||
      prevWordArr[prevWordArr.length - 1] !== nowWordArr[0]
    ) {
      // 틀린 사람이 몇번째 사람인지를 계산
      // 전체 라운드를 n명으로 나눔
      // (ex) 3명이서 12라운드까지 진행했다면
      // 12라운드에 진행한 사람의 번호는 12%3 === 0 -> 3 이다.)
      let nthPerson = rounds % n === 0 ? n : rounds % n;

      // 틀린 사람이 몇번째로 외친 단어인지를 계산

      // 인원 수가 3명이라면
      // 1, 2, 3 번째는 1
      // 4, 5, 6 번째는 2 임을 감안하여
      // rounds에 1을 뺀 값을 3으로 나눈 뒤 1을 더하면 된다.

      // 1, 2, 3 번째는 1을 빼고 3으로 나눌 경우 0
      // 4, 5, 6 번째는 1을 빼고 3으로 나눌 경우 1 이므로,
      // 각 rounds에서 1을 빼고 3으로 나눈 후, 1을 추가하면 된다.
      let nthTimes = Math.floor((rounds - 1) / n) + 1;

      // answer에 구한 정답을 넣고 종료
      answer = [nthPerson, nthTimes];
      break;
    }

    // 만약 종료 조건이 걸리지 않은 경우,
    // 사용한 단어에 현재 단어를 추가하고, rounds를 1개 늘린다.
    usedWords.push(words[i]);
    rounds++;
  }

  return answer;
}

// 문제 풀이 접근 방식

// words 배열에 들어 있는 단어를 하나씩 확인하면서,
// 이번 단어가 저번 단어에 대해 끝말잇기 룰 상 유효한 단어인지 판단하는 과정을 반복하면서
// 유효한 단어가 아닐 경우, 문제에서 요구하는 틀린 사람, 틀린 사람이 몇번째로 외친 단어인지 를 출력하면 된다.
