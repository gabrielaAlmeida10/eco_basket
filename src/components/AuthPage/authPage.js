import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
  const [message, setMessage] = useState(""); // Adiciona o estado para a mensagem
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

      // Salvar os dados do usuário no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        address: address,
        photoURL: photoURL,
      });

      setMessage("Cadastro realizado com sucesso!");
      navigate("/home"); // Redirecionar para a página home após cadastro
    } catch (error) {
      setMessage(`Erro no cadastro: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Cadastro</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Cadastrar</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
