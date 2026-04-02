import { Calendar, AlertCircle } from 'lucide-react'
import type { Priority, Status } from '../../types'
import { formatDate, isOverdue } from '../../utils/priority'
import PriorityBadge from '../PriorityBadge'

interface Props {
  priority: Priority
  dueDate: string
  status: Status
  className?: string
  dateClassName?: string
  prioritySize?: 'sm' | 'md'
  showPriority?: boolean
  showDue?: boolean
}

export default function TaskMetaChips({
  priority,
  dueDate,
  status,
  className,
  dateClassName,
  prioritySize = 'sm',
  showPriority = true,
  showDue = true,
}: Props) {
  const overdue = showDue ? isOverdue(dueDate, status) : false

  return (
    <div className={className ?? 'flex items-center gap-2 flex-shrink-0'}>
      {showPriority && <PriorityBadge priority={priority} size={prioritySize} />}

      {showDue && (
        <div
          className={
            dateClassName ??
            `flex items-center gap-1 text-[10px] font-mono ${
              overdue
                ? 'text-red-500 dark:text-red-400'
                : 'text-zinc-400 dark:text-zinc-500'
            }`
          }
        >
          {overdue && <AlertCircle size={10} className="flex-shrink-0" />}
          <Calendar size={10} className="flex-shrink-0" />
          {formatDate(dueDate)}
        </div>
      )}
    </div>
  )
}

