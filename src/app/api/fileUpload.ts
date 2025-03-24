import { storage } from "@/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addFiles } from "./addFiledb";

 
export const fileUpload = (
  file: File,
  parentId: string | undefined,
  userEmail: string,
) => {
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        addFiles({
          name: file.name,
          url: downloadURL,
          isFolder: false,
          parentId,
          userEmail,
        });
        console.log("File available at", downloadURL);
      });
    },
  );
};
