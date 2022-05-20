function solution(genres, plays) {
  var answer = [];

  let n = genres.length;
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

  let countPerGenre = new Map();

  for (let i = 0; i < n; i++) {
    if (!countPerGenre.has(genres[i])) {
      countPerGenre.set(genres[i], 0);
    }
  }

  console.log("sumPlayPerGenre");
  console.log(sumPlayPerGenre);

  let musicInfo = [];

  for (let i = 0; i < n; i++) {
    musicInfo.push({
      id: i,
      genre: genres[i],
      sumPlayOfGenre: sumPlayPerGenre.get(genres[i]),
      play: plays[i],
      rank: -1,
    });
  }

  console.log("musicInfo");
  console.log(musicInfo);

  musicInfo.sort((a, b) => {
    if (a.sumPlayOfGenre > b.sumPlayOfGenre) {
      return -1;
    } else if (a.sumPlayOfGenre === b.sumPlayOfGenre) {
      if (a.play > b.play) {
        return -1;
      } else if (a.play === b.play) {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        }
      } else if (a.play < b.play) {
        return 1;
      }
    } else if (a.sumPlayOfGenre < b.sumPlayOfGenre) {
      return 1;
    }
  });

  console.log("--------------after sort--------------");

  console.log("musicInfo");
  console.log(musicInfo);

  for (let i = 0; i < n; i++) {
    const obj = musicInfo[i];
    if (countPerGenre.get(obj.genre) >= 2) {
      continue;
    } else {
      countPerGenre.set(obj.genre, countPerGenre.get(obj.genre) + 1);
      answer.push(obj.id);
    }
  }

  return answer;
}
