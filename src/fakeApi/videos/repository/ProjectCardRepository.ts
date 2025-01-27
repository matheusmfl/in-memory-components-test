import { ProjectCard } from "@/fakeApi/schema/ProjectCard";

export interface ProjectCardRepository {
  getProjectCards(): Promise<ProjectCard[]>
  deleteProjectCard(projectId: string): Promise<void>
  renameProjectCard(title: string): Promise<ProjectCard>
  deleteMany({ids}: {ids: string[]}): Promise<void>
  moveCardsToFolder({folderId, projectsId} : {folderId: string, projectsId: string[]}): Promise<void>
  addProjectCard(project: Partial<ProjectCard>): Promise<ProjectCard>
  addRandomCard(): Promise<ProjectCard>
}