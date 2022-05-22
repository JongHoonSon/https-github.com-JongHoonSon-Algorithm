function solution(n) {
    var answer = [];
    
    let stringN = n.toString();
    
    let arrN = stringN.split("");
    
    let flipedArr = [];
    
    while(arrN.length !==0) {
        const a = arrN.pop();
        flipedArr.push(+a);
    }
    
    answer = flipedArr;
    
    return answer;
}