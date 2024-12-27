import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ProductCarousel from "./components/ProductCarrousel";
import SearchBar from "./components/SearchBar";
import ShoppingCart from "./components/ShoppingCart";
import SideMenu from "./principal/SideMenu";
import CardCreation from "./components/Card/CardCreation";
import CardRecharge from "./components/Card/CardRecharge";
import "./styles.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("cart");
  const [isCartVisible, setIsCartVisible] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart((prev) =>
      prev.filter((product) => product.id !== productToRemove.id)
    );
  };

  const addCard = (card) => {
    setCards((prev) => [...prev, card]);
  };

  const rechargeCard = (cardNumber, amount) => {
    setCards((prev) =>
      prev.map((card) =>
        card.cardNumber === cardNumber
          ? { ...card, balance: card.balance + amount }
          : card
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="side-menu-container">
        <SideMenu setView={setView} />
      </div>
      <div className="main-content">
        {view === "cart" && (
          <>
            <div className="search-bar">
              <SearchBar setSearchTerm={setSearchTerm} />
            </div>
            <div className="product-carousel">
              <ProductCarousel
                products={filteredProducts}
                addToCart={addToCart}
              />
            </div>
          </>
        )}
        {view === "create-card" && <CardCreation addCard={addCard} />}
        {view === "recharge" && (
          <CardRecharge cards={cards} rechargeCard={rechargeCard} />
        )}
      </div>
      {isCartVisible && (
        <div className="shopping-cart-container">
          <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
        </div>
      )}
    </div>
  );
};

export default App;
