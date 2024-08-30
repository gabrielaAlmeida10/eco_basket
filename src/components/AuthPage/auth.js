// src/auth.js
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Função de login
export const login = async (email, password) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login bem-sucedido");
  } catch (error) {
    console.error("Erro no login:", error.message);
  }
};

// Função de logout
export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("Logout bem-sucedido");
  } catch (error) {
    console.error("Erro no logout:", error.message);
  }
};

// Verificação de usuário logado
export const checkUserAuth = (callback) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const checkAdmin = async () => {
  const auth = getAuth();
  const db = getFirestore();
  
  const user = auth.currentUser;
  if (!user) {
    return false; // Usuário não está autenticado
  }

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === "admin";
    } else {
      console.error("No user document found");
      return false;
    }
  } catch (error) {
    console.error("Error checking user role: ", error);
    return false;
  }
};
