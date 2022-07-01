function solution(numbers) {
  var answer = 0;

  let numArr = numbers.split("");

  let results = [];
  let string = [];

  let check = new Array(numArr).fill(false);

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

  results.map((v) => +v);

  let resultsSet = new Set(results);

  results = Array.from(resultsSet);

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

  results.forEach((el) => {
    if (isPrime[el] === true) {
      answer++;
    }
  });

  return answer;
}
