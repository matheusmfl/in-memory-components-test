import type { ProjectCard } from "@/fakeApi/schema/ProjectCard"
import type { IFolder } from "@/fakeApi/schema/Folder"
import type { ProjectCardRepository } from "./repository/ProjectCardRepository"
import type { FolderRepository } from "./repository/FolderRepository"
import bg from "@/assets/bg.jpg"
import uuid from 'react-native-uuid';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function generateRandomTimestamp(): string {
  const units = [
    { name: "hour", max: 24 },
    { name: "day", max: 30 },
    { name: "month", max: 12 },
    { name: "year", max: 10 },
  ]

  const unit = units[Math.floor(Math.random() * units.length)]
  const value = Math.floor(Math.random() * unit.max) + 1
  return `${value} ${unit.name}${value > 1 ? "s" : ""} ago`
}

const randomUUID = () => {
  return uuid.v4()
}

export class InMemoryApiProjectCard implements ProjectCardRepository, FolderRepository {
  private static instance: InMemoryApiProjectCard
  private items: ProjectCard[] = []
  private folders: IFolder[] = []

  private constructor() {
    this.initializeData()
  }

  public static getInstance(): InMemoryApiProjectCard {
    if (!InMemoryApiProjectCard.instance) {
      InMemoryApiProjectCard.instance = new InMemoryApiProjectCard()
    }
    return InMemoryApiProjectCard.instance
  }

  private initializeData() {
    const folder1Id = randomUUID()
    const folder2Id = randomUUID()

    this.items = [
      {
        id: randomUUID(),
        title: "Project Alpha",
        timeStamp: generateRandomTimestamp(),
        projectStatus: "launched",
        members: [
          { name: "Alice", avatar: this.generateAvatar("Alice") },
          { name: "Bob", avatar: this.generateAvatar("Bob") },
        ],
        image: "https://example.com/image1.jpg",
        folderId: folder1Id,
      },
      {
        id: randomUUID(),
        title: "Project Beta",
        timeStamp: generateRandomTimestamp(),
        projectStatus: "scheduled",
        members: [{ name: "Charlie", avatar: this.generateAvatar("Charlie") }],
        image: null,
        folderId: folder2Id,
      },
    ]

    this.folders = [
      {
        id: folder1Id,
        title: "Folder 1",
        projectsLength: 1,
        createdAt: generateRandomTimestamp(),
        projects: this.items.filter((card) => card.folderId === folder1Id),
      },
      {
        id: folder2Id,
        title: "Folder 2",
        projectsLength: 1,
        createdAt: generateRandomTimestamp(),
        projects: this.items.filter((card) => card.folderId === folder2Id),
      },
    ]
  }

  async getProjectCards(): Promise<ProjectCard[]> {
    await delay(500)
    return this.items
  }

  async deleteProjectCard(projectId: string): Promise<void> {
    await delay(500)
    this.items = this.items.filter((card) => card.id !== projectId)
    this.updateFolderProjects()
  }

  async deleteFolders(folderId: string): Promise<void> {
    await delay(500)
    this.folders = this.folders.filter((folder) => folder.id !== folderId)
    this.items = this.items.filter((item) => item.folderId !== folderId)
    this.updateFolderProjects()
  }


  async createFolder(folderName: string): Promise<IFolder> {
    await delay(500)
    const newFolder: IFolder = {
      createdAt: generateRandomTimestamp(),
      id: randomUUID(),
      projects: [],
      projectsLength: 0,
      title: folderName,
    }

    this.folders.push(newFolder)
    return newFolder
  }

  async renameProjectCard(title: string): Promise<ProjectCard> {
    await delay(500)
    const project = this.items.find((card) => card.title === title)
    if (!project) throw new Error("Project not found")
    project.title = title
    return project
  }

  async deleteMany({ ids }: { ids: string[] }): Promise<void> {
    await delay(500)
    this.items = this.items.filter((card) => !ids.includes(card.id))
    this.updateFolderProjects()
  }

  async addRandomCard(): Promise<ProjectCard> {
    await delay(500)
    
    const randomTitle = `Project ${Math.random().toString(36).substring(2, 8)}`; 
    const randomStatus = ["launched", "scheduled", "not_scheduled"][Math.floor(Math.random() * 3)]; 

  
    const randomMembersCount = Math.floor(Math.random() * 5) + 1; 
    const randomMembers = Array.from({ length: randomMembersCount }).map(() => {
      const name = `Member ${Math.random().toString(36).substring(2, 8)}`; 
      return { name, avatar: this.generateAvatar(name) };
    });
  
    const newCard: ProjectCard = {
      id: randomUUID(),
      title: randomTitle,
      timeStamp: generateRandomTimestamp(),
      projectStatus: randomStatus as "launched" | "scheduled" | "not_scheduled",
      members: randomMembers,
      image: bg,
      folderId: null,
    }
  
    this.items.push(newCard)
    this.updateFolderProjects()
    return newCard
  }

  async moveCardsToFolder({ folderId, projectsId }: { folderId: string, projectsId: string[] }): Promise<void> {

    await delay(500)
    this.items = this.items.map(item => {
      if (projectsId.includes(item.id)) {
        return { ...item, folderId }; 
      }
      return item; 
    });
  
   
    this.updateFolderProjects();
  }

  private updateFolderProjects() {
    this.folders.forEach((folder) => {
      folder.projects = this.items.filter((card) => card.folderId === folder.id)
      folder.projectsLength = folder.projects.length
    })
  }

  private generateAvatar(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
  }

  async addProjectCard(project: Partial<ProjectCard>): Promise<ProjectCard> {
    await delay(500)
    const newCard: ProjectCard = {
      id: randomUUID(),
      title: project.title || "Untitled Project",
      timeStamp: generateRandomTimestamp(),
      projectStatus: project.projectStatus || "not_scheduled",
      members:
        project.members?.map((member) => ({
          ...member,
          avatar: this.generateAvatar(member.name),
        })) || [],
      image: project.image || null,
      folderId: project.folderId || null,
    }

    this.items.push(newCard)
    this.updateFolderProjects()
    return newCard
  }

  async getFolders(): Promise<IFolder[]> {
    await delay(500)
    return this.folders
  }

  async deleteFolder(folderId: string): Promise<void> {
    await delay(500) 

    // Remove the folder
    this.folders = this.folders.filter((folder) => folder.id !== folderId)


    this.items = this.items.filter((item) => item.folderId !== folderId)


    this.updateFolderProjects()
  }

  async deleteManyFolders(foldersId: string[]): Promise<void> {
    await delay(500) 

    this.folders = this.folders.filter((folder) => !foldersId.includes(folder.id))


    this.items = this.items.filter((item) => !foldersId.includes(item.folderId ?? ''))


    this.updateFolderProjects()
  }
}

