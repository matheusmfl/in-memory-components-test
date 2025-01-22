"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateFolderModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateFolder: (folderName: string) => void
}

export function CreateFolderModal({ isOpen, onClose, onCreateFolder }: CreateFolderModalProps) {
  const [folderName, setFolderName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (folderName.trim()) {
      onCreateFolder(folderName)
      setFolderName("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="text-right">
                Folder Name
              </Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Folder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}