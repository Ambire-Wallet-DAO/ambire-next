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
  const { ethAddress } = req.query
  try {
    const queryString = 'https://api.crew3.xyz/communities/ambire/users?' + new URLSearchParams({ ethAddress })
    const response = await fetch(queryString, {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const responseJSON = await response.json()

    const queryString2 =
      'https://api.crew3.xyz/communities/ambire/claimed-quests?' + new URLSearchParams({ user_id: responseJSON.id })
    const response2 = await fetch(queryString2, {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const responseJSON2 = await response2.json()
    const {
      createdAt,
      updatedAt,
      guilds,
      country,
      city,
      twitterFollowersCount,
      tweetCount,
      socialAccounts,
      invites,
      isBanned,
      deleted,
      displayedInformation,
      role,
      ...user
    } = responseJSON
    const { data: addressData, error: addressError } = await supabase
      .from('Addresses')
      .insert(user['addresses'])
      .select()
    user['addresses'] = addressData['id']
    user.numberOfQuests = responseJSON2.totalCount
    const { data: userData, error: userError } = await supabase.from('Users').insert(user).select()
    if (addressError) throw new Error(addressError.message)
    if (userError) throw new Error(userError.message)
    res.status(200).json(user)
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
