export default function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { a_goals, b_goals, a_def, b_def } = req.body;

  if (!a_goals || !b_goals || !a_def || !b_def) {
    return res.status(400).json({ error: "Missing data" });
  }

  const attackStrength = (a_goals + b_goals) / 2;
  const defenseWeakness = (a_def + b_def) / 2;
  const scoreIndex = attackStrength - defenseWeakness;

  let prediction = "";
  let confidence = Math.min(95, Math.max(50, Math.round(scoreIndex * 50)));

  if (scoreIndex > 1) {
    prediction = "Over 2.5 Goals";
  } else if (scoreIndex > 0) {
    prediction = "Both Teams To Score";
  } else {
    prediction = "Under 2.5 Goals";
  }

  return res.status(200).json({
    prediction,
    confidence
  });
}
