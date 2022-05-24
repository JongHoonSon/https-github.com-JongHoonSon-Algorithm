function solution(n) {
    var answer = 0;
    
    let biggerNum = n;
    let cnt1 = 0;
    
    if(n === 1) {
        cnt1 = 1;
    } else {
        while(n !== 1) {
            if(n%2 === 1) {
                cnt1++;
            }
            n = Math.floor(n/2);
        }    
    }
    
    while(true) {
        biggerNum++;
        let cnt2 = 0;
        let calcN = biggerNum;
        while(calcN !== 1) {
            if(calcN%2 === 1) {
                cnt2++;
            }
            calcN = Math.floor(calcN/2);
        }
        if(cnt1 === cnt2) {
            answer = biggerNum;
            break;
        }
    }
    
    return answer;
}