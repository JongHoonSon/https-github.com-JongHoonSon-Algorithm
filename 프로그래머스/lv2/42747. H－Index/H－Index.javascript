function solution(citations) {
    var answer = 0;
    
    citations.sort((a,b) => a-b);
    
    let max = citations[0];
    
    for(let i=0; i<=citations.length; i++) {
        let cnt=0;
        for(let j=0; j<citations.length; j++) {
            if(citations[j] >= i) {
                cnt++;
            }
        }
        if(cnt >= i) {
            max = i
        }
    }
    
    answer = max;
    
    return answer;
}