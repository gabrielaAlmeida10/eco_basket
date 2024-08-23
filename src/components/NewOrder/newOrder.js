import React from "react";

import "./newOrder.css";

const NewOrder = () => {

  const cadastrarPedido = () => {
    console.log('pedido cadastrado');
  }

  const adicionarProduto = () => {
    console.log('produto selecionado!');
  }

  return (
    <div>
      <div className="container">
        <h1>Cadastro de Pedidos</h1>
        <form id="orderForm">
          <label>Nome do Cliente:</label>
          <input type="text" id="customerName" name="customerName" required />

          <div className="product-selection">
            <label>Produto:</label>
            <select id="product" name="product">
              <option value="produto1">Produto 1</option>
              <option value="produto2">Produto 2</option>
              <option value="produto3">Produto 3</option>
              <option value="produto4">Produto 4</option>
            </select>
            <button
              type="button"
              className="add-product-btn"
              onClick={adicionarProduto()}
            >
              Adicionar Produto
            </button>
          </div>
          <table id="productTable">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="productTableBody"></tbody>
          </table>
          <label>Data do Pedido:</label>
          <input type="date" id="orderDate" name="orderDate" required />
          <button type="submit" className="saveOrder"  onClick={cadastrarPedido()}>
            Cadastrar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
