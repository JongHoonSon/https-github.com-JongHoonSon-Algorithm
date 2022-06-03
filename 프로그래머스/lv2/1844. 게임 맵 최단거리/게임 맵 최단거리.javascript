function solution(maps) {
    var answer = 0;
    
    let move = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    
    let [n, m] = [maps.length-1, maps[0].length-1];
    
    let willVisit = new Array(maps.length);
    
    for(let i=0; i<willVisit.length; i++) {
        willVisit[i] = new Array(maps[0].length).fill(false);
    }
    
    let result = BFS(0, 0);
    
    if(result === false) {
        answer = -1;
    } else {
        answer = result;
    }
    
    function BFS(startI, startJ) {
        let queue = [];
        queue.push([startI, startJ]);
        willVisit[startI][startJ] = true
        
        let idx=0;
        let firstIndex;
        let lastIndex;
        
        let steps = 1;
        
        while(queue.length !== idx) {
            firstIndex = idx;
            lastIndex = queue.length-1;
            
            for(let a=firstIndex; a<=lastIndex; a++) {
                let [i, j] = queue[a];
                idx++;
                
                for(let b=0; b<4; b++) {
                    let ni = i + move[b][0];
                    let nj = j + move[b][1];
                    
                    if(ni < 0 || ni >=maps.length || nj<0 || nj >=maps[0].length) {
                        continue;
                    }
                    
                    if(ni === n && nj === m) {
                        return steps + 1;
                    }
                    
                    if(maps[ni][nj] === 1 && willVisit[ni][nj] === false) {
                        queue.push([ni, nj]);
                        willVisit[ni][nj] = true;                        
                    }
                }
            }    
            steps++;
        }
        return false;
    }
    
    return answer;
}