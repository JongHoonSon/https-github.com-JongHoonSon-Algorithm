function solution(user_id, banned_id) {
  var answer = [];

  let check = new Array(user_id.length).fill(false);

  let arr = [];
  let results = [];

  // 응모자 중에서 불량 사용자의 수만큼 고르는 모든 조합을 BT를 이용해 찾음
  // 찾은 결과 : results에 저장
  BT(0);

  // console.log(results);

  // 각 조합을 문자열에서 배열 형태로 변경함
  for (let i = 0; i < results.length; i++) {
    results[i] = results[i].split(",");
  }

  console.log(results);
  console.log("------------");

  // BT 결과 (길이가 같은 조합)
  // 100개 이하
  first: for (let i = 0; i < results.length; i++) {
    let allFound = true;
    let used_banned_id_arr = new Array(results[i].length).fill(false);

    // 각 조합을 구성하는 응모자의 아이디
    // 최대 8개
    second: for (let j = 0; j < results[i].length; j++) {
      let result_id_arr = results[i][j].split("");

      let found = false;

      let used_banned_id_index;

      // 각 불량 사용자의 아이디
      // 최대 8개
      for (let k = 0; k < banned_id.length; k++) {
        if (used_banned_id_arr[k] === true) {
          continue;
        }

        let banned_id_arr = banned_id[k].split("");

        if (result_id_arr.length !== banned_id_arr.length) {
          continue;
        }

        used_banned_id_index = k;
        let allLettersSame = true;

        // 각 응모자의 아이디와 불량 사용자의 아이디의 문자를 비교
        // 최대 8개
        for (let m = 0; m < result_id_arr.length; m++) {
          // 불량 사용자의 아이디의 m번 인덱스의 값이 *인 경우
          // 응모자 아이디에서 어떤 문자가 오든 상관 없으므로 continue로 넘어감
          if (banned_id_arr[m] === "*") {
            continue;

            // 불량 사용자의 아이디의 m번 인덱스의 값이
            // 응모자 아이디의 m번 인덱스의 값과 다른 경우
            // (두 아이디는 일치할 수 없음)
          } else {
            if (banned_id_arr[m] !== result_id_arr[m]) {
              // 모든 문자가 같은지 체크하는 allLettersSame을 false로 변경하고 종료함
              allLettersSame = false;
              break;
            }
          }
        }

        // 현재 응모자 아이디와 특정 불량 사용자의 모든 문자가 같은 경우

        // found를 true로 변경하고,
        // 응모자 아이디의 조합에 들어있는 다른 응모자 아이디가
        // 방금 짝을 찾은 응모자 아이디의 짝인 불량 사용자의 아이디와 비교하지 않도록 하기위해
        // used_banned_id_arr에 체크한다.
        if (allLettersSame === true) {
          found = true;
          used_banned_id_arr[used_banned_id_index] = true;
          break;
        }
      }

      // 현재 응모자 아이디와 특정 불량 사용자의 모든 문자가 같지 않은 경우

      // 응모자 아이디의 조합 중에서 현재 확인 중인 응모자 아이디와 일치할 수 있는
      // 불량 사용자의 아이디가 없다는 것이므로
      // 결국 조합의 모든 응모자 아이디가 모든 불량 사용자 아이디와 1대1로 매치될 수는 없다는 것이므로
      // allFound를 false로 변경하고, 다음 응모자 조합을 이어서 탐색하기 위해 second 반복문을 종료시킴
      if (found === false) {
        allFound = false;
        break second;
      }
    }

    // 응모자 아이디의 조합의 모든 응모자 아이디가 모든 불량 사용자 아이디와 1대1로 매치되는 경우

    // 정답을 찾았으므로, answer에 응모자 아이디의 조합을 push함
    if (allFound === true) {
      answer.push(results[i]);
    }
  }

  function BT(step) {
    if (step === banned_id.length) {
      results.push(arr.join(","));
      return false;
    }

    for (let i = 0; i < user_id.length; i++) {
      if (check[i] === true) {
        continue;
      }

      check[i] = true;
      arr.push(user_id[i]);
      BT(step + 1);
      check[i] = false;
      arr.pop();
    }
  }

  // 구한 각 응모자 아이디의 조합을 정렬함
  for (let i = 0; i < answer.length; i++) {
    answer[i].sort();
  }

  console.log(answer);
  console.log("------------");

  // 중복되는 조합을 없애기 위해 JSON 형태로 Set에 넣었다가 뺌
  let answerSet = new Set();

  for (let i = 0; i < answer.length; i++) {
    answerSet.add(JSON.stringify(answer[i]));
  }

  answer = Array.from(answerSet);

  for (let i = 0; i < answer.length; i++) {
    answer[i] = JSON.parse(answer[i]);
  }

  // answer 출력
  console.log(answer);

  return answer.length;
}

// 문제 풀이 접근 방식

// 응모자 아이디에서 불량 사용자의 수만큼을 조합하는 경우를 모두 찾기 위해
// BT를 이용해서 불량 사용자의 수와 같은 길이의 응모자 아이디의 모든 조합을 찾고,
// 각 조합의 모든 아이디가 불량 사용자에 해당할 수 있는지를 체크하고,
// 해당할 수 있는 조합만을 추린 뒤에
// 각 조합의 구성이 같은 경우 (ex) 조합1: A,B, 조합2: B,A 와 같은 경우)를
// 추리기 위해 Set에 한 번 넣었다가 꺼내서 중복을 제거한다.

// 위 과정을 거치면 응모자 아이디의 조합 중에서
// 불량 사용자에 해당할 수 있는 조합의 수를 찾을 수 있다.

// BT로 모든 조합을 구한 다음 맞춰보는 이유 :

// 문제에서 주어지는 입출력 예#3 때문,

// 만약 불량 사용자의 아이디 중에 fr*d*와 *rodo가 있는 경우
//frodo는 양쪽에 다 해당될 수도 있고, fradi는 fr*d*에만 해당될 수 있다.

// 만약 BT로 모든 조합을 구하지 않고, 오름차순으로 구했을 경우
// 응모자 아이디의 조합은 무조건 frodo -> fradi 순서로 찾게 될 것이고,

// 각 응모자 아이디의 짝을 찾는 과정에서 불량 사용자 아이디의 맨 앞에 있는
// fr*d*는 frodo가 조합에 있었다면 frodo가
// frodo가 조합에 없고 fradi가 있었다면 fradi가 사용하게 되는데,

// 경우에 따라 fr*d*는 fradi가 사용하고, *rodo는 frodo가 사용할 수도 있어야 하는데
// 아까 말한대로 BT가 오름차순으로 구하기 때문에 frodo 가 있다면
// frodo는 *rodo의 앞쪽에서 나타나는 fr*d* 를 무조건 취하게 된다.
// 따라서 frodo와 fradi가 같이나온다면 fr*d*는 무조건 frodo 것이므로

// frodo가 *rodo를 갖고, fradi가 fr*d*를 갖는 가장 효율적인 상황을 만들 수 없다.
// 따라서 BT를 오름차순으로 구하지않고 모든 경우를 다 구한 뒤,
// 중복되는 것을 없애면
// fradi에서 frodo로 이어지는 내림차순의 조합도 구할 수 있으므로 문제에서 원하는 답을 도출할 수 있다.
