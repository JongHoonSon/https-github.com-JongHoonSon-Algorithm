function solution(genres, plays) {
  var answer = [];

  // 1. 장르를 key로 갖고,
  // 해당 장르에 속하는 곡을 배열 형태의 value로 갖는
  // Map 생성

  let genresMap = new Map();

  for (let i = 0; i < genres.length; i++) {
    let [genre, play] = [genres[i], plays[i]];

    if (genresMap.has(genre)) {
      genresMap.set(genre, [...genresMap.get(genre), { i, play }]);
    } else {
      genresMap.set(genre, [{ i, play }]);
    }
  }

  console.log(genresMap);

  console.log("--------");

  // 2. Map을 Array로 변환함

  let genresArr = Array.from(genresMap, ([name, arr]) => ({ name, arr }));

  for (let i = 0; i < genresArr.length; i++) {
    console.log(genresArr[i].name);
    let arr = genresArr[i].arr;

    for (let j = 0; j < arr.length; j++) {
      console.log(arr[j]);
    }
  }

  console.log("--------");

  // 3. 각 장르에 속하는 곡을 play 값으로 정렬

  genresArr.forEach((el) => {
    el.arr.sort((a, b) => {
      return b.play - a.play;
    });
  });

  for (let i = 0; i < genresArr.length; i++) {
    console.log(genresArr[i].name);
    let arr = genresArr[i].arr;

    for (let j = 0; j < arr.length; j++) {
      console.log(arr[j]);
    }
  }

  console.log("--------");

  // 4. 각 장르를 각 장르에 속하는 곡의 play 값의 합(=장르별 재생횟수)을
  // 기준으로 정렬함

  genresArr.sort((a, b) => {
    let sumA = 0;
    let sumB = 0;

    for (let i = 0; i < a.arr.length; i++) {
      sumA += a.arr[i].play;
    }

    for (let i = 0; i < b.arr.length; i++) {
      sumB += b.arr[i].play;
    }

    return sumB - sumA;
  });

  for (let i = 0; i < genresArr.length; i++) {
    console.log(genresArr[i].name);
    let arr = genresArr[i].arr;

    for (let j = 0; j < arr.length; j++) {
      console.log(arr[j]);
    }
  }

  console.log("--------");

  // 5. 각 장르 별로 2개 씩 곡 추출

  for (let i = 0; i < genresArr.length; i++) {
    let arr = genresArr[i].arr;

    if (arr.length >= 2) {
      answer.push(arr[0].i);
      answer.push(arr[1].i);
    } else if (arr.length === 1) {
      answer.push(arr[0].i);
    }
  }

  return answer;
}
