import { FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onCreateProject: () => void
}

export function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
      <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
      <p className="text-sm text-muted-foreground mb-4">You either dont have any projects yet or all your projects are in folders. Create a new project to get started.</p>
      <Button onClick={onCreateProject}>Create Project</Button>
    </div>
  )
}