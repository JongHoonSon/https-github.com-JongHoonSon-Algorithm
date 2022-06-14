function solution(lottos, win_nums) {
  var answer = [];

  let zeroCnt = 0;

  for (let i = 0; i < lottos.length; i++) {
    if (lottos[i] === 0) {
      zeroCnt++;
    }
  }

  let minCorrectCnt = 0;

  for (let i = 0; i < lottos.length; i++) {
    for (let j = 0; j < win_nums.length; j++) {
      if (lottos[i] === win_nums[j]) {
        minCorrectCnt++;
      }
    }
  }

  let min = minCorrectCnt;
  let max = minCorrectCnt + zeroCnt;

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
