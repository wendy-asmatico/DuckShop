import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "../assets/css/cart.css"

function Cart() {
  const [cart, setCart] = useState([]);
    const location = useLocation();

 useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(stored);
    }, [location]); // 🔥 se relance après login, logout, navigation

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    function clearCart() {
    // 1. On récupère l'utilisateur pour savoir quel panier vider sur le serveur
    const user = JSON.parse(localStorage.getItem("user"));

    // 2. Si l'utilisateur est connecté, on vide le panier côté serveur
    if (user) {
        fetch(`http://localhost:3001/cart/${user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: [] }) // On envoie un tableau vide
        });
    }

    // 3. On vide le panier localement (pour l'affichage immédiat)
    localStorage.removeItem("cart");
    setCart([]);
}

    return (
        <div className="cart-container">
            <h1>Mon Panier</h1>

            {cart.length === 0 && <p>Votre panier est vide.</p>}

            {cart.map((item, index) => (
                <div key={index} className="cart-item">
                    <h3>{item.name}</h3>
                    <p>{item.price} €</p>
                </div>
            ))}

            {cart.length > 0 && (
                <>
                    <h2>Total : {total.toFixed(2)} €</h2>
                    <button
                        className="btn_duck p-6"
                        onClick={clearCart}
                    >
                        Vider le panier
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;
