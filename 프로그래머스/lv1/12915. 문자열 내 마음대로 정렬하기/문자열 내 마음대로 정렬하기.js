function solution(strings, n) {
  var answer = [];

  strings.sort((a, b) => {
    if (a[n] > b[n]) return 1;
    if (a[n] < b[n]) return -1;
    if (a[n] === b[n]) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
  });

  answer = strings;

  return answer;
}

// 문제 풀이 접근 방식

// sort를 이용해서 문자 a와 문자 b의 n번째 index의 값을 비교해서
// 정렬을 수행하는 방법으로 풀 수 있다.

// 기존 내 풀이는 아래와 같다.
// return을 a[n] - a[n]으로 하려다보니, 문자열 끼리 뺄셈이 안되어
// 아스키코드로 변환 후 뺼셈을 하였다.
// 그냥 위 방식대로 문자열을 대소 비교 후 'return 숫자' 를 해주는 것이 좀더 직관적이다.

// function solution(strings, n) {
//     var answer = [];

//     strings.sort((a, b) => {
//         if(a[n] !== b[n]) {
//             return a[n].charCodeAt() - b[n].charCodeAt();
//         } else {
//             for(let i=0; i<a.length; i++) {
//                 if(a[i] === b[i]) {
//                     continue;
//                 }
//                 return a[i].charCodeAt() - b[i].charCodeAt();
//             }
//         }
//     });

//     answer = strings;

//     return answer;
// }
