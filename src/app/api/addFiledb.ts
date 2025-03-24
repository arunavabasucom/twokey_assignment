import { db } from "@/firebase.config";
import { collection, addDoc } from "firebase/firestore";

const files = collection(db, "files");
export const addFiles = ({ name, url, isFolder, parentId ,userEmail}: Filedb) => {
  try {
 addDoc(files, {
      url,
      name,
      isFolder,
      parentId,
      userEmail
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addFolder = ({
  folderName,
  isFolder,
  parentId,
  userEmail
}: Folderdb) => {
  try {
  addDoc(files, {
    folderName,
      isFolder,
      parentId,
      userEmail
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
