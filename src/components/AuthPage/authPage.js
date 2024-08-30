import React, { useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./authPage.css";

const AuthPage = () => {
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore(); // Firestore para salvar os dados do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState(""); // Estado para a mensagem
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e cadastro
  const navigate = useNavigate();

  // Função de registro de cliente
  const handleRegisterClient = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = "";
      if (photo) {
        const photoRef = ref(storage, `photos/${user.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      // Atualizar o perfil do usuário com o nome
      await updateProfile(user, { displayName: name });

      // Salvar o usuário no Firestore com o role de 'cliente'
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        address: address,
        photoURL: photoURL,
        role: "cliente" // Define a função como 'cliente'
      });

      // Redirecionar ou mostrar mensagem de sucesso
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      setMessage(`Erro ao cadastrar: ${error.message}`);
    }
  };

  // Função para login de usuários
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar função do usuário no Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") {
          navigate("/home"); 
        } else {
          navigate("/home"); 
        }
      } else {
        setMessage("Usuário não encontrado.");
      }

      setMessage("Login realizado com sucesso!");
    } catch (error) {
      setMessage(`Erro no login: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Cadastro"}</h2>
        <form className="auth-form" onSubmit={isLogin ? handleLogin : handleRegisterClient}>
          {!isLogin && (
            <>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="address">Endereço Residencial:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label htmlFor="photo">Foto (Opcional):</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </>
          )}
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
          {message && <p className="message">{message}</p>}
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
