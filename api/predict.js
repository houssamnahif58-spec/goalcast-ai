function poisson(lambda, k) {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

function predict() {
    const teamAGoals = parseFloat(document.getElementById("teamA").value);
    const teamBGoals = parseFloat(document.getElementById("teamB").value);

    let maxProb = 0;
    let bestScore = "0-0";

    let winA = 0;
    let winB = 0;
    let draw = 0;
    let btts = 0;
    let over25 = 0;

    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 5; j++) {

            let prob = poisson(teamAGoals, i) * poisson(teamBGoals, j);

            if (prob > maxProb) {
                maxProb = prob;
                bestScore = i + "-" + j;
            }

            if (i > j) winA += prob;
            if (j > i) winB += prob;
            if (i === j) draw += prob;
            if (i > 0 && j > 0) btts += prob;
            if (i + j > 2) over25 += prob;
        }
    }

    document.getElementById("result").innerHTML = `
        🎯 Exact Score: ${bestScore} <br><br>
        📊 Team A Win: ${(winA * 100).toFixed(1)}% <br>
        🤝 Draw: ${(draw * 100).toFixed(1)}% <br>
        📊 Team B Win: ${(winB * 100).toFixed(1)}% <br><br>
        🔥 BTTS: ${(btts * 100).toFixed(1)}% <br>
        ⚽ Over 2.5: ${(over25 * 100).toFixed(1)}%
    `;
}
