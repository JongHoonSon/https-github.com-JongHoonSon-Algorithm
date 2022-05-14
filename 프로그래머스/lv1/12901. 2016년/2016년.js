function solution(a, b) {
  var answer = "";

  // 1월 1일이 금요일인 것을 감안하고,
  // 1월 0일로부터 N일 떨어진 날의 요일은
  // N을 7로 나눈 나머지 값을 days 배열의 index로 갖는 요일임
  // ex) 1월 1일은 1월 0일로부터 1일 떨어져 있고
  // 1%7 === 1 이므로, days[1]인 "FRI"가 1월 1일의 요일이 됨
  let days = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"];

  // 2016년에 각 달의 날짜 수
  let daysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 2016년 1월 0일부터 a월 b일까지의 몇 일 차이인지 저장할 변수
  let totalDays = 0;

  // a-1월까지의 각 월마다 존재하는 날짜를 누적
  for (let i = 0; i < a - 1; i++) {
    totalDays = totalDays + daysPerMonth[i];
  }

  // a월에서 b일의 값을 저장
  totalDays = totalDays + b;

  console.log("totalDays", totalDays);

  // totalDays를 7로 나눈 나머지 값을 days 배열의 index로 하여 요일을 구함
  let day = days[totalDays % 7];

  answer = day;

  return answer;
}
