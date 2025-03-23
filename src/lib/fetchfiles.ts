import { db } from "@/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
let files = collection(db, "files");

export const fetchFiles = () => {
  const [fileList, setFileList] = useState([]);
  
      useEffect(() => {
onSnapshot(files, (snapshot) => {
  setFileList(
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  );
});
    }, []);
  return { fileList };
};
