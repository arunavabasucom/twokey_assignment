interface Filedb {
id?: string;
  url: string;
  name: string;
  isFolder: boolean;
  parentId: string | undefined;
  userEmail: string;
}

interface Folderdb {
    id?: string;
  folderName: string;
  isFolder: boolean;
  parentId?: string;
  userEmail: string;
}