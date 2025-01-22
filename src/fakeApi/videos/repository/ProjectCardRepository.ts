import { ProjectCard } from "@/fakeApi/schema/ProjectCard";

export interface ProjectCardRepository {
  getProjectCards(): Promise<ProjectCard[]>
  deleteProjectCard(projectId: string): Promise<void>
  renameProjectCard(title: string): Promise<ProjectCard>
  deleteMany({ids}: {ids: string[]}): Promise<void>
}