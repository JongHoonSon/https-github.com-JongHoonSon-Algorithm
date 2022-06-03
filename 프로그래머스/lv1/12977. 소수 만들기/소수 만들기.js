function solution(nums) {
  var answer = -1;

  let newNums = new Array();

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        newNums.push(nums[i] + nums[j] + nums[k]);
      }
    }
  }

  console.log(newNums);

  let primes = [];

  for (let i = 0; i < newNums.length; i++) {
    let isPrime = true;
    for (let j = 2; j < newNums[i]; j++) {
      if (newNums[i] % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime === true) {
      primes.push(newNums[i]);
    }
  }

  console.log(primes);

  answer = primes.length;

  return answer;
}

// 문제 풀이 접근 방식

// 문제에서 주어진 nums 배열에서 3개의 수를 선택하는 조합의 합을 newNums에 저장한 후,
// newNums의 각 수에 대해 소수인지의 여부를 판단하고, 소수의 총 갯수를 출력하면 된다.

// 주어진 nums 배열의 최대 길이가 50이므로
// 3중 반복문을 사용해 3개의 수를 고르더라도,
// 최대 소요 시간이 50 x 50 x 50 = 125000 이므로, 시간 초과 없이 풀 수 있다.
