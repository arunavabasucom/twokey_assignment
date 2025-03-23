import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  HardDrive,
  Clock,
  Star,
  Share2,
  Trash2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function Sidebar() {
  return (
    <div className="hidden h-full w-64 flex-col border-r border-border md:flex">
      <div className="p-4">
        <Button className="w-full justify-start gap-2">
          <PlusCircle className="h-4 w-4" />
          New
        </Button>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <HardDrive className="h-4 w-4" />
          My Drive
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Clock className="h-4 w-4" />
          Recent
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Star className="h-4 w-4" />
          Starred
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Share2 className="h-4 w-4" />
          Shared with me
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Trash2 className="h-4 w-4" />
          Trash
        </Button>
      </nav>
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Storage</div>
          <Progress value={30} className="h-2" />
          <div className="text-xs text-muted-foreground">
            3.5 GB of 15 GB used
          </div>
        </div>
      </div>
    </div>
  );
}
