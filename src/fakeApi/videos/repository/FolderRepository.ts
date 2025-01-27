import { IFolder } from "@/fakeApi/schema/Folder";

export interface FolderRepository {
  getFolders(): Promise< IFolder[]>,
  deleteFolder(folderId: string): Promise<void>,
  createFolder(folderName: string): Promise<IFolder>
  deleteManyFolders(foldersId: string[]): Promise<void>
}