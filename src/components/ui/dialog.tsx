'use client'

import * as React from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { cn } from '@/lib/utils'

export interface DialogProps {
  open: boolean
  onOpenChange(open: boolean): void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onOpenChange}>
        {children}
      </HeadlessDialog>
    </Transition>
  )
}

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div
        ref={ref}
        className={cn('bg-gray-800 p-6 sm:rounded-lg space-y-4', className)}
        {...props}
      >
        {children}
      </div>
    </div>
  )
)
DialogContent.displayName = 'DialogContent'

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <HeadlessDialog.Title ref={ref} className={cn('text-lg font-semibold text-white', className)} {...props} />
  )
)
DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <HeadlessDialog.Description ref={ref} className={cn('text-sm text-gray-200', className)} {...props} />
  )
)
DialogDescription.displayName = 'DialogDescription'

