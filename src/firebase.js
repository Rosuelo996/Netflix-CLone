
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCnWR8Efx-81w8NA4Jfda-K3rmQKteU_S4",
  authDomain: "netflix-clone-a690a.firebaseapp.com",
  projectId: "netflix-clone-a690a",
  storageBucket: "netflix-clone-a690a.firebasestorage.app",
  messagingSenderId: "454772294703",
  appId: "1:454772294703:web:8679802c1e75e1d9ddf2da"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = async () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};