function solution(numbers) {
  var answer = "";

  // numbers 배열이 0으로만 이루어진 배열인지 체크하기 위한 flag
  let onlyZeroFlag = true;

  // numbers 배열의 모든 원소를 체크하면서 0이 아닌 수가 있다면, flag를 false로 변경
  numbers.forEach((el) => {
    if (el !== 0) {
      onlyZeroFlag = false;
    }
  });

  // numbers 배열이 0으로만 이루어진 배열이라면, "0" 리턴
  // 이렇게 하지않으면 최종답이 "0000" 이런식으로 됨
  if (onlyZeroFlag) {
    return "0";
  }

  // numbers를 앞자리가 작은 수대로 정렬함
  numbers.sort();

  // 앞자리가 큰 수대로 사용하기 위해 reverse함
  numbers = numbers.reverse();

  console.log("numbers :", numbers);

  // 만약 numbers 중에 붙어있는 양 원소의 길이가 다르고,
  // a+b보다 b+a가 크면, b+a가 더 크면 a와 b의 위치를 변경함

  // 위에서 앞자리가 작은 수대로 정렬하면서 만약 앞자리가 같은 경우 더 작은 수가 앞으로 오게된다.
  // ex) 3과 30를 앞자리가 작은 수부터 정렬할 때, 3, 30 순으로 정렬된다.

  // 따라서 앞자리가 큰 수대로 정렬하기 위해 reverse를 이용해 뒤집었을 때
  // 30, 3 순서로 존재하게 되는데

  // xx303xx 보다
  // xx330xx 의 합이 더 크기 때문에, 아래에서 a,b의 합과 b,a의 합을 비교하여 더 큰 값을 앞으로 보낸다.
  // return 값이 양수이면 두 수를 변경하는데,
  // b+a의 값이 a+b의 값보다 크면, 양수가 나올 것이고, 양수가 나왔기 때문에, a와 b의 위치를 교환함
  numbers.sort((a, b) => {
    if (a.toString().length !== b.toString().length) {
      return (
        Number(b.toString() + a.toString()) -
        Number(a.toString() + b.toString())
      );
    }
  });

  console.log("numbers :", numbers);

  answer = numbers.join("");

  return answer;
}

// 문제 풀이 접근 방식

// 문자열을 정렬하는 문제이고, js로 풀 경우 sort()에 적절한 조건문을 넣어 정렬을 시킬 수 있다는 점을 이용하여
// 적절한 조건문을 설정하여 푸는 문제이다.

// 후기

// 나는 일단 앞자리가 큰 수로 정렬한 후, 길이가 다른 두 수에 대해(길이가 같은 것은 이미 정렬되었으므로)
// 합이 더 큰 수가 나오게끔 정렬했지만

// 애초부터 정렬할 때 두 수를 더한 값이 크게끔 정렬하면 되는 것이었다.
// 따라서 아래와 같은 코드로 좀 더 간단하게 구현할 수 있다.
// (애초부터 큰 값을 갖는 수를 앞쪽으로 보내기 때문에 reverse도 사용할 필요가 없어짐)

// numbers.sort((a, b) => {
//   let A = a.toString();
//   let B = b.toString();

//   return Number(B + A) - Number(A + B);
// });
