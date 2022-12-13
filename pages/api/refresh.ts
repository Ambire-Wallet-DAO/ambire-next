import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/initSupabase'
import initMiddleware from '../../lib/init-middleware'
import Cors from 'cors'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with PATCH
    methods: ['PATCH'],
  })
)

export default async function refreshDatabase(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  try {
    const etagResponse = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const etag = etagResponse.headers.get('etag')
    const leaderboardResponse = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY, 'If-None-Match': etag },
    })
    if (leaderboardResponse.status == 200) {
      const etag2 = leaderboardResponse.headers.get('etag')
      // const { data, error } = await supabase.from('Etag').upsert({ current_value: etag2 }).select()
      // if (error) throw Error(error.message)
      res.status(200).json({ etag, etag2 })
    } else {
      res.status(leaderboardResponse.status).json({})
    }
    res.status(200).json({ etag })
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
