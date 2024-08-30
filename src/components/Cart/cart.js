import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const DELIVERY_FEE = 10.00; // Defina a taxa de entrega aqui

const Cart = () => {
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

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
        ordersQuery = query(collection(db, "orders"), where("status", "==", "pago"));
      } else {
        ordersQuery = query(collection(db, "orders"), where("customerName", "==", user.displayName));
      }
      const querySnapshot = await getDocs(ordersQuery);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      // Atualiza a lista de pedidos após a alteração de status
      const updatedOrders = orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido:", error);
    }
  };

  return (
    <main>
      <h2 className="title">Meus Pedidos</h2>
      {userRole === "cliente" && (
        <button className="open-modal-btn" onClick={() => navigate("/newOrder")}>
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
              <div key={order.id} className="pedido">
                <h3>Pedido {index + 1}</h3>
                <p>Status: {order.status}</p>
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
                <p>Taxa de Entrega: R$ {DELIVERY_FEE.toFixed(2)}</p>
                <p>Total: R$ {(order.items.reduce((total, item) => total + item.price * item.quantity, 0) + DELIVERY_FEE).toFixed(2)}</p>
                
                {userRole === "admin" && order.status !== "entregue" && (
                  <div>
                    <button
                      disabled={order.status === "em preparo"}
                      onClick={() => handleStatusChange(order.id, "em preparo")}
                    >
                      Em Preparo
                    </button>
                    <button
                      disabled={order.status === "em transito"}
                      onClick={() => handleStatusChange(order.id, "em transito")}
                    >
                      Em Transito
                    </button>
                    <button
                      disabled={order.status === "entregue"}
                      onClick={() => handleStatusChange(order.id, "entregue")}
                    >
                      Entregue
                    </button>
                  </div>
                )}
              </div>
            ))
          )
        )}
      </section>
    </main>
  );
};

export default Cart;
