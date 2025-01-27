"use client"

import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link2, PencilIcon, Trash2, FolderOpen } from "lucide-react"

import { toast } from "react-hot-toast"
import { IFolder } from "@/fakeApi/schema/Folder"
import { useState } from "react"
import { SelectFolderModal } from "./SelectFolderModal"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps["side"]
  sideOffset?: DropdownMenuContentProps["sideOffset"]
  id: string
  title: string
  type: "folder" | "project"
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onMoveToFolder: (id: string[], folderId: string) => void
  hasFolders: boolean
  folders: IFolder[]
}

export function Actions({
  children,
  id,
  side,
  sideOffset,
  type,
  onRename,
  onDelete,
  onMoveToFolder,
  hasFolders,
  folders }: ActionsProps) {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/${type}s/${id}`)
      .then(() => toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} link copied successfully`))
      .catch(() => toast.error("Error while copying link"))
  }

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)


  const handleMoveToFolder = () => {
    setIsFolderModalOpen(true)
  }


  return (

    <DropdownMenu>
      <SelectFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onSelect={(folderId) => {
          onMoveToFolder([id], folderId)
          setIsFolderModalOpen(false)
        }}
        folders={folders}
      />
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} sideOffset={sideOffset} className="w-60" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem className="p-3 cursor-pointer group font-normal text-sm" onClick={() => onRename(id)}>
          <PencilIcon className="h-4 w-4 mr-2 font-normal group-hover:text-blue-500" />
          Rename {type}
        </DropdownMenuItem>

        <DropdownMenuItem className="p-3 cursor-pointer group font-normal text-sm" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2 font-normal group-hover:text-blue-600" />
          Copy {type} link
        </DropdownMenuItem>

        {type === "project" && (
          <DropdownMenuItem
            className="p-3 cursor-pointer group font-normal text-sm"
            onClick={handleMoveToFolder}
            disabled={!hasFolders}
          >
            <FolderOpen className="h-4 w-4 mr-2 font-normal group-hover:text-yellow-500" />
            Move to folder
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="p-3 cursor-pointer group font-normal text-sm" onClick={() => onDelete(id)}>
          <Trash2 className="h-4 w-4 mr-2 group-hover:text-red-500" />
          Delete {type}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

