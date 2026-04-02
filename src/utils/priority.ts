// src/utils/priority.ts
import type { Priority, Status } from '../types'

export const PRIORITY_LABEL: Record<Priority, string> = {
  low:    'Low',
  medium: 'Medium',
  high:   'High',
}

export const PRIORITY_COLOR: Record<Priority, string> = {
  low:    'text-emerald-600 dark:text-emerald-400',
  medium: 'text-amber-600 dark:text-amber-400',
  high:   'text-red-600 dark:text-red-400',
}

export const PRIORITY_BG: Record<Priority, string> = {
  low:    'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50',
  medium: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50',
  high:   'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/50',
}

export const PRIORITY_DOT: Record<Priority, string> = {
  low:    'bg-emerald-500',
  medium: 'bg-amber-500',
  high:   'bg-red-500',
}

export function isOverdue(dueDate: string, status: Status): boolean {
  if (status === 'completed') return false
  const due  = new Date(dueDate)
  const now  = new Date()
  due.setHours(23, 59, 59)
  return due < now
}

export function formatDate(dateStr: string): string {
  const date  = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.round((date.getTime() - today.getTime()) / 86400000)

  if (diff === 0)  return 'Today'
  if (diff === 1)  return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff > 0 && diff <= 7) return `In ${diff} days`
  if (diff < 0 && diff >= -7) return `${Math.abs(diff)} days ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined })
}
