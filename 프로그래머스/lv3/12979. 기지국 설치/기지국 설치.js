function solution(n, stations, w) {
  var answer = 0;

  // 기지국 1개 당 영향 범위
  let length = w * 2 + 1;

  // 새로 설치해야하는 기지국의 수
  let stationCnt = 0;

  // A. 첫 기지국의 앞쪽의 구간에 필요한 기지국의 수 계산

  // 첫 기지국의 영향범위 중 시작지점
  let firstStationStartPosition = stations[0] - w;

  // 첫 기지국의 영향범위 중 시작지점이 2보다 크면
  // (= 첫 기지국의 영향범위에 들지 않는 아파트가 첫 기지국 앞쪽에 존재하면)
  if (firstStationStartPosition >= 2) {
    // 해당 구간의 범위 (firstStationStartPosition - 1)를 기지국의 영향범위로 나눠서
    // 해당 구간에 필요한 기지국의 수를 구함
    stationCnt += Math.ceil((firstStationStartPosition - 1) / length);
  }

  // B. 마지막 기지국의 뒷쪽의 구간에 필요한 기지국의 수 계산

  // 마지막 기지국의 영향범위 중 종료지점
  let lastStationEndPosition = stations[stations.length - 1] + w;

  // 마지막 기지국의 영향범위 중 종료지점이 n-1보다 작으면
  // (= 마지막 기지국의 영향범위에 들지 않는 아파트가 마지막 기지국 뒤쪽에 존재하면)
  if (lastStationEndPosition <= n - 1) {
    // 해당 구간의 범위 (n - lastStationEndPosition)를 기지국의 영향범위로 나눠서
    // 해당 구간에 필요한 기지국의 수를 구함
    stationCnt += Math.ceil((n - lastStationEndPosition) / length);
  }

  // C. 첫번째 기지국과 마지막 기지국 사이의 구간에 필요한 기지국의 수 계산

  // 각 기지국을 반복
  for (let i = 1; i < stations.length; i++) {
    // 이전 기지국 영향범위의 종료지점
    let prevStationEndPosition = stations[i - 1] + w;

    // 현재 기지국 영향범위의 시작지점
    let nowStationStartPosition = stations[i] - w;

    // 사이 구간에 들어가야하는 기지국의 수 계산
    stationCnt += Math.ceil(
      (nowStationStartPosition - prevStationEndPosition - 1) / length
    );
  }

  answer = stationCnt;

  return answer;
}

// 문제 풀이 접근 방식

// 기지국을 설치해야하는 구간은 총 3가지로 나눌 수 있다.

// A. 첫 기지국의 영향범위 이전의 구간
// B. 각 기지국의 영향범위 사이의 구간
// C. 마지막 기지국의 영향범위 이후의 구간

// 각 구간의 길이를 구하고,
// 새로 기지국을 설치할 경우 1대의 영향범위인 w*2 + 1
// (1 : 기지국 본인의 위치
// w*2 : 기지국의 영향범위*앞뒤)

// 로 나눈 값을 올림하여 사용하면 된다.

// 예를 들어 구간의 길이가 6이고 (= 새로 기지국을 설치해야하는 아파트의 길이)
// 기지국 1개의 영향범위가 5이면,
// 해당 구간에는 2개의 기지국을 설치해야하고,

// 이를 수식으로 나타내면 다음과 같다.
// Math.ceil((구간의 길이)/(기지국의 영향범위)) => Math.ceil(6/5) => 2

// 그렇게 A, B, C 모든 구간에서 설치해야하는 기지국의 수를 합하면
// 문제에서 요구하는 추가로 설치해야하는 기지국의 수를 구할 수 있다.
