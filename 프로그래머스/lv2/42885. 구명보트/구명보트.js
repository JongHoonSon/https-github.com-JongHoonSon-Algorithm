function solution(people, limit) {
  var answer = 0;

  people.sort((a, b) => a - b);

  let front = 0;
  let back = people.length - 1;

  let cnt = 0;

  while (true) {
    if (back === front) {
      cnt++;
      break;
    } else if (front - 1 === back) {
      break;
    } else {
      if (people[front] + people[back] <= limit) {
        front++;
        back--;
      } else {
        back--;
      }
    }
    cnt++;
  }

  answer = cnt;

  return answer;
}
