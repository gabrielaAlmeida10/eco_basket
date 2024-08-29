import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import NewOrder from "../NewOrder/newOrder";
import "./cart.css";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Função para tratar o upload do comprovante
  const handleUploadReceipt = (orderId) => {
    // Implemente aqui o código para abrir um modal ou input de arquivo para o upload do comprovante
    console.log("Abrir modal para enviar comprovante do pedido:", orderId);
  };

  useEffect(() => {
    const fetchUserRole = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          console.error("Documento do usuário não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o papel do usuário:", error);
      }
    };

    const fetchOrders = async (user) => {
      try {
        let ordersQuery;
        if (userRole === "admin") {
          ordersQuery = query(collection(db, "orders"));
        } else {
          ordersQuery = query(collection(db, "orders"), where("customerName", "==", user.displayName));
        }
        const querySnapshot = await getDocs(ordersQuery);
        const fetchedOrders = querySnapshot.docs.map((doc) => doc.data());
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserRole(user);
        await fetchOrders(user);
      } else {
        console.log("Nenhum usuário logado");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db, userRole]);

  return (
    <main>
      <h2 className="title">Meus Pedidos</h2>
      {userRole === "cliente" && (
        <button className="open-modal-btn" onClick={openModal}>
          Novo Pedido
        </button>
      )}

      <section className="pedidos">
        {loading ? (
          <p>Carregando pedidos...</p>
        ) : (
          orders.length === 0 ? (
            <p>Não há pedidos para mostrar.</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="pedido">
                <h3>Pedido {index + 1}</h3>
                <p>Produtos:</p>
                <ul>
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="carrinho-item">
                      <span className="produto-nome">{item.productName}</span>
                      <span className="produto-quantidade">x{item.quantity}</span>
                      <span className="produto-preco">R$ {item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <p>Total: R$ {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                {order.status === "aguardando comprovante" && (
                  <button onClick={() => handleUploadReceipt(order.id)}>Enviar Comprovante</button>
                )}
              </div>
            ))
          )
        )}
      </section>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <NewOrder />
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
