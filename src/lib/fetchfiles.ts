import { db } from "@/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";



export const fetchFiles = (parentFolderId ) => {
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
           // Check both parenFolderId and parentFolderId to handle the typo
           const folderParentId = file.parenFolderId || file.parentFolderId;

           if (!parentFolderId) {
             return !folderParentId || folderParentId === "";
           }
           return folderParentId === parentFolderId;
         });

       console.log("Filtered files:", filtered_files);
       setFileList(filtered_files);
     });

     return () => unsubscribe();
   }, [parentFolderId]);

   return { fileList };
};
