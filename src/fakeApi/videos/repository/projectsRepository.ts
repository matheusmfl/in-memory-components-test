type Project ={
  name: string
}

export interface IProjectsRepository {
  getProjects(userId: string): Promise<Project>
  createProject(Project: Project): Promise<boolean>
}