function solution(numbers) {
    var answer = [];
    
    let numSet = new Set();
    
    for(let i=0; i<numbers.length; i++) {
        for(let j=0; j<numbers.length; j++) {
            if(i===j) {
                continue;
            }
            
            let newNum = numbers[i] + numbers[j];
            
            numSet.add(newNum);
        }
    }
    
    let numArray = Array.from(numSet);
    
    numArray.sort((a,b) => a-b);
    
    answer = numArray
    
    return answer;
}