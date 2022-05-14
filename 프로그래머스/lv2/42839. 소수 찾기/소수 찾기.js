function solution(numbers) {
  var answer = 0;

  // 1. numbers로 만들 수 있는 최대 수까지의 소수 여부를 isPrime에 저장하기

  let maxNum = "";

  for (let i = 0; i < numbers.length; i++) {
    maxNum = maxNum + "9";
  }

  let isPrime = new Array(+maxNum + 1).fill(true);

  isPrime[0] = isPrime[1] = false;

  let sqrt = Math.ceil(Math.sqrt(maxNum));

  console.log("maxNum : ", maxNum);
  console.log("sqrt : ", sqrt);

  for (let i = 2; i <= sqrt; i++) {
    if (isPrime[i] === true) {
      for (let j = i * 2; j <= maxNum; j = j + i) {
        isPrime[j] = false;
      }
    }
  }

  for (let i = 0; i < 100; i++) {
    // console.log(`isPrime[${i}]`, isPrime[i]);
  }

  // 2. numbers로 조합할 수 있는 모든 길이의 수를 찾고,
  // 찾은 수가 소수인지 아닌지 체크하기
  // Back tacking 사용

  let numArr = numbers.trim().split("");

  console.log("numArr", numArr);

  let primeArr = [];

  let string;
  let check;

  for (let i = 1; i <= numbers.length; i++) {
    string = [];
    check = new Array(numArr.length).fill(false);
    BT(0, i);
  }

  console.log("primeArr : ", primeArr);

  answer = primeArr.length;

  function BT(nowStep, endStep) {
    if (nowStep === endStep) {
      let foundNumber = Number(string.join(""));
      if (
        isPrime[foundNumber] === true &&
        primeArr.indexOf(foundNumber) === -1
      ) {
        primeArr.push(foundNumber);
      }
    }

    for (let i = 0; i < numArr.length; i++) {
      if (check[i] === true) {
        continue;
      }

      string.push(numArr[i]);
      check[i] = true;

      BT(nowStep + 1, endStep);

      string.pop();
      check[i] = false;
    }
  }

  return answer;
}
