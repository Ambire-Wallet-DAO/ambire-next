export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      Addresses: {
        Row: {
          created_at: string | null
          id: string
          polygon: string | null
          ethereum: string | null
          avalanche: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          polygon?: string | null
          ethereum?: string | null
          avalanche?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          polygon?: string | null
          ethereum?: string | null
          avalanche?: string | null
        }
      }
      Etag: {
        Row: {
          created_at: string | null
          current_value: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_value?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_value?: string | null
          id?: string
          updated_at?: string | null
        }
      }
      Roles: {
        Row: {
          created_at: string | null
          name: string | null
          xp: number | null
          id: string
        }
        Insert: {
          created_at?: string | null
          name?: string | null
          xp?: number | null
          id?: string
        }
        Update: {
          created_at?: string | null
          name?: string | null
          xp?: number | null
          id?: string
        }
      }
      Users: {
        Row: {
          id: string
          created_at: string | null
          xp: number | null
          name: string | null
          avatar: string | null
          numberOfQuests: number | null
          discordHandle: string | null
          twitterUsername: string | null
          level: number | null
          rank: number | null
          addresses: string | null
          roles: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          xp?: number | null
          name?: string | null
          avatar?: string | null
          numberOfQuests?: number | null
          discordHandle?: string | null
          twitterUsername?: string | null
          level?: number | null
          rank?: number | null
          addresses?: string | null
          roles?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          xp?: number | null
          name?: string | null
          avatar?: string | null
          numberOfQuests?: number | null
          discordHandle?: string | null
          twitterUsername?: string | null
          level?: number | null
          rank?: number | null
          addresses?: string | null
          roles?: string | null
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
