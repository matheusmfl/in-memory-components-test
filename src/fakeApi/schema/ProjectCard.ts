import { StaticImageData } from "next/image"

export interface ProjectCard {
    id: string
    title: string
    timeStamp?: string
    projectStatus: 'launched' | 'scheduled' | 'not_scheduled'
    members: { name: string; avatar: string }[]
    image?: string | StaticImageData
}