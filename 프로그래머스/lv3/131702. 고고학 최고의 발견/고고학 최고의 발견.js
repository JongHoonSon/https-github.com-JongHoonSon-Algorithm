const solution = (clockHands) => {
    const n = clockHands.length;
    let answer = Infinity;

    const rotate = (copiedArr, row, col, cnt) => {
        copiedArr[row][col] = (copiedArr[row][col] + cnt) % 4;
        if (row > 0) copiedArr[row - 1][col] = (copiedArr[row - 1][col] + cnt) % 4;
        if (col > 0) copiedArr[row][col - 1] = (copiedArr[row][col - 1] + cnt) % 4;
        if (row < n-1) copiedArr[row + 1][col] = (copiedArr[row + 1][col] + cnt) % 4;
        if (col < n-1) copiedArr[row][col + 1] = (copiedArr[row][col + 1] + cnt) % 4;
    }

    for (let i = 0; i < Math.pow(4, n); i++) {
        const copiedArr = clockHands.map(val => [...val]);
        let count = 0;
        a = i;
        for (let j = 0; j < n; j++) {   
            cnt = Math.floor(a % 4);
            a /= 4;
            rotate(copiedArr, 0, j, cnt);
            count += cnt;
        }

        for (let row = 1; row < n; row++) {
            for (let col = 0; col < n; col++) {
                const cnt = (4 - copiedArr[row - 1][col]) % 4;
                rotate(copiedArr, row, col, cnt);
                count += cnt;
            }
        }

        if (copiedArr[n - 1].every(val => val === 0)) {
            answer = Math.min(answer, count);
        }
    }
    return answer;
}