import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/initSupabase'
import initMiddleware from '../../lib/init-middleware'
import Cors from 'cors'
import { PostgrestError } from '@supabase/supabase-js'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with PATCH
    methods: ['PATCH'],
  })
)

//TODO: Refactor using promise.all() to run requests in parallel
async function getAndUpdateUsers(userAddresses: string[]) {
  let results = []
  for (let index = 0; index < userAddresses.length; index++) {
    const userQuery =
      'https://api.crew3.xyz/communities/ambire/users?' + new URLSearchParams({ ethAddress: userAddresses[index] })
    const usersResponse = await fetch(userQuery, {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const userData = await usersResponse.json()

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
    } = userData

    //NOTE discard response objects of non-found users
    if (!user.id) {
      continue
    }
    const claimedQuestsQuery =
      'https://api.crew3.xyz/communities/ambire/claimed-quests?' + new URLSearchParams({ user_id: user.id })
    const claimedQuestsResponse = await fetch(claimedQuestsQuery, {
      method: 'GET',
      headers: { 'x-api-key': process.env.CREW3_API_KEY },
    })
    const claimedQuestsJSON = await claimedQuestsResponse.json()
    const guildQuery = `https://api.guild.xyz/v1/guild/member/the-bean-dao/${userAddresses[index]}`
    const guildResponse = await fetch(guildQuery, {
      method: 'GET',
    })
    const guildJSON = await guildResponse.json()

    user.numberOfQuests = claimedQuestsJSON.totalCount ? claimedQuestsJSON.totalCount : 0

    const { error: userError } = await supabase.from('Users').upsert(user).select()
    if (userError) throw new Error(userError.message)
    results.push(user)
  }
  return results
}

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
      const { leaderboard } = await leaderboardResponse.json()
      const userAddresses = leaderboard.filter((user) => user.address != null).map((user) => user.address)
      const updateResults = await getAndUpdateUsers(userAddresses)
      res.status(200).json(updateResults)
    } else {
      res.status(leaderboardResponse.status).json({})
    }
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
