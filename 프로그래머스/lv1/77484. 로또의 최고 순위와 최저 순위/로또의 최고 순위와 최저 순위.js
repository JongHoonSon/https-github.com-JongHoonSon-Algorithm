function solution(lottos, win_nums) {
  var answer = [];

  let zeroCnt = 0;

  // 모르는 번호 구하기(문제에서 0으로 표시한 번호)의 갯수 구하기
  for (let i = 0; i < lottos.length; i++) {
    if (lottos[i] === 0) {
      zeroCnt++;
    }
  }

  // 아는 번호 중에서 정답과 맞는 번호의 갯수 구하기
  let minCorrectCnt = 0;

  for (let i = 0; i < lottos.length; i++) {
    for (let j = 0; j < win_nums.length; j++) {
      if (lottos[i] === win_nums[j]) {
        minCorrectCnt++;
      }
    }
  }

  // 최소로 맞은 번호의 갯수
  let min = minCorrectCnt;

  // 최대로 맞은 번호의 갯수
  let max = minCorrectCnt + zeroCnt;

  // 각 갯수를 등수로 변환
  let minRank;
  let maxRank;

  if (min < 2) {
    minRank = 6;
  } else if (min === 2) {
    minRank = 5;
  } else if (min === 3) {
    minRank = 4;
  } else if (min === 4) {
    minRank = 3;
  } else if (min === 5) {
    minRank = 2;
  } else if (min === 6) {
    minRank = 1;
  }

  if (max < 2) {
    maxRank = 6;
  } else if (max === 2) {
    maxRank = 5;
  } else if (max === 3) {
    maxRank = 4;
  } else if (max === 4) {
    maxRank = 3;
  } else if (max === 5) {
    maxRank = 2;
  } else if (max === 6) {
    maxRank = 1;
  }

  answer = [maxRank, minRank];

  return answer;
}

// 문제 풀이 접근 방식

// 문제에서 주어진 조건대로 정답 로또 번호와 자신이 알고 있는 로또 번호로
// 최소한 맞을 수 있는 번호의 갯수와 최대로 맞을 수 있는 번호의 갯수를 구한 뒤
// 각 맞는 번호의 갯수를 등수로 변환하면 된다.
