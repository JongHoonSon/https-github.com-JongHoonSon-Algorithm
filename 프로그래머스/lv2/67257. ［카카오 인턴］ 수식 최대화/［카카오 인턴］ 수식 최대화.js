function solution(expression) {
  let answer = 0;

  // console.log(expression);

  // 수식을 배열 형태로 만듬
  let expArr = expression.split("");

  // 수식에 들어가는 연산자(+, -, *) 를 기록할 Set
  let operatorSet = new Set();

  // 수식에 들어있는 연산자를 Set에 넣음
  for (let i = 0; i < expArr.length; i++) {
    if (isNaN(expArr[i])) {
      operatorSet.add(expArr[i]);
    }
  }

  // 수식에 들어있는 연산자를 담은 Set을 배열 형태로 변경
  let operatorArr = Array.from(operatorSet);

  // console.log(operatorArr);

  // 수식에 사용되는 연산자의 우선순위를 구하기 위해 BT를 사용함

  // 만약 +, -, * 연산자가 사용되었다면, BT를 이용해
  // +, -, *
  // +, *, -
  // -, +, *
  // -, *, +
  // *, +, -
  // *, -, +
  // 의 조합을 만들 수 있음

  let string = [];
  let BT_results = new Array();
  let BT_check = new Array(operatorArr.length).fill(false);

  BT(0);

  function BT(step) {
    if (step === operatorArr.length) {
      BT_results.push(string.join(""));
      return false;
    }

    for (let i = 0; i < operatorArr.length; i++) {
      if (BT_check[i] === true) {
        continue;
      }

      BT_check[i] = true;
      string.push(operatorArr[i]);
      BT(step + 1);
      string.pop();
      BT_check[i] = false;
    }
  }

  console.log(BT_results);

  // expression의 각 피연산자와 연산자를 스택에 넣음

  // 수식에 사용된 피연산자와 연산자를 넣을 스택
  let stack = [];

  console.log(expArr);

  // 수식의 앞에서부터 순서대로 피연산자와 연산자를 구분하여 스택에 넣음
  let numbers = "";
  for (let i = 0; i < expArr.length; i++) {
    // 수식의 끝에 도달했다면, 마지막으로 입력된 numbers를 스택에 넣음
    if (i === expArr.length - 1) {
      numbers = numbers + expArr[i];
      stack.push(Number(numbers));

      // 숫자라면(=피연산자라면) => numbers에 추가함
    } else if (!isNaN(expArr[i])) {
      numbers = numbers + expArr[i];
    } else {
      // 숫자가 아니라면(=연산자라면) => 이전까지 저장한 numbers와 현재 연산자를 스택에 넣고, numbers를 초기화함
      stack.push(Number(numbers));
      stack.push(expArr[i]);
      numbers = "";
    }
  }

  console.log(stack);

  // 연산자 우선순위 결과에 따른 반복
  out: for (let i = 0; i < BT_results.length; i++) {
    console.log("--------------------------");
    console.log("--------");
    console.log(`${BT_results[i]} 로 반복`);
    console.log("--------");

    // 각 우선순위에 따라 연산을 각각 수행하기 위해 스택을 복사함
    let copyStack = JSON.parse(JSON.stringify(stack));
    let operatorPriorityArr = BT_results[i].split("");

    // 각 연산자 우선순위의 연산자에 대한 반복
    for (let j = 0; j < operatorPriorityArr.length; j++) {
      // 우선순위 상 현재 계산을 진행해야하는 연산자를 thisOperator에 저장함
      let thisOperator = operatorPriorityArr[j];
      let operatorIsIn = true;

      // 스택에 operator가 들어있다면 계속 반복함
      // 스택에서 해당 operator로 연산을 완료한 경우, 스택에는 더 이상 해당 operator가 없기 때문에
      // operatorIsIn이 false에서 true로 변경되지 않고, 이에 따라 반복문이 종료됨
      while (operatorIsIn === true) {
        operatorIsIn = false;

        for (let k = 0; k < copyStack.length; k++) {
          // 스택의 k번째에 현재 계산하고자 하는 연산자가 들어있다면, 연산 수행
          if (copyStack[k] === thisOperator) {
            console.log(copyStack);
            operatorIsIn = true;

            // 연산의 결과를 저장함
            let calcResult;

            // 연산자의 위치인 k의 앞(k-1)과 뒤(k+1)를 연산자로 연산함
            if (thisOperator === "+") {
              calcResult = copyStack[k - 1] + copyStack[k + 1];
            } else if (thisOperator === "-") {
              calcResult = copyStack[k - 1] - copyStack[k + 1];
            } else {
              calcResult = copyStack[k - 1] * copyStack[k + 1];
            }

            // k-1, k, k+1를 날려버리고 (splice로 k-1부터 3개를 날림)
            // 거기에 연산의 결과를 넣음
            copyStack.splice(k - 1, 3, calcResult);

            // 스택의 크기가 변경되었으므로 안쪽 반복문을 break로 멈추고, 다시 연산을 수행함 (operatorIsIn을 true로 변경해놨기 때문에, while문이 반복된다.)
            // (다른 방법으로는 스택에서 3개를 삭제되고 1개를 추가됐기 때문에, 반복문에 쓰이는 k의 값을 k=k-2 해도 된다.
            // 하지만, break하고 다시 수행하는 것이 좀 더 명확하기에 이렇게 풀이했다.)
            break;
          }
        }
      }
    }
    console.log("--------");
    console.log(`결과 : ${copyStack}`);
    console.log("--------");
    console.log("--------------------------");

    // 모든 연산이 완료되면 stack에는 모든 연산이 수행된 후의 결과가 남는다.
    // 해당 결과가 answer보다 크다면 answer의 값을 갱신한다.
    if (answer < Math.abs(copyStack[0])) {
      answer = Math.abs(copyStack[0]);
    }
  }

  return answer;
}
