export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    return res.status(200).json({ message: "User registered successfully" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
