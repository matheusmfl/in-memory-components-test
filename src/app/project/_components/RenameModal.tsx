import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RenameModalProps {
  isOpen: boolean
  onClose: () => void
  onRename: (newName: string) => void
  initialName: string
  type: "project" | "folder"
}

export function RenameModal({ isOpen, onClose, onRename, initialName, type }: RenameModalProps) {
  const [newName, setNewName] = useState(initialName)

  useEffect(() => {
    setNewName(initialName)
  }, [initialName])

  const handleRename = () => {
    if (newName.trim() !== "") {
      onRename(newName.trim())
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename {type}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={`Enter new ${type} name`}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleRename} disabled={newName.trim() === "" || newName === initialName}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}