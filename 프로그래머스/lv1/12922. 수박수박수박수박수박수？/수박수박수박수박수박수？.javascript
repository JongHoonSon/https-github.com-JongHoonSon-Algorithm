function solution(n) {
    var answer = '';
    
    let string = '';
    
    for(let i=0; i<n; i++) {
        if(i%2===0) {
            string = string + "수";
        } else {
            string = string + "박";
        }
    }
    
    answer = string;
    
    return answer;
}