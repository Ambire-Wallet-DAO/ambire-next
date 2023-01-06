import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/initSupabase'
import initMiddleware from '../../lib/init-middleware'
import Cors from 'cors'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET
    methods: ['GET'],
  })
)

export default async function leaderboardHandler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  try {
    const { data, error } = await supabase.from('Users').select('name, xp, numberOfQuests, roles')
    if (error) throw Error(error.message)
    res.status(200).json(data)
  } catch (err: any) {
    res.status(401).json(err.message)
  }
}
