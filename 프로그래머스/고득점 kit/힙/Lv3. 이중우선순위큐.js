function solution(operations) {
  var answer = [];

  let stack = [];

  for (let i = 0; i < operations.length; i++) {
    let [operator, value] = operations[i].split(" ");

    if (operator === "I") {
      stack.push(+value);
    } else if (operator === "D") {
      if (+value === 1) {
        if (stack.length > 0) {
          stack.pop();
        }
      } else if (+value === -1) {
        if (stack.length > 0) {
          stack.shift();
        }
      }
    }

    if (stack.length > 1) {
      stack.sort((a, b) => a - b);
    }
  }

  if (stack.length === 0) {
    answer = [0, 0];
  } else {
    answer = [stack[stack.length - 1], stack[0]];
  }

  return answer;
}
