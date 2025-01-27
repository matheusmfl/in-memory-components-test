"use client"

import * as React from "react"
import { FolderPlus, Trash2, PlusCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FolderComponent } from "./_components/Folder"
import { ProjectCard } from "./_components/ProjectCard"
import { ProjectCardSkeleton } from "./_components/ProjectCardSkeleton"


import { Separator } from "@/components/ui/separator"
import { ProjectMenuActions } from "./_components/ProjectMenuActions"
import { AlertModal } from "./_components/AlertModal"
import { CreateFolderModal } from "./_components/CreateFolderModal"

import type { IFolder } from "@/fakeApi/schema/Folder"
import type { ProjectCard as ProjectCardType } from "@/fakeApi/schema/ProjectCard"
import { InMemoryApiProjectCard } from "@/fakeApi/videos/FakeApiCards"
import { FolderSkeleton } from "./_components/FolderSkeleton"
import toast, { Toaster } from "react-hot-toast"
import { EmptyState } from "./_components/EmptyCardState"


const folderRepository = InMemoryApiProjectCard.getInstance()

export default function ProjectDashboard() {
  const [folders, setFolders] = React.useState<IFolder[]>([])
  const [projects, setProjects] = React.useState<ProjectCardType[]>([])
  const [getFoldersLoading, setGetFoldersLoading] = React.useState<boolean>(true)
  const [getProjectsLoading, setGetProjectsLoading] = React.useState<boolean>(true)
  const [addFolderLoading, setAddFolderLoading] = React.useState<boolean>(false)
  const [selectedFolders, setSelectedFolders] = React.useState<IFolder["id"][]>([])
  const [selectedProjects, setSelectedProjects] = React.useState<ProjectCardType["id"][]>([])
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false)
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = React.useState(false)
  const [isDeletingFolders, setIsDeletingFolders] = React.useState(false)
  const [isCreatingProject, setIsCreatingProject] = React.useState(false)
  const [itemsToDelete, setItemsToDelete] = React.useState<{ folders: string[]; projects: string[] }>({
    folders: [],
    projects: [],
  })

  const fetchFolders = React.useCallback(async () => {
    setGetFoldersLoading(true)
    const fetchedFolders = await folderRepository.getFolders()
    setFolders(fetchedFolders)
    setGetFoldersLoading(false)
  }, [])

  const fetchProjects = React.useCallback(async () => {
    setGetProjectsLoading(true)
    const fetchedProjects = await folderRepository.getProjectCards()
    setProjects(fetchedProjects)
    setGetProjectsLoading(false)
  }, [])

  React.useEffect(() => {
    fetchFolders()
    fetchProjects()
  }, [fetchFolders, fetchProjects])

  const handleFolderSelect = (folderId: string, isSelected: boolean) => {
    setSelectedFolders((prev) => (isSelected ? [...prev, folderId] : prev.filter((id) => id !== folderId)))
  }

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const handleTrashClick = () => {
    setItemsToDelete({ folders: selectedFolders, projects: selectedProjects })
    setIsAlertModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeletingFolders(true)
    try {
      await Promise.all([
        ...itemsToDelete.folders.map((id) => folderRepository.deleteFolders(id)),
        ...itemsToDelete.projects.map((id) => folderRepository.deleteProjectCard(id)),
      ])
      await fetchFolders()
      await fetchProjects()
      setSelectedFolders([])
      setSelectedProjects([])
    } catch (error) {
      console.error("Error deleting items:", error)
      toast.error("Error deleting items")
    } finally {
      setIsDeletingFolders(false)
      setIsAlertModalOpen(false)
      setItemsToDelete({ folders: [], projects: [] })
    }
  }

  const handleCreateFolder = async (folderName: string) => {
    setAddFolderLoading(true)
    await folderRepository.createFolder(folderName)
    await fetchFolders()
    setAddFolderLoading(false)
  }

  const handleCreateRandomProject = async () => {
    setIsCreatingProject(true)
    await folderRepository.addRandomCard()
    await fetchProjects()
    setIsCreatingProject(false)
  }

  const handleRenameFolder = (id: string) => {
    // Implement folder renaming logic
    toast(`Renaming folder ${id}`)
  }

  const handleDeleteFolder = async (id: string) => {
    try {
      await folderRepository.deleteFolders(id)
      await fetchFolders()
      toast.success("Folder deleted successfully")
    } catch (error) {
      console.error("Error deleting folder:", error)
      toast.error("Error deleting folder")
    }
  }

  const handleRenameProject = (id: string) => {
    // Implement project renaming logic
    toast(`Renaming project ${id}`)
  }

  const handleDeleteProject = async (id: string) => {
    try {
      await folderRepository.deleteProjectCard(id)
      await fetchProjects()
      toast.success("Project deleted successfully")
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Error deleting project")
    }
  }


  const handleMoveProjectsToFolder = async (projectIds: string[], folderId: string) => {
    try {
      await folderRepository.moveCardsToFolder({ projectsId: projectIds, folderId: folderId })
      await fetchProjects()
      setSelectedProjects([])
      toast.success(`Projects moved to folder successfully`)
    } catch (error) {
      console.error("Error moving projects to folder:", error)

    }
  }

  const handleMoveProjectToFolder = async (projectsId: string[], folderId: string) => {
    try {
      await folderRepository.moveCardsToFolder({ projectsId, folderId })
      await fetchProjects()
      toast.success(`Project moved to folder successfully`)
    } catch (error) {
      console.error("Error moving project to folder:", error)
      toast.error("Error moving project to folder")
    }
  }



  return (
    <div className="p-6 max-w-[1200px] mx-auto flex w-full flex-col gap-5">
      <h1 className="text-2xl font-semibold text-zinc-800 leading-8">Projects</h1>
      <Toaster />
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center h-full gap-2">
          <Button
            onClick={handleCreateRandomProject}
            variant="default"
            className="bg-violet-600 text-base font-medium hover:bg-violet-700"
            size="sm"
          >
            {isCreatingProject ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
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
            disabled={isDeletingFolders || (selectedFolders.length === 0 && selectedProjects.length === 0)}
          >
            {isDeletingFolders ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 " />
                Trash
              </>
            )}
          </Button>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-zinc-600 mb-5">
        Folders <span className="text-zinc-400">· {folders.length}</span>
      </h2>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10">
          {getFoldersLoading
            ? Array.from({ length: 6 }).map((_, index) => <FolderSkeleton key={index} />)
            : folders.map((folder) => (
              <FolderComponent
                onMoveToFolder={(projectId) => handleMoveProjectToFolder(projectId, folder.id)}
                folders={folders}
                key={folder.id}
                id={folder.id}
                title={folder.title}
                projectsLength={folder.projectsLength}
                createdAt={folder.createdAt}
                selectedFolders={selectedFolders}
                onSelect={(isSelected) => handleFolderSelect(folder.id, isSelected)}
                onRename={handleRenameFolder}
                onDelete={handleDeleteFolder}
              />
            ))}
          {addFolderLoading && <FolderSkeleton />}
        </div>
      </div>

      <h2 className="text-sm font-semibold text-zinc-600 mb-5">
        Projects <span className="text-zinc-400">· {projects.filter((project) => !project.folderId).length}</span>
      </h2>
      <div className="flex flex-col gap-5">
        {getProjectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : projects.filter((project) => !project.folderId).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects
              .filter((project) => !project.folderId)
              .map((project) => (
                <ProjectCard
                  folders={folders}
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  timeStamp={project.timeStamp}
                  projectStatus={project.projectStatus}
                  members={project.members}
                  image={project.image ?? undefined}
                  toggleSelection={handleProjectSelect}
                  selectedItems={selectedProjects}
                  onRename={handleRenameProject}
                  onDelete={handleDeleteProject}
                  onMoveToFolder={() => handleMoveProjectToFolder}
                  hasFolders={folders.length > 0}
                />
              ))}
          </div>
        ) : (
          <EmptyState onCreateProject={handleCreateRandomProject} />
        )}
      </div>



      <ProjectMenuActions
        selectedCount={selectedFolders.length + selectedProjects.length}
        onClearSelection={() => {
          setSelectedFolders([])
          setSelectedProjects([])
        }}
        selectedProjects={selectedProjects}
        onDelete={handleTrashClick}
        onMoveToFolder={handleMoveProjectsToFolder}
        hasFolders={folders.length > 0}
        hasSelectedFolders={selectedFolders.length > 0}
        folders={folders}
      />

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${itemsToDelete.folders.length + itemsToDelete.projects.length} item(s)`}
        description="Are you sure you want to delete the selected items? This action cannot be undone."
      />

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  )
}

