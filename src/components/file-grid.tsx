import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Image,
  MoreVertical,
  FileSpreadsheet,
  FileCode,
} from "lucide-react";
import { FolderItem } from "./folder-item";
import { fetchFiles } from "@/lib/fetchfiles";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "document" | "image" | "spreadsheet" | "code";
  modified: string;
}

const files: FileItem[] = [
  {
    id: "1",
    name: "Projects",
    type: "folder",
    modified: "Mar 15, 2024",
  },
  {
    id: "2",
    name: "Documents",
    type: "folder",
    modified: "Mar 10, 2024",
  },
  {
    id: "3",
    name: "Images",
    type: "folder",
    modified: "Mar 5, 2024",
  },
  {
    id: "4",
    name: "Report.docx",
    type: "document",
    modified: "Mar 3, 2024",
  },
  {
    id: "5",
    name: "Budget.xlsx",
    type: "spreadsheet",
    modified: "Feb 28, 2024",
  },
  {
    id: "6",
    name: "Profile.jpg",
    type: "image",
    modified: "Feb 25, 2024",
  },
  {
    id: "7",
    name: "App.js",
    type: "code",
    modified: "Feb 20, 2024",
  },
  {
    id: "8",
    name: "Notes.txt",
    type: "document",
    modified: "Feb 15, 2024",
  },
];

interface FileGridProps {
  path?: string;
}

export function FileGrid({ path = "" }: FileGridProps) {
  const { fileList } = fetchFiles();
  console.log("filelist", fileList);

  const openFile = (link) => {
    window.open(link);
  };
  // In a real app, you would fetch files based on the path

  // This is just for demonstration - in a real app you'd have proper data relationships
  const getFilesForPath = (currentPath: string) => {
    if (!currentPath) return files;

    const segments = currentPath.split("/");
    const currentFolder = segments[segments.length - 1].toLowerCase();

    switch (currentFolder) {
      case "projects":
        return files.filter(
          (file) => file.type === "code" || file.type === "spreadsheet",
        );
      case "documents":
        return files.filter((file) => file.type === "document");
      case "images":
        return files.filter((file) => file.type === "image");
      default:
        return files;
    }
  };

  const filteredFiles = getFilesForPath(path);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {fileList.map(
        (file) => (
          // file.type === "folder" ? (
          //   <FolderItem
          //     key={file.id}
          //     id={file.id}
          //     name={file.name}
          //     modified={file.modified}
          //   />
          // ) : (
          <div
            key={file.id}
            className="group cursor-pointer rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex w-full flex-col items-center justify-center pb-2">
                <FileText className="h-12 w-12 text-green-500" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={()=>{openFile(file.url);}}>Open</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Move</DropdownMenuItem>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-2 truncate text-center text-sm font-medium">
              {file.name}
            </div>
            {/* <div className="mt-1 text-center text-xs text-muted-foreground">
              {file.modified}
            </div> */}
          </div>
        ),
        // ),
      )}
    </div>
  );
}
