"use client"

import { MoreHorizontal } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import cardBg from "@/assets/bg.jpg"
import { Footer } from "./ProjectCardFooter"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Actions } from "./Actions"
import { IFolder } from "@/fakeApi/schema/Folder"


interface ProjectCardProps {
  id: string
  title: string
  timeStamp?: string
  projectStatus: "launched" | "scheduled" | "not_scheduled"
  members: { name: string; avatar: string }[]
  image?: string | StaticImageData
  toggleSelection: (id: string) => void
  selectedItems: string[]
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onMoveToFolder: (id: string[], folderId: string) => void
  hasFolders: boolean
  folders: IFolder[]
}

export function ProjectCard({
  image,
  members,
  hasFolders,
  projectStatus,
  timeStamp,
  title,
  toggleSelection,
  id,
  selectedItems,
  onRename,
  onDelete,
  folders,
  onMoveToFolder,
}: ProjectCardProps) {
  const isSelected = selectedItems.includes(id)

  return (
    <div
      className={`group relative border rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${isSelected ? "ring-2 ring-primary" : ""}`}

    >
      <div className="relative aspect-[16/9]">
        <Image src={image ?? cardBg} width={400} height={400} alt={title} className="object-cover w-full h-full" />
        <div className="absolute top-2 left-2 opacity-0 px-4 pt-2 flex items-center group-hover:opacity-100 transition-opacity">
          <Checkbox
            checked={isSelected}
            onClick={() => toggleSelection(id)}
            className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-none size-5"
          />
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Actions
            hasFolders={hasFolders}
            id={id}
            title={title}
            type="project"
            onRename={onRename}
            folders={folders}
            onDelete={onDelete}
            onMoveToFolder={onMoveToFolder}
          >
            <Button variant="ghost" size="sm" className="bg-slate-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </Actions>
        </div>
      </div>
      <Footer createdAt={timeStamp ?? "4 days ago"} members={members} projectStatus={projectStatus} title={title} />
    </div>
  )
}

