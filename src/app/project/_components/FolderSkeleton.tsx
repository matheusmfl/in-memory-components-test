'use client'

import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import folderBg from '@/assets/FolderBg.svg'

export function FolderSkeleton() {
  return (
    <div className="w-[363px] relative h-[169px] group px-3 py-4 flex flex-col justify-between rounded-lg bg-zinc-50">
      <Image src={folderBg} className="absolute -top-[20px] -left-[1px] -z-20 group-hover:scale-[101%] group-hover:scale-x-[101.5%]" alt="Asset" />

      <div className="w-full flex justify-between">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="flex flex-col gap-3 px-2">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  )
}
