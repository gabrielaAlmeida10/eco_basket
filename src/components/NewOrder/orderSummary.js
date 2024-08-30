import React, { useState } from 'react';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import './orderSummary.css';

const DELIVERY_FEE = 15.00; // Defina a taxa de entrega aqui

const OrderSummary = () => {
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();
  const [paymentProof, setPaymentProof] = useState(null);
  const [message, setMessage] = useState("");

  const orderSummary = JSON.parse(localStorage.getItem("orderSummary"));
  const { customerName, orderDate, items } = orderSummary || {};

  const handleUploadPaymentProof = (event) => {
    setPaymentProof(event.target.files[0]);
  };

  const handleSubmitOrder = async () => {
    if (!paymentProof) {
      setMessage("Por favor, envie o comprovante de pagamento.");
      return;
    }

    try {
      // Upload do comprovante para o Firebase Storage
      const paymentProofRef = ref(storage, `paymentProofs/${paymentProof.name}`);
      await uploadBytes(paymentProofRef, paymentProof);
      const paymentProofURL = await getDownloadURL(paymentProofRef);

      // Criação do pedido no Firestore
      const orderData = {
        customerName,
        orderDate,
        items,
        paymentProofURL,
        createdAt: new Date(),
        status: 'pago' // Define o status como 'pago'
      };

      // Adicionar o pedido ao Firestore e obter o ID do documento
      const orderDocRef = await addDoc(collection(db, "orders"), orderData);

      // Atualiza o pedido com o status
      await updateDoc(doc(db, "orders", orderDocRef.id), {
        status: 'pago'
      });

      setMessage("Pedido cadastrado com sucesso!");
      localStorage.removeItem("orderSummary"); // Limpar o resumo do pedido
      navigate('/cart');
    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      setMessage(`Erro ao cadastrar pedido: ${error.message}`);
    }
  };

  return (
    <div className="order-summary-page">
      <h1>Resumo do Pedido</h1>
      <div className="order-details">
        <p><strong>Nome do Cliente:</strong> {customerName}</p>
        <p><strong>Data do Pedido:</strong> {orderDate}</p>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço Unitário</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>R$ {item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="delivery-fee">
          <p><strong>Taxa de Entrega:</strong> R$ {DELIVERY_FEE.toFixed(2)}</p>
        </div>
        <div className="total">
          <p><strong>Total:</strong> R$ {(items.reduce((total, item) => total + item.price * item.quantity, 0) + DELIVERY_FEE).toFixed(2)}</p>
        </div>
      </div>
      <div className="payment-proof">
        <label>Comprovante de Pagamento:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadPaymentProof}
        />
      </div>
      <button
        type="button"
        className="submit-order"
        onClick={handleSubmitOrder}
      >
        Finalizar Pedido
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default OrderSummary;
