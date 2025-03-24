import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MoreVertical } from "lucide-react";
import { FolderItem } from "./folder-item";
import { useFetchFiles } from "@/lib/fetchfiles";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface BaseFile {
  id: string;
  isFolder: boolean;
  parentId?: string | null;
  userEmail?: string;
}

interface Filedb extends BaseFile {
  name: string;
  url?: string;
}

interface Folderdb extends BaseFile {
  folderName: string;
}

interface FileGridProps {
  parentId: string | null | undefined;
}

export function FileGrid({ parentId }: FileGridProps) {
  const { data: session } = useSession();
  const userEmail = session?.user.email;
  const { fileList } = useFetchFiles(parentId ?? "", userEmail ?? "");
  const [files, setFiles] = useState<(Filedb | Folderdb)[]>(fileList);

  useEffect(() => {
    setFiles(fileList);
  }, [fileList]);

  const openFile = (link: string) => {
    window.open(link);
  };

  const shareFile = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      toast({ title: "Link copied to clipboard" });
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {files.map((file: Filedb | Folderdb) =>
        file.isFolder ? (
          <FolderItem
            key={file.id}
            id={file.id ?? ""}
            name={(file as Folderdb).folderName}
          />
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
                  <button className="h-8 w-8 opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      openFile((file as Filedb).url ?? "");
                    }}
                  >
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      shareFile((file as Filedb).url ?? "");
                    }}
                  >
                    Share
                  </DropdownMenuItem>                
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-2 truncate text-center text-sm font-medium">
              {(file as Filedb).name}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
