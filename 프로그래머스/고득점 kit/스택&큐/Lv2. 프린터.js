function solution(priorities, location) {
  var answer = 0;

  let cnt = 0;

  let prioritiesLength = priorities.length;

  let printedHistory = [];

  for (let i = 0; i < priorities.length; i++) {
    priorities[i] = { index: i, value: priorities[i] };
  }

  console.log(priorities);

  let max = getMax(priorities);

  while (cnt !== prioritiesLength) {
    if (priorities[0].value === max) {
      printedHistory.push(priorities[0].index);
      priorities.shift();
      cnt++;
      max = getMax(priorities);
    } else {
      priorities.push(priorities.shift());
    }
  }

  console.log(printedHistory);

  for (let i = 0; i < printedHistory.length; i++) {
    if (printedHistory[i] === location) {
      answer = i + 1;
      break;
    }
  }

  return answer;
}

function getMax(arr) {
  let max = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i].value) {
      max = arr[i].value;
    }
  }

  return max;
}
