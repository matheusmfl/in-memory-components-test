import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Folder } from "lucide-react"
import { IFolder } from "@/fakeApi/schema/Folder"

interface SelectFolderModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (folderId: string) => void
  folders: IFolder[]
}

export function SelectFolderModal({ isOpen, onClose, onSelect, folders }: SelectFolderModalProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const handleSelect = () => {
    if (selectedFolder) {
      console.log(selectedFolder + " selected folder ")
      onSelect(selectedFolder)
      setSelectedFolder(null)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a folder</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          <RadioGroup value={selectedFolder || ""} onValueChange={setSelectedFolder}>
            {folders.map((folder) => (
              <div key={folder.id} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={folder.id} id={folder.id} />
                <Label htmlFor={folder.id} className="flex items-center cursor-pointer">
                  <Folder className="mr-2 h-4 w-4" />
                  {folder.title}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect} disabled={!selectedFolder}>
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}