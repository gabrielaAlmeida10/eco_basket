import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import trashIcon from '../../images/delete.png';
import './newOrder.css';

const NewOrder = () => {
  const db = getFirestore();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [message, setMessage] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        setMessage(`Erro ao buscar produtos: ${error.message}`);
      }
    };

    fetchProducts();
  }, [db]);

  const handleAddProduct = () => {
    const product = products.find(p => p.name === selectedProduct);

    if (!product || quantity <= 0) {
      setMessage("Por favor, selecione um produto e informe uma quantidade válida.");
      return;
    }

    setOrderItems([
      ...orderItems,
      { productName: product.name, price: product.price, quantity }
    ]);

    setSelectedProduct("");
    setQuantity(1);
  };

  const handleProceedToSummary = () => {
    if (!customerName || !orderDate || orderItems.length === 0) {
      setMessage("Por favor, preencha todos os campos e adicione pelo menos um produto.");
      return;
    }

    // Salva os dados no localStorage ou em algum outro lugar para acessar na página de resumo
    localStorage.setItem("orderSummary", JSON.stringify({
      customerName,
      orderDate,
      items: orderItems
    }));

    navigate('/orderSummary');
  };

  return (
    <div className="new-order-page">
      <h1>Cadastro de Pedidos</h1>
      <form id="orderForm">
        <label>Nome do Cliente:</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <div className="product-selection">
          <label>Produto:</label>
          <select
            id="product"
            name="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {products.map(product => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <label>Quantidade:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            required
          />

          <button
            type="button"
            className="add-product-btn"
            onClick={handleAddProduct}
          >
            Adicionar Produto
          </button>
        </div>

        <table id="productTable">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço Unitário</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>R$ {item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => setOrderItems(orderItems.filter((_, i) => i !== index))}
                    className="delete-button"
                  >
                    <img src={trashIcon} alt="Lixeira" className="icon"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <label>Data do Pedido:</label>
        <input
          type="date"
          id="orderDate"
          name="orderDate"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          required
        />

        <button type="button" className="proceed-summary" onClick={handleProceedToSummary}>
          Ir para Resumo do Pedido
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default NewOrder;
