import { IFolder } from "@/fakeApi/schema/Folder";

export interface FolderRepository {
  getFolders(): Promise< IFolder[]>,
  deleteFolders(folderId: string): Promise<void>
}