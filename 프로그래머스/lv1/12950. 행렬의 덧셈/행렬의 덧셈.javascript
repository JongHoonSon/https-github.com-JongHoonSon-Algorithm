function solution(arr1, arr2) {
    var answer = [[]];
    
    // console.log(arr1[0][0]);

    let newArr = new Array(arr1.length);
    
    for(let i=0; i<newArr.length; i++) {
        newArr[i] = new Array(arr1[i].length);
    }
    
    for(let i=0; i<arr1.length; i++) {
        for(let j=0; j<arr1[i].length; j++) {
            newArr[i][j] = arr1[i][j] + arr2[i][j];            
        }
    }
    
    answer = newArr;
    
    return answer;
}