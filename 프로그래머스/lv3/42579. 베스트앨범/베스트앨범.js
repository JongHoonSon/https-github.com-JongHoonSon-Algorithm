function solution(genres, plays) {
  var answer = [];

  let n = genres.length;

  // 1. 장르별 play 수를 저장하는 Map
  let sumPlayPerGenre = new Map();

  for (let i = 0; i < n; i++) {
    if (sumPlayPerGenre.has(genres[i])) {
      sumPlayPerGenre.set(genres[i], sumPlayPerGenre.get(genres[i]) + plays[i]);
    } else {
      sumPlayPerGenre.set(genres[i], plays[i]);
    }
  }

  console.log("sumPlayPerGenre");
  console.log(sumPlayPerGenre);

  // 2. 장르별로 2개씩만 뽑기 위한 Map
  let countPerGenre = new Map();

  for (let i = 0; i < n; i++) {
    if (!countPerGenre.has(genres[i])) {
      countPerGenre.set(genres[i], 0);
    }
  }

  console.log("sumPlayPerGenre");
  console.log(sumPlayPerGenre);

  // 각 음악의 정보를 객체 배열 형태로 갖고 있는 musicInfo
  let musicInfo = [];

  // 각 음악 객체의 속성
  // id : 고유번호
  // genre : 장르
  // sumPlayOfGenre : 본인이 속한 장르의 총 play 수
  // play : 재생 수
  for (let i = 0; i < n; i++) {
    musicInfo.push({
      id: i,
      genre: genres[i],
      sumPlayOfGenre: sumPlayPerGenre.get(genres[i]),
      play: plays[i],
    });
  }

  console.log("musicInfo");
  console.log(musicInfo);

  // musicInfo를 문제의 조건대로 정렬함

  // 문제 조건
  // 1. 재생 수가 많은 장르
  // 2. 재생 수가 많은 노래
  // 3. 고유번호가 낮은 노래
  musicInfo.sort((a, b) => {
    // 1를 기준으로 정렬
    if (a.sumPlayOfGenre < b.sumPlayOfGenre) {
      return 1;
    } else if (a.sumPlayOfGenre > b.sumPlayOfGenre) {
      return -1;

      // 1을 기준으로 정렬이 안된다면
    } else if (a.sumPlayOfGenre === b.sumPlayOfGenre) {
      // 2를 기준으로 정렬
      if (a.play < b.play) {
        return 1;
      } else if (a.play > b.play) {
        return -1;

        // 2를 기준으로 정렬이 안된다면
      } else if (a.play === b.play) {
        // 3을 기준으로 정렬
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        }
      }
    }
  });

  console.log("--------------after sort--------------");

  console.log("musicInfo");
  console.log(musicInfo);

  // 정렬 후, 가장 우선 순위가 높은 객체부터 하나씩 반복
  for (let i = 0; i < n; i++) {
    // obj에 객체 저장
    const obj = musicInfo[i];

    // 만약 obj를 이미 2번 이상 answer에 넣었다면 (2개를 넣었다면)
    if (countPerGenre.get(obj.genre) >= 2) {
      // 넘어감
      continue;

      // 만약 obj를 2번 미만으로 answer에 넣었다면 (0개, 1개를 넣었다면)
    } else {
      // answer에 넣음
      answer.push(obj.id);

      // countPerGenre에서 obj.genre의 값 + 1
      countPerGenre.set(obj.genre, countPerGenre.get(obj.genre) + 1);
    }
  }

  return answer;
}

// 문제 풀이 접근 방식

// 주어진 정보를 가지고, 객체 배열을 만들고,
// 객체 배열을 기준에 따라 정렬한 후, 몇몇 객체만을 고르는 문제이다.

// 먼저 입력 정보를 바탕으로 객체 배열을 만들기 이전에,
// 각 장르의 play수를 저장하는 Map을 하나 만들고,
// i번째 곡의 정보를 바탕으로 객체를 만들면서
// i번째 곡이 속한 장르의 총 play도 해당 객체의 속성으로 추가한다.
// 그 이후
