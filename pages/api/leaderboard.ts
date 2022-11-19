import type { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from "../../lib/init-middleware";
import Cors from "cors";



type LeaderboardData = {
  leaderboard: User[],
}

type User = {
  userId: string,
  xp: number,
  name: string,
  avatar: string,
  numberOfQuests: number,
  addresses: {
    polygon?: string,
    ethereum?: string,
    avalanche?: string
  },
  address: string,
  discord: string,
  twitter: string,
  discordId: string
}
// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET
    methods: ["GET"],
  })
);

export default async function leaderboardHandler(req: NextApiRequest, res: NextApiResponse<LeaderboardData>) {
  await cors(req, res);
  if (req.method != "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
  try {
    const response = await fetch("https://api.crew3.xyz/communities/ambire/leaderboard", { method: 'GET', headers: { 'x-api-key': process.env.CREW3_API_KEY } })
    const data = await response.json()
    res.status(200).json(data)
  } catch (err: any) {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
