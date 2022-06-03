function solution(n, stations, w) {
    var answer = 0;
    
    let length = w*2 + 1;
    
    let stationCnt = 0;
    
    let firstStationStartPosition = stations[0] - w;
    
    if(firstStationStartPosition >= 2) {
        stationCnt += Math.ceil((firstStationStartPosition-1)/length)
    }
    
    let lastStationEndPosition = stations[stations.length-1] + w;
    
    if(lastStationEndPosition <= n-1) {
        stationCnt += Math.ceil((n-lastStationEndPosition)/length)
    }
    
    for(let i=1; i<stations.length; i++) {
        let prevStationEndPosition = stations[i-1] + w;
        
        let nowStationStartPosition = stations[i] - w;
        
        stationCnt += Math.ceil((nowStationStartPosition - prevStationEndPosition -1)/length); 
    }
    
    answer = stationCnt;

    return answer;
}