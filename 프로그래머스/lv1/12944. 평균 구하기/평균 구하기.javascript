function solution(arr) {
    var answer = 0;
    
    let sum = 0;
    
    for(let i=0; i<arr.length; i++) {
        sum = sum + arr[i];
    }
    
    let avg = sum / arr.length;
    
    answer = avg;
    
    return answer;
}