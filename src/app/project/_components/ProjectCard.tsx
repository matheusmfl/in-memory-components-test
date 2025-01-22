'use client'

import { Check } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import cardBg from '@/assets/bg.jpg'
import { Footer } from "./ProjectCardFooter"

interface ProjectCardProps {
  id: string
  title: string
  timeStamp?: string
  projectStatus: 'launched' | 'scheduled' | 'not_scheduled'
  members: { name: string; avatar: string }[]
  image?: string | StaticImageData
  toggleSelection: (id: string) => void,
  selectedItems: string[]
}
export function ProjectCard({ image, members, projectStatus, timeStamp, title, toggleSelection, id, selectedItems }: ProjectCardProps) {

  return (
    <div

      className={`group relative border rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${selectedItems.includes(id) ? "ring-2 ring-primary" : ""
        }`}
      onClick={() => toggleSelection(id)}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={image ?? cardBg}
          width={400}
          height={400}
          alt={title}
          className="object-cover w-full h-full"
        />
        {selectedItems.includes(id) && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
      <Footer createdAt={timeStamp ?? '4 days ago'} members={members} projectStatus={projectStatus} title={title} />
    </div>
  )
}