import type { NextApiRequest, NextApiResponse } from 'next'
import initMiddleware from '../../lib/init-middleware'
import { supabase } from '../../lib/initSupabase'

import Cors from 'cors'
// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with POST
    methods: ['POST'],
  })
)

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  const ethAddress = req.body.ethAddress
  try {
    const response = await fetch('https://api.crew3.xyz/communities/ambire/users', {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
      body: JSON.stringify({ ethAddress }),
    })
    let responseJSON = await response.json()
    const { createdAt, updatedAt, ...user } = responseJSON
    const { data, error } = await supabase.from('Users').insert([user])
    if (error) throw new Error(error.message)
    res.status(200).json(data)
  } catch (err: any) {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
