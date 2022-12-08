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
    const response1 = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const etag = response1.headers.get('Etag')
    const response2 = await fetch('https://api.crew3.xyz/communities/ambire/leaderboard', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY, 'If-None-Match': etag },
    })
    if (response2.status == 200) {
      const etag2 = response2.headers.get('Etag')
      const { error } = await supabase.from('Etag').update({ current_value: etag2 }).eq('current_value', etag)
      if (error) throw Error(error.message)
      res.status(200).json({ data })
    } else {
      res.status(response2.status).json({})
    }
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
