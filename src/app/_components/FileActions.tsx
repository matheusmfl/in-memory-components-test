'use client'

import { Trash2 } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FileActionsProps {
  onDelete: (videoId: string) => void
  previewLink: string
  fileName: string
  videoId: string
}

export function FileActions({ onDelete, previewLink, fileName, videoId }: FileActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    onDelete(videoId)
    setIsOpen(false)
  }

  return (
    <div className="flex gap-5 items-center">
      <Link href={previewLink} className="flex gap-2 items-center justify-center text-violet-500 hover:text-violet-700 transition-colors">
        <svg className='text-gray-500' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.25 9.0625H13.75C13.9986 9.0625 14.2371 9.16127 14.4129 9.33709C14.5887 9.5129 14.6875 9.75136 14.6875 10C14.6875 10.2486 14.5887 10.4871 14.4129 10.6629C14.2371 10.8387 13.9986 10.9375 13.75 10.9375H6.25C6.00136 10.9375 5.7629 10.8387 5.58709 10.6629C5.41127 10.4871 5.3125 10.2486 5.3125 10C5.3125 9.75136 5.41127 9.5129 5.58709 9.33709C5.7629 9.16127 6.00136 9.0625 6.25 9.0625ZM8.125 12.8125H5C4.25408 12.8125 3.53871 12.5162 3.01126 11.9887C2.48382 11.4613 2.1875 10.7459 2.1875 10C2.1875 9.25408 2.48382 8.53871 3.01126 8.01126C3.53871 7.48382 4.25408 7.1875 5 7.1875H8.125C8.37364 7.1875 8.6121 7.08873 8.78791 6.91291C8.96373 6.7371 9.0625 6.49864 9.0625 6.25C9.0625 6.00136 8.96373 5.7629 8.78791 5.58709C8.6121 5.41127 8.37364 5.3125 8.125 5.3125H5C3.7568 5.3125 2.56451 5.80636 1.68544 6.68544C0.80636 7.56451 0.3125 8.7568 0.3125 10C0.3125 11.2432 0.80636 12.4355 1.68544 13.3146C2.56451 14.1936 3.7568 14.6875 5 14.6875H8.125C8.37364 14.6875 8.6121 14.5887 8.78791 14.4129C8.96373 14.2371 9.0625 13.9986 9.0625 13.75C9.0625 13.5014 8.96373 13.2629 8.78791 13.0871C8.6121 12.9113 8.37364 12.8125 8.125 12.8125ZM15 5.3125H11.875C11.6264 5.3125 11.3879 5.41127 11.2121 5.58709C11.0363 5.7629 10.9375 6.00136 10.9375 6.25C10.9375 6.49864 11.0363 6.7371 11.2121 6.91291C11.3879 7.08873 11.6264 7.1875 11.875 7.1875H15C15.7459 7.1875 16.4613 7.48382 16.9887 8.01126C17.5162 8.53871 17.8125 9.25408 17.8125 10C17.8125 10.7459 17.5162 11.4613 16.9887 11.9887C16.4613 12.5162 15.7459 12.8125 15 12.8125H11.875C11.6264 12.8125 11.3879 12.9113 11.2121 13.0871C11.0363 13.2629 10.9375 13.5014 10.9375 13.75C10.9375 13.9986 11.0363 14.2371 11.2121 14.4129C11.3879 14.5887 11.6264 14.6875 11.875 14.6875H15C16.2432 14.6875 17.4355 14.1936 18.3146 13.3146C19.1936 12.4355 19.6875 11.2432 19.6875 10C19.6875 8.7568 19.1936 7.56451 18.3146 6.68544C17.4355 5.80636 16.2432 5.3125 15 5.3125Z" fill="currentColor" />
        </svg>
        Preview Link
      </Link>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-5 w-5 text-zinc-500 hover:text-red-500 transition-colors" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{fileName}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="default" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

