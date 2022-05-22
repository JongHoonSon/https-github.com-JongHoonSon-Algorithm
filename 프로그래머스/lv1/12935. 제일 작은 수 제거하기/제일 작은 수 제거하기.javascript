function solution(arr) {
    var answer = [];
    
    let smallNum = Infinity;
    let smallNumIndex;
    
    for(let i=0; i<arr.length; i++) {
        if(smallNum > arr[i]) {
            smallNum = arr[i];
            smallNumIndex = i;
        }
    }
    
    arr.splice(smallNumIndex, 1);
    
    if(arr.length === 0) {
        arr.push(-1);
    }
    
    answer = arr;
    
    return answer;
}