import { ProjectCard } from "./ProjectCard"

export interface IFolder {
  id: string
  title: string
  projectsLength: number
  createdAt: string
  projects: ProjectCard[] | null
}