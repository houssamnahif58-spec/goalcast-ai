export default async function handler(req, res) {

  const response = await fetch("https://v3.football.api-sports.io/fixtures?next=20", {
    headers: {
      "x-apisports-key": process.env.API_KEY
    }
  });

  const data = await response.json();

  const matches = data.response.map(game => {

    const homePower = Math.random() * 100;
    const awayPower = Math.random() * 60;

    const confidence = ((homePower / (homePower + awayPower)) * 100);

    const scoreHome = Math.round(homePower / 30);
    const scoreAway = Math.round(awayPower / 40);

    return {
      id: game.fixture.id,
      home: game.teams.home.name,
      away: game.teams.away.name,
      winner: confidence > 50 ? game.teams.home.name : game.teams.away.name,
      confidence: confidence.toFixed(0),
      over: (scoreHome + scoreAway) > 2 ? "YES" : "NO",
      btts: scoreHome > 0 && scoreAway > 0 ? "YES" : "NO",
      score: `${scoreHome} - ${scoreAway}`
    };
  });

  const sorted = matches
    .sort((a,b) => b.confidence - a.confidence)
    .slice(0,7);

  res.status(200).json(sorted);
}
