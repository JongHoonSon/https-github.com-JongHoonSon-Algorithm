function solution(expression) {
  let answer = 0;

  // console.log(expression);

  let expArr = expression.split("");

  let operatorSet = new Set();

  for (let i = 0; i < expArr.length; i++) {
    if (isNaN(expArr[i])) {
      operatorSet.add(expArr[i]);
    }
  }

  let operatorArr = Array.from(operatorSet);

  // console.log(operatorArr);

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
  let stack = [];

  console.log(expArr);

  let numbers = "";
  for (let i = 0; i < expArr.length; i++) {
    if (i === expArr.length - 1) {
      numbers = numbers + expArr[i];
      stack.push(Number(numbers));
    } else if (!isNaN(expArr[i])) {
      numbers = numbers + expArr[i];
    } else {
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
    let copyStack = JSON.parse(JSON.stringify(stack));
    let operatorPriorityArr = BT_results[i].split("");

    // 각 연산자 우선순위의 연산자에 대한 반복
    for (let j = 0; j < operatorPriorityArr.length; j++) {
      let thisOperator = operatorPriorityArr[j];
      let operatorIsIn = true;

      while (operatorIsIn === true) {
        operatorIsIn = false;

        for (let k = 0; k < copyStack.length; k++) {
          if (copyStack[k] === thisOperator) {
            console.log(copyStack);
            operatorIsIn = true;

            let calcResult;

            if (thisOperator === "+") {
              calcResult = copyStack[k - 1] + copyStack[k + 1];
            } else if (thisOperator === "-") {
              calcResult = copyStack[k - 1] - copyStack[k + 1];
            } else {
              calcResult = copyStack[k - 1] * copyStack[k + 1];
            }

            copyStack.splice(k - 1, 3, calcResult);
            break;
          }
        }
      }
    }
    console.log("--------");
    console.log(`결과 : ${copyStack}`);
    console.log("--------");
    console.log("--------------------------");

    if (answer < Math.abs(copyStack[0])) {
      answer = Math.abs(copyStack[0]);
    }
  }

  return answer;
}
