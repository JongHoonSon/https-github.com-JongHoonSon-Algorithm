const solution = (lines) => {
    let result = 0;
    const times = [];

    for (const line of lines) {
        const [date, time, pass] = line.split(' ');
        const [hour, minute, second] = time.split(':');
        const endTime = (Number(second) + Number(minute)*60 + Number(hour)*3600)*1000;
        const startTime = endTime - Number(pass.substring(0, pass.length-1))* 1000 + 1;
        times.push(['START', startTime]);
        times.push(['END', endTime+1000]);
    }

    times.sort((a, b) => {
        if (a[1] - b[1] < 0) return -1;
        return a - b;
    });
    
    let count = 0;
    times.forEach(([state, time]) => {
        if (state === 'START') {
            count++;
        }
        else {
            result = result > count ? result : count;
            count--;
        }
    });

    return result;
};