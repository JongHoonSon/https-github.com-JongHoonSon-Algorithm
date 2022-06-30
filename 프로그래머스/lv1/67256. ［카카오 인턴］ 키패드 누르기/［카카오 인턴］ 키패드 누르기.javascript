function solution(numbers, hand) {
    var answer = '';
    
    let nowLeftPos = {row:4, col:1};
    let nowRightPos = {row:4, col:3}; 
    
    for(let i=0; i<numbers.length; i++) {
        let thisNumber = numbers[i];
        
        
        if(thisNumber === 1 || thisNumber === 4 || thisNumber === 7) {
            answer = answer + "L";
            
            if(thisNumber === 1) {
                nowLeftPos = {row:1, col:1};
            } else if(thisNumber === 4) {
                nowLeftPos = {row:2, col:1};
            } else if(thisNumber === 7) {
                nowLeftPos = {row:3, col:1};
            }
        } else if(thisNumber === 3 || thisNumber === 6 || thisNumber === 9) {
            answer = answer + "R";
            
            if(thisNumber === 3) {
                nowRightPos = {row:1, col:3};
            } else if(thisNumber === 6) {
                nowRightPos = {row:2, col:3};
            } else if(thisNumber === 9) {
                nowRightPos = {row:3, col:3};
            }
        } else {
            let thisPos;
            let leftGap;
            let rightGap;
            
            if(thisNumber === 2) {
                thisPos = {row:1, col:2};
            } else if(thisNumber === 5) {
                thisPos = {row:2, col:2};
            } else if(thisNumber === 8) {
                thisPos = {row:3, col:2};
            } else if(thisNumber === 0) {
                thisPos = {row:4, col:2};
            }
            
            leftGap = Math.abs(nowLeftPos.row - thisPos.row) + Math.abs(nowLeftPos.col - thisPos.col)
            rightGap = Math.abs(nowRightPos.row - thisPos.row) + Math.abs(nowRightPos.col - thisPos.col)
            
            if(leftGap > rightGap) {
                nowRightPos = thisPos;
                answer = answer + "R";
            } else if(leftGap < rightGap) {
                nowLeftPos = thisPos;
                answer = answer + "L";
            } else {
                if(hand === "left") {
                    nowLeftPos = thisPos;
                    answer = answer + "L";
                } else {
                    nowRightPos = thisPos;
                    answer = answer + "R";
                }
            }
        }
    }
    
    return answer;
}