'use client'

import { Video } from "@/fakeApi/schema/video"
import { memo, ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileActions } from "./FileActions"

interface FileListProps {
  imageThumb: string
  file: Video
  handleChangeVideoName: ({ name, videoId }: { name: string; videoId: string }) => void
  children: ReactNode
  progress: number
  handleDelete: (videoId: string) => void
}

const FileList = memo(({ imageThumb, file, children, handleChangeVideoName, progress, handleDelete }: FileListProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(file.name)

  console.log("Rendering FileList for:", file.name);

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    handleChangeVideoName({ name: newName, videoId: file.id })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setNewName(file.name)
    setIsEditing(false)
  }

  return (
    <div className="w-full h-auto min-h-[84px] flex flex-nowrap p-2 pr-6 border-[2px] border-violet-200 rounded-xl">
      <img src={imageThumb} alt="thumbs" className="size-[64px] rounded-[8px] overflow-hidden object-cover" />
      <div className="ml-3 flex flex-col justify-center gap-1 flex-1">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="max-w-[200px]"
            />
            <Button onClick={handleSave} variant="default" size="sm">Save</Button>
            <Button onClick={handleCancel} variant="destructive" size="sm">Cancel</Button>
          </div>
        ) : (
          <span className="text-xl font-semibold text-zinc-600 truncate max-w-md">{file.name}</span>
        )}
        <div className="flex gap-3">
          <span className="text-sm font-normal text-zinc-500">{(file.size / 100 / 100 / 100).toFixed(2)} MB</span>
          {!isEditing && (
            <div className="flex gap-2 cursor-pointer" onClick={handleEditClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14.3844 4.40873L11.5913 1.61623C11.3568 1.38189 11.039 1.25024 10.7075 1.25024C10.376 1.25024 10.0582 1.38189 9.82375 1.61623L2.11625 9.3231C1.99978 9.43886 1.90744 9.57658 1.84457 9.72828C1.7817 9.87998 1.74956 10.0426 1.75 10.2069V13C1.75 13.3315 1.8817 13.6494 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H13.5C13.6989 14.25 13.8897 14.171 14.0303 14.0303C14.171 13.8897 14.25 13.6989 14.25 13.5C14.25 13.3011 14.171 13.1103 14.0303 12.9696C13.8897 12.829 13.6989 12.75 13.5 12.75H7.8125L14.3844 6.17685C14.5005 6.06077 14.5926 5.92295 14.6555 5.77126C14.7183 5.61957 14.7507 5.45698 14.7507 5.29279C14.7507 5.12859 14.7183 4.96601 14.6555 4.81432C14.5926 4.66263 14.5005 4.52481 14.3844 4.40873ZM5.6875 12.75H3.25V10.3125L8.5 5.06248L10.9375 7.49998L5.6875 12.75ZM12 6.43748L9.5625 3.99998L10.7088 2.85373L13.1463 5.29123L12 6.43748Z" fill="#71717A" />
              </svg>
              <span className="text-sm font-normal text-zinc-500">Edit name</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5 ml-auto">

        {(progress < 100) ? (<><div className="flex gap-4 items-center justify-center"> <span className="mt-2">uploading...</span> {children}</div> </>) : (
          <>
            <FileActions videoId={file.id} fileName={file.name} onDelete={() => handleDelete(file.id)} previewLink="" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 17.5225 17.5225 22 12 22C6.4775 22 2 17.5225 2 12C2 6.4775 6.4775 2 12 2C17.5225 2 22 6.4775 22 12Z" fill="#34D399" />
              <path d="M10.6464 16.3536L6.64638 12.3536C6.45088 12.1581 6.45088 11.8416 6.64638 11.6466L7.35338 10.9396C7.54888 10.7441 7.86538 10.7441 8.06038 10.9396L10.9999 13.8791L16.4394 8.43959C16.6349 8.24409 16.9514 8.24409 17.1464 8.43959L17.8534 9.14659C18.0489 9.34209 18.0489 9.65859 17.8534 9.85359L11.3534 16.3536C11.1584 16.5491 10.8414 16.5491 10.6464 16.3536Z" fill="white" />
            </svg>

          </>

        )}
      </div>
    </div>
  )
})

FileList.displayName = 'FileList'

export { FileList };

