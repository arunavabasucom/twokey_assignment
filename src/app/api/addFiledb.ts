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
  parentFolderId?: string;
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
  parentFolderId,
}: AddfiolderdbProps) => {
  try {
    const folderdoc = addDoc(files, {
      folderName,
      fileList,
      isFolder,
      parentFolderId,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
