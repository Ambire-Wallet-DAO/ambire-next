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

export default async function refreshDatabase(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  try {
    const response1 = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const etag = response1.headers.get('Etag')
    const response2 = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY, 'If-None-Match': etag },
    })
    switch (response2.status) {
      case 200:
        const data = await response2.json()
        res.status(200).json({ data })
        break

      case 304:
        res.status(304).json({})

      default:
        res.status(response2.status).json({})
        break
    }
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
