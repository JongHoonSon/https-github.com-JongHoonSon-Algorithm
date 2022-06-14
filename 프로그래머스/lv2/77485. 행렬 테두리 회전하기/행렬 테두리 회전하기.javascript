function solution(rows, columns, queries) {
    var answer = [];
    
    let arr = new Array(rows);
    
    let num = 1;
    
    for(let i=0; i<arr.length; i++) {
        arr[i] = new Array();
        for(let j=0; j<columns; j++) {
            arr[i].push(num++);
        }
    }
    
    for(let i=0; i<queries.length; i++) {
        let [x1, y1, x2, y2] = queries[i];
        
        let [resultArr, minValue] = rotation(arr, x1-1, y1-1, x2-1, y2-1);
        arr = resultArr;
        answer.push(minValue);
    }
    
    return answer;
}

function rotation(arr, x1, y1, x2, y2) {
    let temp = arr[x1][y1];
    
    for(let i=x1; i<=x2-1; i++) {
        arr[i][y1] = arr[i+1][y1];
    }
    
    for(let i=y1; i<=y2-1; i++) {
        arr[x2][i] = arr[x2][i+1];
    }
    
    for(let i=x2; i>=x1+1; i--) {
        arr[i][y2] = arr[i-1][y2]
    }
    
    for(let i=y2; i>=y1+2; i--) {
        arr[x1][i] = arr[x1][i-1];
    }
    
    arr[x1][y1+1] = temp;
    
    let elementArr = [];
    
    for(let i=x1; i<=x2; i++) {
        elementArr.push(arr[i][y1]);
    }
    
    for(let i=x1; i<=x2; i++) {
        elementArr.push(arr[i][y2]);
    }
    
    for(let i=y1+1; i<=y2-1; i++) {
        elementArr.push(arr[x1][i]);
    }
    
    for(let i=y1+1; i<=y2-1; i++) {
        elementArr.push(arr[x2][i]);
    }
    
    let minValue = Math.min(...elementArr);
    
    return [arr, minValue];
}