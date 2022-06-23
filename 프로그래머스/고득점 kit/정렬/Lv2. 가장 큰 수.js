function solution(numbers) {
  var answer = "";

  let allIsZero = true;

  numbers.forEach((el) => {
    if (el !== 0) {
      allIsZero = false;
    }
  });

  if (allIsZero) {
    answer = "0";
  } else {
    numbers.sort((a, b) => {
      let strA = a.toString();
      let strB = b.toString();

      if (BigInt(strA + strB) > BigInt(strB + strA)) {
        return -1;
      } else {
        return 1;
      }
    });

    console.log(numbers);

    answer = numbers.join("");
  }

  return answer;
}
