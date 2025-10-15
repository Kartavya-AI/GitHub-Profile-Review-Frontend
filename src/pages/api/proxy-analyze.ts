import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { repo_url } = req.query;

  if (!repo_url || typeof repo_url !== 'string') {
    return res.status(400).json({ error: "Missing 'repo_url' query parameter." });
  }

  try {
    const response = await axios.post(
      "https://code-analysis-87738157215.asia-south1.run.app/analyze",
      null,
      { params: { repo_url } }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Proxy error:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(503).json({ error: "Service Unavailable" });
    }
  }
}
