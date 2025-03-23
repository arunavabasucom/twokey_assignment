"use client";

import { Button } from "@/components/ui/button";
import { Upload, FolderPlus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fileUpload } from "@/app/api/fileUpload";
import { addFolder } from "@/app/api/addFiledb";

interface FileActionsProps {
  parentFolderId: string | undefined;
}

export function FileActions({ parentFolderId }: FileActionsProps) {
  //   const [fiile , setFile] = useState(null);
  //     const uploadFile = () => {

  //   }
  console.log("parentFolderId", parentFolderId);

  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.click();
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        console.log("Files selected:", files);
        fileUpload(files[0]);
      }
    };
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      // Here you would create the folder in your backend
      console.log("Creating folder:", folderName);
      addFolder({
        fileList: [],
        folderName,
        isFolder: true,
        parentFolderId: parentFolderId || "",
      });
      setFolderName("");
      setIsCreateFolderOpen(false);
      console.log("Created folder:", folderName);
      // In a real app, you would make an API call to create the folder
    }
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <Button onClick={handleUpload} className="gap-2">
        <Upload className="h-4 w-4" />
        Upload
      </Button>

      <Button
        variant="outline"
        onClick={() => setIsCreateFolderOpen(true)}
        className="gap-2"
      >
        <FolderPlus className="h-4 w-4" />
        New Folder
      </Button>

      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="folder-name">Folder name</Label>
              <Input
                id="folder-name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Untitled Folder"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateFolderOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
