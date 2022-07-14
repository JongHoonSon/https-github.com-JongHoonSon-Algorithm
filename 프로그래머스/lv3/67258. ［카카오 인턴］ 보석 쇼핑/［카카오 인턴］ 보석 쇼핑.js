function solution(gems) {
  var answer = [];

  let gemSet = new Set(gems);

  let gemLen = gemSet.size;

  let gemMap = new Map();

  let leftPointer = 0;
  let rightPointer = 0;

  let minLength = [0, Infinity];
  let minGap = Infinity;

  gemMap.set(gems[0], 1);

  while (rightPointer <= gems.length - 1) {
    if (gemLen === gemMap.size) {
      if (minGap > rightPointer - leftPointer) {
        minGap = rightPointer - leftPointer;
        minLength = [leftPointer, rightPointer];
      }
      if (gemMap.get(gems[leftPointer]) === 1) {
        gemMap.delete(gems[leftPointer]);
      } else {
        gemMap.set(gems[leftPointer], gemMap.get(gems[leftPointer]) - 1);
      }
      leftPointer++;
    } else {
      rightPointer++;
      if (gemMap.has(gems[rightPointer]) === true) {
        gemMap.set(gems[rightPointer], gemMap.get(gems[rightPointer]) + 1);
      } else {
        gemMap.set(gems[rightPointer], 1);
      }
    }
  }

  let answer1;
  let answer2;

  [answer1, answer2] = minLength;

  answer = [answer1 + 1, answer2 + 1];

  return answer;
}
