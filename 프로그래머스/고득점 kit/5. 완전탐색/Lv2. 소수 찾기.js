function solution(numbers) {
  var answer = 0;

  let numArr = numbers.split("");

  let results = [];
  let string = [];

  let check = new Array(numArr).fill(false);

  // 1. 찢어진 조각으로 조합하여 만들 수 있는
  // 길이가 1부터 전체 찢어진 조각의 갯수만큼인 조합을 BT를 이용해서 생성함
  for (let i = 1; i <= numArr.length; i++) {
    BT(0, i);
  }

  function BT(step, end) {
    if (step === end) {
      results.push(string.join(""));
      return;
    }

    for (let i = 0; i < numArr.length; i++) {
      if (string.length === 0 && numArr[i] === "0") {
        continue;
      }

      if (check[i] === true) {
        continue;
      }

      check[i] = true;
      string.push(numArr[i]);
      BT(step + 1, end);
      check[i] = false;
      string.pop();
    }
  }

  console.log(results);

  // BT로 만든 모든 조합이 들어있는 results 배열
  results.map((v) => +v);

  // 2. 중복되는 조합을 제거
  let resultsSet = new Set(results);

  results = Array.from(resultsSet);

  // 3. 조합 중에서 가장 큰 값을 기준으로
  // 그 수 이하에 존재하는 소수를 기록하는 isPrime 배열 생성
  let max = Math.max(...results);

  let sqrt = Math.ceil(Math.sqrt(max));

  let isPrime = new Array(max + 1).fill(true);

  isPrime[0] = false;
  isPrime[1] = false;

  let i = 2;

  while (i <= sqrt) {
    for (let j = i + i; j <= max; j = j + i) {
      isPrime[j] = false;
    }
    i++;
  }

  // 4. 각 조합에 대해 반복하며 해당 수가 소수인 경우, answer의 갯수를 1 증가시킴
  results.forEach((el) => {
    if (isPrime[el] === true) {
      answer++;
    }
  });

  return answer;
}
