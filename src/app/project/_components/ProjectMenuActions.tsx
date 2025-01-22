import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { Folder, Trash2 } from "lucide-react";

interface ProjectMenuActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function ProjectMenuActions({ selectedCount, onClearSelection }: ProjectMenuActionsProps) {
  return (
    <div className={cn("w-[474px] rounded-2xl p-4 pl-6 flex justify-between items-center left-1/2 transform -translate-x-1/2 bg-slate-900 fixed  bottom-10", selectedCount == 0 && ('hidden'))}>
      <div className="flex gap-[14px] min-w-[120px]">
        <Checkbox
          className="data-[state=checked]:bg-violet-600 border border-white rounded-sm data-[state=checked]:border-none size-5"
          checked={selectedCount > 0}
          onCheckedChange={(checked) => {
            if (!checked) {
              onClearSelection();
            }
          }}
        />

        <span className="text-base font-medium leading-5 text-zinc-50">{selectedCount} {selectedCount === 1 ? 'item' : 'itens'}</span>
      </div>

      <div className="flex gap-4">
        <Button variant={'outline'}>
          <Folder size={20} />
        </Button>

        <Button variant={'outline'}>
          <Trash2 size={20} />
        </Button>
      </div>


      <Button variant={'secondary'}>
        Cancel
      </Button>
    </div>
  )
}