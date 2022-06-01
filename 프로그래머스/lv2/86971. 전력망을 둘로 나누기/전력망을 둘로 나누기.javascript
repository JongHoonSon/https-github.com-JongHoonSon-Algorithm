function solution(n, wires) {
    var answer = -1;
    
    let graph = new Array(n+1);
    
    for(let i=1; i<=n; i++) {
        graph[i] = new Array(n+1).fill(false);
    }
    
    for(let i=0; i<wires.length; i++) {
        let [from, to] = wires[i];
        
        graph[from][to] = true;
        graph[to][from] = true;
    }
    
    for(let i=1; i<=n; i++) {
        console.log(graph[i]);
    }
    
    let visited;
    let cnt;
    let result;
    
    let minGap = Infinity;
    
    for(let i=0; i<wires.length; i++) {
        let [from, to] = wires[i];
        
        graph[from][to] = false;
        graph[to][from] = false;
        
        visited = new Array(n+1).fill(false);
        
        let results = new Array();
        for(let j=1; j<=n; j++) {
            cnt = 0;
            result = DFS(j); 
            
            if(result === false) {
                continue;
            };
            
            results.push(cnt);
        }
        
        minGap = Math.min(Math.abs(results[0]-results[1]), minGap)
        
        graph[from][to] = true;
        graph[to][from] = true;
    }
    
    
    function DFS(x) {
        if(visited[x] === true) {
            return false;
        }
        
        visited[x] = true;
        cnt++;
        
        for(let i=1; i<=n; i++) {
            if(graph[x][i] === true && visited[i] === false) {
                DFS(i);
            }
        }
        
        return true;
    }
    
    answer = minGap
    
    return answer;
}