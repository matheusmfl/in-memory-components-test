"use client"

import * as React from "react"
import { FolderPlus, Trash2, Check, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FolderComponent } from "./_components/Folder"
import { StaticImageData } from "next/image"
import cardBg from '@/assets/bg.jpg'
import { ProjectCard } from "./_components/ProjectCard"
import { Separator } from "@/components/ui/separator"
import { ProjectMenuActions } from "./_components/ProjectMenuActions"
import { AlertModal } from "./_components/AlertModal"
import { CreateFolderModal } from "./_components/CreateFolderModal"
import { IFolder } from '../../fakeApi/schema/Folder'

interface Project {
  id: string
  title: string
  image: string | StaticImageData
  status: "scheduled" | "launched" | "not_scheduled"
  members: { name: string; avatar: string }[]
  timestamp: string
}

interface Folder {
  id: string
  title: string
  projectCount: number
  lastUpdated: string
}

export default function ProjectDashboard() {
  const [folders, setFolders] = React.useState<Folder[]>([
    {
      id: "1",
      title: "Most important videos ever made",
      projectCount: 4,
      lastUpdated: "2 months ago",
    },
    {
      id: "2",
      title: "Work stuff",
      projectCount: 13,
      lastUpdated: "5 days ago",
    },
  ])

  const [selectedFolders, setSelectedFolders] = React.useState<IFolder['id'][]>([])

  console.log(selectedFolders)

  const projects: Project[] = [
    {
      id: "1",
      title: "Jublub mobile",
      image: cardBg,
      status: "scheduled",
      members: [
        { name: "User 1", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
        { name: "User 2", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
        { name: "User 3", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
      ],
      timestamp: "4 days ago",
    },
    {
      id: "2",
      title: "Improve workflow",
      image: cardBg,
      status: "launched",
      members: [
        { name: "User 1", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
        { name: "User 2", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
        { name: "User 3", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
      ],
      timestamp: "1 month ago",
    },
    {
      id: "3",
      title: "A better tool for agencies",
      image: cardBg,
      status: "not_scheduled",
      members: [
        { name: "User 1", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
        { name: "User 2", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
        { name: "User 3", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random" },
      ],
      timestamp: "3 hours ago",
    },
  ]

  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false)
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = React.useState(false)

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleClearSelection = () => {
    setSelectedFolders([])
  }

  function handleFolderSelect(folderId: IFolder['id'], isSelected: boolean) {
    setSelectedFolders((prev) =>
      isSelected ? [...prev, folderId] : prev.filter((id) => id !== folderId)
    );
  }

  const handleTrashClick = () => {
    setIsAlertModalOpen(true)
  }

  const handleDeleteConfirm = () => {

    console.log("Deleting selected items:", selectedItems)
    setSelectedItems([])
    setIsAlertModalOpen(false)
  }

  const handleCreateFolder = (folderName: string) => {
    const newFolder: Folder = {
      id: `${folders.length + 1}`,
      title: folderName,
      projectCount: 0,
      lastUpdated: "Just now",
    }
    setFolders([...folders, newFolder])
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-zinc-800 leading-8">Projects</h1>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center h-full gap-2">
          <Button variant="default" className="bg-violet-600 text-base font-medium hover:bg-violet-700" size="sm">
            <PlusCircle className="h-4 w-4 " />
            New Project
          </Button>
          <Button
            variant="outline"
            className="text-zinc-700 flex gap-2 font-semibold text-base"
            size="sm"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <FolderPlus className="h-4 w-4 " />
            Add Folder
          </Button>
          <Separator orientation="vertical" className=" h-full" />
          <Button
            variant="outline"
            className="text-zinc-700 font-semibold flex gap-2 text-base hover:bg-red-400 hover:text-white"
            size="sm"
            onClick={handleTrashClick}
          >
            <Trash2 className="h-4 w-4 " />
            Trash
          </Button>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-zinc-600 mb-5">Folders <span className="text-zinc-400">· {folders.length}</span></h2>
      <div className=" flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10">
          {folders.map((folder) => (
            <FolderComponent selectedFolders={selectedFolders} key={folder.id} id={folder.id} onSelect={(isSelected) => handleFolderSelect(folder.id, isSelected)} createdAt={folder.lastUpdated} title={folder.title} projectsLength={folder.projectCount} />
          ))}
        </div>
      </div>

      <h2 className="text-sm font-semibold text-zinc-600 ">Projects <span className="text-zinc-400">· {projects.length}</span></h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard image={project.image} id={project.id} members={project.members} timeStamp={project.timestamp} projectStatus={project.status} selectedItems={selectedItems} toggleSelection={toggleSelection} title={project.title} key={project.id} />
          ))}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-background border rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>{selectedItems.length} items</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedItems([])}
          >
            Cancel
          </Button>
        </div>
      )}
      <div>

        <ProjectMenuActions selectedCount={selectedFolders.length}
          onClearSelection={handleClearSelection} />
      </div>

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  )
}

