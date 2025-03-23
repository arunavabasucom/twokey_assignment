import { db } from "@/firebase.config";
import { collection, addDoc } from "firebase/firestore";
interface AddfiledbProps {
  url: string;
  name: string;
  isFolder: boolean;
  parentId: string | undefined;
  userEmail: string;
}
interface AddfiolderdbProps {
  folderName: string;
  fileList: any;
  isFolder: boolean;
  parentId?: string;
  userEmail: string;
}

const files = collection(db, "files");
export const addFiles = ({ name, url, isFolder, parentId ,userEmail}: AddfiledbProps) => {
  try {
    const filedoc = addDoc(files, {
      url,
      name,
      isFolder,
      parentId,
      userEmail
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
  parentId,
  userEmail
}: AddfiolderdbProps) => {
  try {
    const folderdoc = addDoc(files, {
      folderName,
      fileList,
      isFolder,
      parentId,
      userEmail
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
