import { db } from "@/firebase.config";
import { collection, addDoc } from "firebase/firestore";
interface AddfiledbProps {
  url: string;
  name: string;
  isFolder: boolean;
}
interface AddfiolderdbProps {
  folderName: string;
  fileList: any;
  isFolder: boolean;
  parenFolderId?: string;
}

const files = collection(db, "files");
export const addFiles = ({ name, url,isFolder }: AddfiledbProps) => {
  try {
    const filedoc = addDoc(files, {
      url,
      name,
      isFolder
    });
    // console.log("Document written with ID: ", filedoc);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addFolder = ({
  folderName,
  fileList,
  isFolder,
  parenFolderId,
}: AddfiolderdbProps) => {
  try {
    const folderdoc = addDoc(files, {
      folderName,
      fileList,
      isFolder,
      parenFolderId,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
