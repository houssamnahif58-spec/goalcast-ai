export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { a_goals, b_goals, a_def, b_def } = req.body;

  if (
    a_goals == null ||
    b_goals == null ||
    a_def == null ||
    b_def == null
  ) {
    return res.status(400).json({ error: "Missing data" });
  }

  const teamA_attack = a_goals;
  const teamB_attack = b_goals;
  const teamA_def = a_def;
  const teamB_def = b_def;

  // Expected goals
  const xG_A = (teamA_attack + teamB_def) / 2;
  const xG_B = (teamB_attack + teamA_def) / 2;

  // Win probabilities (بسيطة تقريبية)
  let winA = Math.max(0, (xG_A - xG_B) * 25 + 40);
  let winB = Math.max(0, (xG_B - xG_A) * 25 + 40);
  let draw = 100 - (winA + winB);

  winA = Math.min(90, Math.max(5, Math.round(winA)));
  winB = Math.min(90, Math.max(5, Math.round(winB)));
  draw = Math.max(5, Math.round(draw));

  // BTTS %
  let btts = Math.min(95, Math.round((xG_A * xG_B) * 20));

  // Over 2.5 %
  let over25 = Math.min(95, Math.round((xG_A + xG_B) * 20));

  // Exact Score (تقريب بسيط)
  const exactScore = `${Math.round(xG_A)} - ${Math.round(xG_B)}`;

  return res.status(200).json({
    exactScore,
    winA,
    draw,
    winB,
    btts,
    over25
  });
}
