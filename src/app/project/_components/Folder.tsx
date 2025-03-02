"use client"

import { Button } from "@/components/ui/button"
import folderBg from "@/assets/FolderBg.svg"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { Actions } from "./Actions"
import { IFolder } from "@/fakeApi/schema/Folder"


interface IFolderProps {
  id: string
  title: string
  projectsLength: number
  createdAt: string
  onSelect?: (isSelected: boolean) => void
  selectedFolders: string[]
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onMoveToFolder: (id: string[], folderId: string) => void
  folders: IFolder[]
}


export function FolderComponent({
  createdAt,
  projectsLength,
  title,
  onSelect,
  id,
  selectedFolders,
  onRename,
  onDelete,
  folders,
  onMoveToFolder
}: IFolderProps) {
  const handleCheckboxChange = (checked: boolean) => {
    if (onSelect) {
      onSelect(checked)
    }
  }

  return (
    <div className="w-[363px] relative h-[169px] group px-3 py-4 flex flex-col justify-between rounded-lg bg-zinc-50">
      <Image
        src={folderBg || "/placeholder.svg"}
        className="absolute -top-[20px] -left-[1px] -z-20 group-hover:scale-[101%] group-hover:scale-x-[101.5%]"
        alt="Asset"
      />

      <div className="w-full flex justify-between">
        <Checkbox
          checked={selectedFolders.includes(id)}
          onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
          className="opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 data-[state=checked]:bg-violet-600 data-[state=checked]:border-none size-5"
        />

        <Actions onMoveToFolder={onMoveToFolder} id={id} title={title} type="folder" onRename={onRename} onDelete={onDelete} hasFolders={true} folders={folders}>
          <Button variant="ghost" size="sm" className=" bg-slate-100 group-hover:opacity-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </Actions>
      </div>

      <div className="flex flex-col gap-3 px-2">
        <span className="max-w-full truncate text-lg font-semibold leading-6 text-ellipsis text-zinc-600">{title}</span>
        <div className="flex justify-between">
          <span className="text-zinc-400 font-semibold leading-6 text-ellipsis truncate text-sm">
            {projectsLength} projects
          </span>
          <span className="text-zinc-400 font-semibold leading-6 text-ellipsis truncate text-sm">{createdAt}</span>
        </div>
      </div>
    </div>
  )
}

