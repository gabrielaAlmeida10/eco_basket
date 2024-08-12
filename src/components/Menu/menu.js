import "./menu.css";

const Menu = () => {
  return (
    <header>
      <nav>
        <ul class="menu">
          <li class="menu-item active">
            <a href="index.html">Início</a>
          </li>
          <li class="menu-item">
            <a href="produtos.html">Produtos</a>
          </li>
        </ul>
        <ul class="menu right-menu">
          <li class="menu-item">
            <a href="pedidos.html">
              <img src="images/carrinho.png" alt="Fazer Pedido" />
            </a>
          </li>
          <li class="menu-item">
            <a href="cadastroConsum.html">
              <button>Cadastro</button>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
