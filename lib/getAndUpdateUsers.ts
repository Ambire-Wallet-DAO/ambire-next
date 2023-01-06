import { supabase } from './initSupabase'

export async function getAndUpdateUsers(userAddresses: string[]) {
  let results = await Promise.all(
    userAddresses.map(async (address: string) => {
      const userQuery = 'https://api.crew3.xyz/communities/ambire/users?' + new URLSearchParams({ ethAddress: address })

      const usersResponse = await fetch(userQuery, {
        method: 'GET',
        headers: { 'x-api-key': process.env.CREW3_API_KEY },
      })
      const userData = await usersResponse.json()
      //HACK Discards response objects of non-found users
      if (!userData.id) {
        return Promise.resolve({ message: 'User record not found' })
      }
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

      const claimedQuestsQuery =
        'https://api.crew3.xyz/communities/ambire/claimed-quests?' + new URLSearchParams({ user_id: user.id })
      const claimedQuestsResponse = await fetch(claimedQuestsQuery, {
        method: 'GET',
        headers: { 'x-api-key': process.env.CREW3_API_KEY },
      })
      const claimedQuestsJSON = await claimedQuestsResponse.json()

      const guildMemberQuery = 'https://api.guild.xyz/v1/guild/member/10986/0xFE3A509F8E8eb59209CC8c9b90f7b352781E96f4' //HACK temporarily hardcode bean dao id and address
      const guildMemberResponse = await fetch(guildMemberQuery, {
        method: 'GET',
      })
      const guildMemberArray = await guildMemberResponse.json()

      let memberRoleArray = await Promise.all(
        guildMemberArray.map(async (obj: { roleId: number; access: boolean }) => {
          const guildRoleQuery = `https://api.guild.xyz/v1/role/${obj['roleId']}`
          const guildRoleResponse = await fetch(guildRoleQuery, { method: 'GET' })
          const guildRoleJson = await guildRoleResponse.json()
          const { createdAt, logic, guildId, requirements, rolePlatforms, members, ...role } = guildRoleJson
          return role
        })
      )

      user.numberOfQuests = claimedQuestsJSON.totalCount ? claimedQuestsJSON.totalCount : 0
      user.roles = memberRoleArray
      user.updated_at = new Date().toISOString()

      const { data, error } = await supabase.from('Users').upsert(user).select()
      if (error) throw new Error(error.message)

      return data[0]
    })
  )
  return results
}
