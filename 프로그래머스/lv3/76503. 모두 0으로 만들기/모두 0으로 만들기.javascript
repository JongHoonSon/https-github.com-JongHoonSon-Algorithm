function solution(a, edges) {
    let tree = new Array(a.length);
    
    for(let i=0; i<tree.length; i++) {
        tree[i] = new Array();
    } 
    
    for(let i=0; i<edges.length; i++) {
        let [a, b] = edges[i];
        
        tree[a].push(b);
        tree[b].push(a);
    }
    
    let visited = new Array(a.length).fill(false);
    
    let stack = [ [0,-1] ];
    
    let answer = 0n;
    
    while(stack.length >0) {
        const [start, parent] = stack.pop();
        
        if(visited[start] === true) {
            a[parent] += a[start];
            answer += BigInt(Math.abs(a[start]));
            continue;
        }
        
        stack.push([start, parent]);
        visited[start] = true;
        
        for(let i=0; i<tree[start].length; i++) {
            let y = tree[start][i];
            
            if(visited[y] === false) {
                stack.push([y, start])
            }
        }
    }
    
    return a[0] ? -1 : answer;
}