import type { NextApiRequest, NextApiResponse } from 'next'
import initMiddleware from '../../lib/init-middleware'
import { supabase } from '../../lib/initSupabase'
import { Json, Database } from '../../lib/supabase'

import Cors from 'cors'
// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with POST
    methods: ['POST'],
  })
)

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  const { ethAddress } = req.query
  try {
    const { data, error } = await supabase.from('Users').select(
      `id,
      name,
      avatar,
      discordHandle,
      twitterUsername,
      addresses (
      polygon,
      ethereum,
      avalanche
      ),
      xp,
      level,
      rank,
      numberOfQuests
      `
    )
    if (error) throw new Error(error.message)
    res.status(200).json(data)
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
// if (error) return res.status(401).json({ error: error.message })
// return res.status(200).json(user)
