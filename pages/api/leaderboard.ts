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
  discord?: string,
  twitter?: string,
  discordId?: string,
  roles?: Role[]
}

type Role = {
  id: number,
  name: string,
}
// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET
    methods: ["GET"],
  })
);

export default async function leaderboardHandler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  if (req.method != "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
  try {
    const [leaderboardData, guildData] = await Promise.all([
      fetch("https://api.crew3.xyz/communities/ambire/leaderboard", { method: 'GET', headers: { 'x-api-key': process.env.CREW3_API_KEY } }),
      fetch("https://api.guild.xyz/v1/guild/the-bean-dao/", { method: 'GET' })
    ])
    const [leaderboardJSON, guildJSON] = await Promise.all([leaderboardData.json(), guildData.json()])
    const roles = guildJSON.roles.map(role => { return { id: role.id, name: role.name, members: role.members } })
    res.status(200).json({ ...leaderboardJSON, roles })
  } catch (err: any) {
    res.setHeader("Allow", "GET")
    res.status(405).end("Method Not Allowed")
  }
}
