function solution(line) {
    var answer = [];
    
    let stars = new Array();
    
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    for(let i=0; i<line.length; i++) {
        let [A, B, E] = line[i];
        for(let j=0; j<line.length; j++) {
            if(i===j) {
                continue;
            }
            
            let [C, D, F] = line[j];
            
            let mod = A*D - B*C
            
            if(mod === 0) {
                continue;
            } else {
                let x = ((B*F)-(E*D))/mod
                let y = ((E*C)-(A*F))/mod
                
                if(x%1 !== 0 || y%1 !== 0) {
                    continue;
                } else {
                    stars.push([x, y]);
                }
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }
    
    let graph = new Array(maxY - minY + 1);
    
    for(let i=0; i<maxY - minY + 1; i++) {
        graph[i] = new Array(maxX - minX + 1).fill(".");
        // console.log(graph[i].join(""));
    }
    
    for(let i=0; i<stars.length; i++) {
        let [x, y] = stars[i];
        
        graph[maxY-y][x-minX] = '*';
    }
    
    for(let i=0; i<maxY - minY + 1; i++) {
        // console.log(graph[i].join(""));
    }
    
    graph.forEach(el => {
        answer.push(el.join(""));
    })
    
    return answer;
}