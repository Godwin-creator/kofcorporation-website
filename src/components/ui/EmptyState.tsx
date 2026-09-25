import type {LucideIcon} from 'lucide-react'
import {Inbox} from 'lucide-react'

import './EmptyState.css'

interface EmptyStateProps {
  message: string
  icon?: LucideIcon
}

export default function EmptyState({message, icon: Icon = Inbox}: EmptyStateProps) {
  return <div className="empty-state" role="status">
    <Icon className="empty-state__icon" size={42} strokeWidth={1.4} aria-hidden="true" />
    <p>{message}</p>
  </div>
}
