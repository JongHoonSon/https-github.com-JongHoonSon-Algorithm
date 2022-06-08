function solution(s) {
    var answer = [];
    
    let deletedZeroCnt = 0;
    let transCnt = 0;
    
    while(true) {
        let sArr = s.split("");
    
        console.log(sArr);
        
        for(let i=0; i<sArr.length; i++) {
            if(sArr[i] === "0") {
                sArr[i] = "";
                deletedZeroCnt++;
            }
        }
        
        let newS = sArr.join("");
        
        let length = newS.length;
        
        if(length === 1) {
            transCnt++;
            break;
        } else {
            transCnt++;
            s = length.toString(2);
        }
    }
    
    answer = [transCnt, deletedZeroCnt];
    
    return answer;
}