import { storage } from "@/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addFiles } from "./addFiledb";

export const fileUpload = (
  file: any,
  parentId: any,
  userEmail: any,
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
      const durl = getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => {
          // addFiles(downloadURL, file.name, parentId, userEmail, ownerEmail);
          addFiles({
            url: downloadURL,
            name: file.name,
            isFolder: false,
            parentId,
            userEmail
          });
          console.log("File available at", downloadURL);
        },
      );
    },
  );
};
