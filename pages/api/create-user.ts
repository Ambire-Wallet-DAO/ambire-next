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
    const usersQuery = 'https://api.crew3.xyz/communities/ambire/users?' + new URLSearchParams({ ethAddress })
    const usersResponse = await fetch(usersQuery, {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const usersJSON = await usersResponse.json()

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
    } = usersJSON

    const claimedQuestsQuery =
      'https://api.crew3.xyz/communities/ambire/claimed-quests?' + new URLSearchParams({ user_id: user.id })
    const claimedQuestsResponse = await fetch(claimedQuestsQuery, {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const claimedQuestsJSON = await claimedQuestsResponse.json()
    const guildQuery = `https://api.guild.xyz/v1/guild/member/the-bean-dao/${ethAddress}`
    const guildResponse = await fetch(guildQuery, {
      method: 'GET',
    })
    const guildJSON = await guildResponse.json()
    const { data: addressData, error: addressError } = await supabase.from('Addresses').insert(user.addresses).select()
    const { data: rolesData, error: rolesError } = await supabase.from('Roles').insert(guildJSON).select()
    user.addresses = addressData[0].id

    //TODO: figure out how roles should be structured in supabase
    user.roles = rolesData[0].id
    user.numberOfQuests = claimedQuestsJSON.totalCount ? claimedQuestsJSON.totalCount : 0
    const { data: userData, error: userError } = await supabase.from('Users').insert(user).select()
    if (addressError) throw new Error(addressError.message)
    if (userError) throw new Error(userError.message)
    if (rolesError) throw new Error(rolesError.message)
    res.status(200).json(user)
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
