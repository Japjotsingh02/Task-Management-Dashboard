import type { ReactNode } from 'react'

interface Props {
  onClose: () => void
  children: ReactNode
  customClassName?: string
}

export default function Modal({ onClose, children, customClassName }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={`surface rounded-2xl w-full shadow-2xl animate-scale-in ${customClassName}`}>
        {children}
      </div>
    </div>
  )
}

