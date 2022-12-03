import type { NextApiRequest, NextApiResponse } from 'next'
import initMiddleware from '../../lib/init-middleware'
import Cors from 'cors'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET
    methods: ['GET'],
  })
)

export default async function etagHandler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  try {
    const response1 = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const etag = response1.headers.get('Etag')
    const response2 = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY, 'If-None-Match': 'fdakfl;jadkfl;jdakfs;a' },
    })
    res.status(response2.status).json({ etag })
  } catch (err: any) {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
