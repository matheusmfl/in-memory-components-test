'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

interface UploadDropzoneProps {
  onFilesAdded: (files: File[]) => void
}

export function UploadDropzone({ onFilesAdded }: UploadDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles)
  }, [onFilesAdded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`
        p-[28px_8px]
        flex
        flex-col
        justify-center
        items-center
        border-2
        border-dashed
        rounded-lg
        transition-colors
        ${isDragActive
          ? 'border-violet-600 bg-violet-100/10'
          : 'border-violet-300 bg-zinc-100'
        }
      `}
    >
      <input {...getInputProps()} />

      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${isDragActive ? 'text-violet-600' : 'text-zinc-400'}`}
      >
        <path d="M30.6666 18.3335C30.6666 18.8858 31.1144 19.3335 31.6666 19.3335C32.2188 19.3335 32.6666 18.8858 32.6666 18.3335H30.6666ZM18.3333 32.6668C18.8855 32.6668 19.3333 32.2192 19.3333 31.6668C19.3333 31.1146 18.8855 30.6668 18.3333 30.6668V32.6668ZM21.6666 21.6668L21.9828 20.7182C21.6234 20.5984 21.2274 20.692 20.9594 20.9598C20.6916 21.2276 20.5982 21.6238 20.718 21.983L21.6666 21.6668ZM36.6666 26.6668L37.1138 27.5612C37.4756 27.3804 37.6928 26.9994 37.664 26.596C37.6354 26.1926 37.3666 25.846 36.9828 25.7182L36.6666 26.6668ZM30 30.0002L29.5528 29.1058C29.3592 29.2026 29.2022 29.3594 29.1054 29.553L30 30.0002ZM26.6666 36.6668L25.718 36.983C25.8458 37.3668 26.1922 37.6356 26.5956 37.6644C26.9992 37.693 27.3802 37.4758 27.561 37.114L26.6666 36.6668ZM6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5H6ZM4 5.01666C4 5.56896 4.44772 6.01666 5 6.01666C5.55228 6.01666 6 5.56896 6 5.01666H4ZM12.6666 5C12.6666 4.44772 12.2189 4 11.6666 4C11.1143 4 10.6666 4.44772 10.6666 5H12.6666ZM10.6666 5.01666C10.6666 5.56896 11.1143 6.01666 11.6666 6.01666C12.2189 6.01666 12.6666 5.56896 12.6666 5.01666H10.6666ZM19.3334 5C19.3334 4.44772 18.8857 4 18.3334 4C17.7811 4 17.3334 4.44772 17.3334 5H19.3334ZM17.3334 5.01666C17.3334 5.56896 17.7811 6.01666 18.3334 6.01666C18.8857 6.01666 19.3334 5.56896 19.3334 5.01666H17.3334ZM26 5C26 4.44772 25.5522 4 25 4C24.4478 4 24 4.44772 24 5H26ZM24 5.01666C24 5.56896 24.4478 6.01666 25 6.01666C25.5522 6.01666 26 5.56896 26 5.01666H24ZM6 11.6669C6 11.1146 5.55228 10.6669 5 10.6669C4.44772 10.6669 4 11.1146 4 11.6669H6ZM4 11.6835C4 12.2358 4.44772 12.6835 5 12.6835C5.55228 12.6835 6 12.2358 6 11.6835H4ZM6 18.3332C6 17.7809 5.55228 17.3332 5 17.3332C4.44772 17.3332 4 17.7809 4 18.3332H6ZM4 18.3498C4 18.9021 4.44772 19.3498 5 19.3498C5.55228 19.3498 6 18.9021 6 18.3498H4ZM6 25C6 24.4478 5.55228 24 5 24C4.44772 24 4 24.4478 4 25H6ZM4 25.0166C4 25.569 4.44772 26.0166 5 26.0166C5.55228 26.0166 6 25.569 6 25.0166H4ZM32.6666 18.3335V15.0002H30.6666V18.3335H32.6666ZM32.6666 15.0002C32.6666 13.8509 32.21 12.7487 31.3974 11.9361L29.9832 13.3503C30.4208 13.7879 30.6666 14.3813 30.6666 15.0002H32.6666ZM31.3974 11.9361C30.5848 11.1234 29.4826 10.6669 28.3332 10.6669V12.6669C28.952 12.6669 29.5456 12.9127 29.9832 13.3503L31.3974 11.9361ZM28.3332 10.6669H14.9999V12.6669H28.3332V10.6669ZM14.9999 10.6669C13.8506 10.6669 12.7484 11.1234 11.9358 11.9361L13.35 13.3503C13.7876 12.9127 14.3811 12.6669 14.9999 12.6669V10.6669ZM11.9358 11.9361C11.1231 12.7487 10.6666 13.8509 10.6666 15.0002H12.6666C12.6666 14.3813 12.9124 13.7879 13.35 13.3503L11.9358 11.9361ZM10.6666 15.0002V28.3336H12.6666V15.0002H10.6666ZM10.6666 28.3336C10.6666 29.4828 11.1231 30.585 11.9358 31.3976L13.35 29.9834C12.9124 29.5458 12.6666 28.9524 12.6666 28.3336H10.6666ZM11.9358 31.3976C12.7484 32.2104 13.8506 32.6668 14.9999 32.6668V30.6668C14.3811 30.6668 13.7876 30.421 13.35 29.9834L11.9358 31.3976ZM14.9999 32.6668H18.3333V30.6668H14.9999V32.6668ZM21.3504 22.6156L36.3504 27.6156L36.9828 25.7182L21.9828 20.7182L21.3504 22.6156ZM36.2194 25.7724L29.5528 29.1058L30.4472 30.8946L37.1138 27.5612L36.2194 25.7724ZM29.1054 29.553L25.7722 36.2196L27.561 37.114L30.8944 30.4474L29.1054 29.553ZM27.6152 36.3506L22.6152 21.3506L20.718 21.983L25.718 36.983L27.6152 36.3506ZM4 5V5.01666H6V5H4ZM10.6666 5V5.01666H12.6666V5H10.6666ZM17.3334 5V5.01666H19.3334V5H17.3334ZM24 5V5.01666H26V5H24ZM4 11.6669V11.6835H6V11.6669H4ZM4 18.3332V18.3498H6V18.3332H4ZM4 25V25.0166H6V25H4Z" fill="currentColor" />
      </svg>

      <p className="mt-4 text-sm text-zinc-500">
        Drag and drop videos here
      </p>

      <p className="text-sm text-zinc-500 mt-2">
        or
      </p>

      <Button
        variant="secondary"
        className="mt-2 bg-violet-600 text-white hover:bg-violet-700"
      >
        Browse videos
      </Button>
    </div>
  )
}

