function solution( a)
{
    let answer = -1;
    let Cnt = Array(a.length+1).fill(0);
    for (let i = 0; i < a.length; i++) Cnt[a[i]]++;

    for (let i = 0; i < Cnt.length; i++)
    {
        if (Cnt[i] === 0) continue;
        if (Cnt[i] <= answer) continue;
        let Result = 0;

        for (let j = 0; j < a.length - 1; j++)
        {
            if (a[j] != i && a[j + 1] != i) continue;
            if (a[j] == a[j + 1]) continue;

            Result++;
            j++;
        }
        answer = Math.max(answer, Result);
    }
    return answer * 2;
}