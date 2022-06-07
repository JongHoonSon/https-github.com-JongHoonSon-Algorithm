function solution(dirs) {
    var answer = 0;
    
    let x = 0;
    let y = 0;
    
    let dirsArr = dirs.split("");
    let path = [];
    
    for(let i=0; i<dirsArr.length; i++) {
        
        let xMove=0;
        let yMove=0;
        
        if(dirsArr[i] === "U") {
            if(y===5) {
                 continue;
            }
            yMove=1;
        } else if(dirsArr[i] === "D") {
            if(y===-5) {
                continue;
            }
            yMove=-1;
        } else if(dirsArr[i] === "L") {
            if(x===5) {
                continue;
            }
            xMove=1;
        } else {
            if(x===-5) {
                continue;  
            }
            xMove=-1;
        }
        
        let alreadyUsedFlag = false;
        
        for(let i=0; i<path.length; i++) {
            let history = path[i];
            
            if((history.from.x === x && history.from.y === y && history.to.x === x+xMove && history.to.y === y+yMove) || (history.to.x === x && history.to.y === y && history.from.x === x+xMove && history.from.y === y+yMove)) {
                alreadyUsedFlag = true;
            }
        }
        
        if(alreadyUsedFlag === false) {
            path.push({from:{x:x, y:y}, to:{x:x+xMove, y:y+yMove}});
            path.push({from:{x:x+xMove, y:y+yMove}, to:{x:x, y:y}});
        }
            
        x += xMove;
        y += yMove;
    }
    
    answer = path.length/2;
    
    return answer;
}