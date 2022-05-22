function solution(n) {
    var answer = 0;
    
    let strN = n.toString();
    
    let arrN = strN.split("");
    
    let newArr = [];
    
    while(arrN.length !== 0) {
        let bigIndex;
        let bigNum = 0;
        
        for(let i=0; i<arrN.length; i++) {
            if(arrN[i] > bigNum) {
                bigNum = arrN[i];
                bigIndex = i;
            }
        }
        
        arrN.splice(bigIndex, 1);
        newArr.push(bigNum);
    }
    
    answer = +newArr.join("")
    
    return answer;
}