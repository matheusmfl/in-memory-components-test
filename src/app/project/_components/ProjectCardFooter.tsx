import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface FooterProps {
  title: string
  createdAt: string
  members: { name: string; avatar: string }[]
  projectStatus: 'launched' | 'scheduled' | 'not_scheduled'
}

export function Footer({
  createdAt,
  title,
  members,
  projectStatus
}: FooterProps) {
  const statusColors = {
    launched: "bg-green-500",
    scheduled: "bg-yellow-500",
    not_scheduled: "bg-gray-500"
  }

  const textColors = {
    launched: "text-green-500",
    scheduled: "text-yellow-500",
    not_scheduled: "text-gray-500"
  }

  const statusText = {
    launched: "Launched",
    scheduled: "Scheduled",
    not_scheduled: "Not Scheduled"
  }

  return (
    <footer className="relative bg-white p-3 space-y-2">
      <div className="flex flex-col justify-between">
        <p className="text-[20px]  truncate max-w-[calc(100%-20px)] text-zinc-800 font-medium">
          {title}
        </p>

        <p className="opacity-0 text-zinc-500 group-hover:opacity-100 transition-opacity text-[16px]  truncate">
          {createdAt}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("w-3 h-3 rounded-full", statusColors[projectStatus])} />
          <span className={cn("text-base font-normal", textColors[projectStatus])}>
            {statusText[projectStatus]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {members.length > 0 && (
            <span className="text-sm text-zinc-500">
              {members.length} members
            </span>
          )}
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((member, i) => (
              <Avatar key={i} className="w-6 h-6 border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
              </Avatar>
            ))}
          </div>

        </div>
      </div>


    </footer>
  )
}