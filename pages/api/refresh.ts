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
    const { data, error } = await supabase.from('Etag').select('*')
    if (error) throw new Error(error.message)
    const current_etag = data[0].current_value
    const etagId = data[0].id

    const leaderboardResponse = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY, 'If-None-Match': current_etag },
    })
    if (leaderboardResponse.status == 200) {
      const etag2 = leaderboardResponse.headers.get('etag')
      const { data, error } = await supabase.from('Etag').update({ current_value: etag2 }).eq('id', etagId).select()
      if (error) throw Error(error.message)
      res.status(200).json(data)
    } else {
      res.status(leaderboardResponse.status).json({})
    }
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
