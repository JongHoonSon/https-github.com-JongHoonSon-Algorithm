function solution(operations) {
  var answer = [];

  let queue = [];

  operations.forEach((el) => {
    const [operation, value] = el.trim().split(" ");

    if (operation === "I") {
      queue.push(+value);
      queue.sort((a, b) => a - b);
    } else {
      if (value === "1") {
        queue.pop();
      } else if (value === "-1") {
        queue.shift();
      }
    }
  });

  if (queue.length === 0) {
    answer = [0, 0];
  } else {
    answer = [queue[queue.length - 1], queue[0]];
  }

  return answer;
}
