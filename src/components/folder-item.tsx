"use client";

import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";

interface FolderItemProps {
  id: string;
  name: string;
}

export function FolderItem({ id, name }: FolderItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/folder?id=${id}`);
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
    
    </div>
  );
}