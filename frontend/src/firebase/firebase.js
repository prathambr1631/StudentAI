import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM2dzxGyV3Prpb5SK1OxG40zV6j2qUA18",
  authDomain: "studentai-83a49.firebaseapp.com",
  projectId: "studentai-83a49",
  storageBucket: "studentai-83a49.appspot.com",
  messagingSenderId: "25820581089",
  appId: "1:25820581089:web:67b689048a648304ddbba0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;