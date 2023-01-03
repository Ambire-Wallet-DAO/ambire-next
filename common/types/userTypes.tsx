type LeaderboardData = {
  leaderboard: User[]
}

type User = {
  userId: string
  xp: number
  name: string
  avatar: string
  numberOfQuests: number
  addresses: {
    polygon?: string
    ethereum?: string
    avalanche?: string
  }
  address: string
  discord?: string
  twitter?: string
  discordId?: string
  roles?: Role[]
}

type Role = {
  id: number
  name: string
}
