import React from "react";

import "./newOrder.css";

const NewOrder = () => {
  return (
    <div>
      <div class="container">
        <h1>Cadastro de Pedidos</h1>
        <form id="orderForm">
          <label for="customerName">Nome do Cliente:</label>
          <input type="text" id="customerName" name="customerName" required />

          <div class="product-selection">
            <label for="product">Produto:</label>
            <select id="product" name="product">
              <option value="produto1">Produto 1</option>
              <option value="produto2">Produto 2</option>
              <option value="produto3">Produto 3</option>
              <option value="produto4">Produto 4</option>
            </select>
            <button
              type="button"
              class="add-product-btn"
              onclick="adicionarProduto()"
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
          <label for="orderDate">Data do Pedido:</label>
          <input type="date" id="orderDate" name="orderDate" required />
          <button type="submit" onclick="cadastrarPedido(event)">
            Cadastrar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
