import {db} from '@/firebase.config';
import { collection, addDoc } from "firebase/firestore";
interface AdddbProps {
    url: string;
    name: string;
}

export const addFiles =  ({name,url}:AdddbProps) => {
    const files = collection(db, "files");
    try {
    const filedoc = addDoc(files, {
        url: url,
        name: name,
    });
    // console.log("Document written with ID: ", filedoc);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


