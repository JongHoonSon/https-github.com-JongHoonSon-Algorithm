function solution(n, edge) {
    var answer = 0;
    
    let graph = new Array(n+1);
    
    for(let i=1; i<=n; i++) {
        graph[i] = new Array();
    }
    
    for(let i=0; i<edge.length; i++) {
        const [a, b] = edge[i];
        
        // console.log("a, b : ", a, b);
        
        graph[a].push(b);
        graph[b].push(a);
    }

    for(let i=1; i<=n; i++) {
        // console.log(`graph[${i}]`, graph[i]);
    }
    
    let willVisit = new Array(n+1).fill(false);
    let dist = new Array(n+1).fill(0);
    dist[0] = null;
    
    let times = 1;
    
    BFS(1);
    
    function BFS(startNode) {
        let queue = new Array();
        queue.push(startNode);
        willVisit[startNode] = true;
        
        let idx = 0;
        let startIndex;
        let lastIndex;
        
        while(queue.length !== idx){
            
            startIndex = idx;
            lastIndex = queue.length - 1;
            
            for(let i=startIndex; i<=lastIndex; i++) {
            
                const x = queue[i];
                idx++;

                for(let j=0; j<graph[x].length; j++) {
                    const y = graph[x][j];

                    if(willVisit[y] === true) {
                        continue;
                    }

                    queue.push(y);
                    willVisit[y] = true;
                    dist[y] = times;
                }
            }
            
            times++;
        }
    }
    
    // console.log("dist : ", dist);
    
    let max = Math.max(...dist);
    
    let maxCount = 0;
    
    dist.forEach(el => {
        if(el === max) {
            maxCount++;
        }
    })
    
    answer = maxCount;
    
    console.log("max : ", max);
    
    return answer;
}