function solution(number, k) {
  let answer;

  const newNumber = [number[0]];

  for (let i = 1; i < number.length; i++) {
    while (k !== 0) {
      if (newNumber[newNumber.length - 1] < number[i]) {
        newNumber.pop();
        k--;
      } else {
        break;
      }
    }
    newNumber.push(number[i]);
  }

  answer = newNumber.join("").slice(0, number.length - k);

  return answer;
}
