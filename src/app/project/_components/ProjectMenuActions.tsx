'use client'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { IFolder } from "@/fakeApi/schema/Folder"
import { cn } from "@/lib/utils"
import { Folder, Trash2 } from "lucide-react"
import { SelectFolderModal } from "./SelectFolderModal"
import { useState } from "react"

interface ProjectMenuActionsProps {
  selectedCount: number
  onClearSelection: () => void
  onDelete: () => void
  onMoveToFolder: (projectIds: string[], folderId: string) => void

  hasFolders: boolean
  hasSelectedFolders: boolean
  folders: IFolder[]
  selectedProjects: string[]
}

export function ProjectMenuActions({
  selectedCount,
  onClearSelection,
  onDelete,
  onMoveToFolder,
  hasFolders,
  hasSelectedFolders,
  folders,
  selectedProjects,
}: ProjectMenuActionsProps) {


  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  return (
    <div
      className={cn(
        "w-[474px] rounded-2xl p-4 pl-6 flex justify-between items-center left-1/2 transform -translate-x-1/2 bg-slate-900 fixed bottom-10",
        selectedCount === 0 && "hidden",
      )}
    >
      <div className="flex gap-[14px] min-w-[120px]">
        <Checkbox
          className="data-[state=checked]:bg-violet-600 border border-white rounded-sm data-[state=checked]:border-none size-5"
          checked={selectedCount > 0}
          onCheckedChange={(checked) => {
            if (!checked) {
              onClearSelection()
            }
          }}
        />
        <span className="text-base font-medium leading-5 text-zinc-50">
          {selectedCount} {selectedCount === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="flex gap-4">
        <Button
          variant={"outline"}
          onClick={() => setIsFolderModalOpen(true)}
          disabled={!hasFolders || hasSelectedFolders}
        >
          <Folder size={20} />
        </Button>

        <Button variant={"outline"} onClick={onDelete}>
          <Trash2 size={20} />
        </Button>
      </div>

      <Button variant={"secondary"} onClick={onClearSelection}>
        Cancel
      </Button>
      <SelectFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onSelect={(folderId) => {
          onMoveToFolder(selectedProjects, folderId)
          setIsFolderModalOpen(false)
        }}
        folders={folders}
      />
    </div>
  )
}