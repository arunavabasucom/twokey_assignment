"use client";
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
import { useRouter } from "next/navigation";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "document" | "image" | "spreadsheet" | "code";
  modified: string;
}

interface FileGridProps {
  path?: string;
}

export function FileGrid({ parentId }) {
  // const {data }
  console.log("parentId))))", parentId);
  const { fileList } = fetchFiles(parentId, "tempemailab03@gmail.com");
  console.log("filelist", fileList);

  const openFile = (link: string) => {
    window.open(link);
  };

  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {fileList.map((file) =>
        file.isFolder ? (
          <FolderItem key={file.id} id={file.id} name={file.folderName} />
        ) : (
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
                  <DropdownMenuItem
                    onClick={() => {
                      openFile(file.url);
                    }}
                  >
                    Open
                  </DropdownMenuItem>
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
          </div>
        ),
      )}
    </div>
  );
}
