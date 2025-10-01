
import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
      getAuth, 
      signInWithEmailAndPassword,
      signOut
     } from "firebase/auth";

import {
     addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAXZAvs1uaL6DvNen8kFGAzLlPCjpWA3mg",
  authDomain: "netflix-clon-47caf.firebaseapp.com",
  projectId: "netflix-clon-47caf",
  storageBucket: "netflix-clon-47caf.firebasestorage.app",
  messagingSenderId: "943811779741",
  appId: "1:943811779741:web:fab5723b266b972cc10874"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password)=>{
        try{
          const res =  await createUserWithEmailAndPassword(auth, email, 
            password);
            const user =res.user;
            await addDoc(collection(db, "user"),{
                uid: user.uid,
                name,
                authProvider: "local",
                email,
                password,
            })
        } catch (error)  {
                console.log(error);
                toast.error(error.code.split('/')[1].split('-').join(' '));
        }
}



const login = async (email, password)=>{
        try{
              await  signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
                console.log(error);
                toast.error(error.code.split('/')[1].split('-').join(' '));
        }
}


const logout = ()=> {
    signOut(auth);

}


export {auth, db, login, signup, logout};