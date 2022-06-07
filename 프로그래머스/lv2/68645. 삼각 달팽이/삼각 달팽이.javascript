function solution(n) {
    var answer = [];
    
    let arr = new Array(n);
    
    for(let i=0 ;i<arr.length; i++) {
        arr[i] = new Array();
    }
    
    let moveLength = n;
    
    let col = 0;
    let row = -1;
    let num = 1;
    
    
    while(moveLength > 0) {
        for(let i=0; i<moveLength; i++) {
            arr[++row][col] = num++;
        }
        
        moveLength--;
        
        for(let i=0; i<moveLength; i++) {
            arr[row][++col] = num++;
        }
        
        moveLength--;
        
        for(let i=0; i<moveLength; i++) {
            arr[--row][--col] = num++;
        }
        
        moveLength--;
    }
    
    for(let i=0 ;i<arr.length; i++) {
        for(let j=0; j<arr[i].length; j++) {
            answer.push(arr[i][j]);
        }
    }
    
    return answer;
}