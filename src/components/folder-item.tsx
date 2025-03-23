"use client";

import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";

interface FolderItemProps {
  id: string;
  name: string;
  modified: string;
}

export function FolderItem({ id, name, modified }: FolderItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
    >
      <div className="flex w-full flex-col items-center justify-center pb-2">
        <Folder className="h-12 w-12 text-blue-500" />
      </div>
      <div className="mt-2 truncate text-center text-sm font-medium">
        {name}
      </div>
      <div className="mt-1 text-center text-xs text-muted-foreground">
        {modified}
      </div>
    </div>
  );
}
