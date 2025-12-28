export interface Entry {
  id: number
  text: string
  created_at: string // ISO timestamp
  mood?: string | null
  topics?: string[]
  summary?: string | null
}

export interface DailySummary {
  date: string // ISO timestamp / date
  entries: Entry[]
  mood_counts: Record<string, number>
  common_topics: string[]
  combined_summary?: string | null
}

export interface WeeklySummary {
  start_date: string
  end_date: string
  mood_trends: Record<string, Record<string, number>>
  common_topics: string[]
  entries_count: number
} 
