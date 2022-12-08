export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      Addresses: {
        Row: {
          id: number
          created_at: string | null
          ethereum: string | null
          polygon: string | null
          avalanche: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          ethereum?: string | null
          polygon?: string | null
          avalanche?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          ethereum?: string | null
          polygon?: string | null
          avalanche?: string | null
        }
      }
      Etag: {
        Row: {
          created_at: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          id: number
        }
        Update: {
          created_at?: string | null
          id?: number
        }
      }
      Roles: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
        }
      }
      Users: {
        Row: {
          userId: string
          created_at: string | null
          xp: number | null
          name: string | null
          avatar: string | null
          numberOfQuests: number | null
          Address: string | null
          discord: string | null
          twitter: string | null
          discordId: string | null
          roles: number | null
          Addresses: number | null
        }
        Insert: {
          userId: string
          created_at?: string | null
          xp?: number | null
          name?: string | null
          avatar?: string | null
          numberOfQuests?: number | null
          Address?: string | null
          discord?: string | null
          twitter?: string | null
          discordId?: string | null
          roles?: number | null
          Addresses?: number | null
        }
        Update: {
          userId?: string
          created_at?: string | null
          xp?: number | null
          name?: string | null
          avatar?: string | null
          numberOfQuests?: number | null
          Address?: string | null
          discord?: string | null
          twitter?: string | null
          discordId?: string | null
          roles?: number | null
          Addresses?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
