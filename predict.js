function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function poisson(lambda, k) {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { teamA_attack, teamB_attack, teamA_defense, teamB_defense } = req.body;

  const lambdaA = (teamA_attack + teamB_defense) / 2;
  const lambdaB = (teamB_attack + teamA_defense) / 2;

  let probabilities = [];
  let winA = 0;
  let winB = 0;
  let draw = 0;
  let btts = 0;
  let over25 = 0;

  for (let i = 0; i <= 4; i++) {
    for (let j = 0; j <= 4; j++) {
      const prob = poisson(lambdaA, i) * poisson(lambdaB, j);
      probabilities.push({ score: `${i}-${j}`, probability: prob });

      if (i > j) winA += prob;
      if (j > i) winB += prob;
      if (i === j) draw += prob;
      if (i > 0 && j > 0) btts += prob;
      if (i + j > 2) over25 += prob;
    }
  }

  probabilities.sort((a, b) => b.probability - a.probability);

  return res.status(200).json({
    exactScore: probabilities[0],
    winProbability: {
      teamA: (winA * 100).toFixed(2),
      draw: (draw * 100).toFixed(2),
      teamB: (winB * 100).toFixed(2),
    },
    btts: (btts * 100).toFixed(2),
    over25: (over25 * 100).toFixed(2),
  });
}
