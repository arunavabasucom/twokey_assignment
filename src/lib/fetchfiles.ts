import { db } from "@/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export const fetchFiles = (parentFolderId, userEmail) => {
  const [fileList, setFileList] = useState([]);
  const files = collection(db, "files");

  useEffect(() => {
    console.log("Current parentFolderId:", parentFolderId);

    const unsubscribe = onSnapshot(files, (snapshot) => {
      const filtered_files = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((file) => {
          const folderParentId = file.parentId;

          if (!parentFolderId) {
            return (
              (!folderParentId || folderParentId === "") &&
              file.userEmail === userEmail
            );
          }
          return (
            folderParentId === parentFolderId && file.userEmail === userEmail
          );
        });

      console.log("Filtered files:", filtered_files);
      setFileList(filtered_files);
    });

    return () => unsubscribe();
  }, [parentFolderId, userEmail]);

  return { fileList };
};
