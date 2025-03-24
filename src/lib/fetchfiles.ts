import { db } from "@/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export const fetchFiles = (parentId, userEmail) => {
  const [fileList, setFileList] = useState([]);
  const files = collection(db, "files");

  useEffect(() => {
    console.log("Current parentId:", parentId);

    const unsubscribe = onSnapshot(files, (snapshot) => {
      const filtered_files = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((file) => {
          const folderParentId = file.parentId;

          if (!parentId) {
            return (
              (!folderParentId || folderParentId === "") &&
              file.userEmail === userEmail
            );
          }
          return folderParentId === parentId && file.userEmail === userEmail;
        });

      console.log("Filtered files:", filtered_files);
      setFileList(filtered_files);
    });

    return () => unsubscribe();
  }, [parentId, userEmail]);

  return { fileList };
};
