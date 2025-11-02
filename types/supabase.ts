export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          plan: 'free' | 'creator' | 'pro'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'creator' | 'pro'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'creator' | 'pro'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      platforms: {
        Row: {
          id: string
          user_id: string
          platform_type: 'youtube' | 'tiktok' | 'instagram'
          platform_user_id: string | null
          platform_username: string | null
          access_token: string | null
          refresh_token: string | null
          token_expires_at: string | null
          connected_at: string
          last_synced_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          platform_type: 'youtube' | 'tiktok' | 'instagram'
          platform_user_id?: string | null
          platform_username?: string | null
          access_token?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          connected_at?: string
          last_synced_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          platform_type?: 'youtube' | 'tiktok' | 'instagram'
          platform_user_id?: string | null
          platform_username?: string | null
          access_token?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          connected_at?: string
          last_synced_at?: string | null
        }
      }
      analytics: {
        Row: {
          id: string
          platform_id: string
          date: string
          views: number
          likes: number
          comments: number
          shares: number
          subscribers_gained: number
          watch_time_minutes: number
          engagement_rate: number | null
          created_at: string
        }
        Insert: {
          id?: string
          platform_id: string
          date: string
          views?: number
          likes?: number
          comments?: number
          shares?: number
          subscribers_gained?: number
          watch_time_minutes?: number
          engagement_rate?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          platform_id?: string
          date?: string
          views?: number
          likes?: number
          comments?: number
          shares?: number
          subscribers_gained?: number
          watch_time_minutes?: number
          engagement_rate?: number | null
          created_at?: string
        }
      }
      ai_ideas: {
        Row: {
          id: string
          user_id: string
          platform_type: 'youtube' | 'tiktok' | 'instagram' | null
          niche: string | null
          idea_title: string
          idea_description: string | null
          hook: string | null
          suggested_duration: number | null
          status: 'saved' | 'in_progress' | 'published'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform_type?: 'youtube' | 'tiktok' | 'instagram' | null
          niche?: string | null
          idea_title: string
          idea_description?: string | null
          hook?: string | null
          suggested_duration?: number | null
          status?: 'saved' | 'in_progress' | 'published'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform_type?: 'youtube' | 'tiktok' | 'instagram' | null
          niche?: string | null
          idea_title?: string
          idea_description?: string | null
          hook?: string | null
          suggested_duration?: number | null
          status?: 'saved' | 'in_progress' | 'published'
          created_at?: string
        }
      }
      partnerships: {
        Row: {
          id: string
          user_id: string
          brand_name: string
          amount: number
          currency: string
          partnership_type: string | null
          delivery_date: string | null
          status: 'pending' | 'delivered' | 'paid'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          brand_name: string
          amount: number
          currency?: string
          partnership_type?: string | null
          delivery_date?: string | null
          status?: 'pending' | 'delivered' | 'paid'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          brand_name?: string
          amount?: number
          currency?: string
          partnership_type?: string | null
          delivery_date?: string | null
          status?: 'pending' | 'delivered' | 'paid'
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
