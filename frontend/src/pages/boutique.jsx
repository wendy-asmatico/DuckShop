import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/boutique.css";

function Boutique() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/product", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err.toString()));
  }, []);

  const nouveauxCanards = products.slice(-4).reverse();
  const catalogueCanards = products.slice(0, -4);

  return (
    <div className="boutique-container">
      
      {error && <p style={{ color: "red", textAlign: "center" }}>Erreur : {error}</p>}
      {products.length === 0 && !error && <p style={{ textAlign: "center", color: "#0277bd" }}>Chargement de la mare...</p>}

      {/* --- CAROUSEL --- */}
      {nouveauxCanards.length > 0 && (
        <>
          <h1 className="boutique-title">💦 Les Nouveautés</h1>
          
          <div className="carousel-container">
            {nouveauxCanards.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="product-link" style={{ minWidth: "260px" }}>
                <div className="card_product">
                   <div className="badge-new">New!</div>
                  <img 
                    src={p.img_principal} 
                    alt={`Nouveauté : ${p.name}`} 
                    className="card-img"
                  />
                  <div className="card-content">
                      <h3 className="card-title">{p.name}</h3>
                      <strong className="card-price new">{p.price} €</strong>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* --- GRILLE --- */}
      <h1 className="boutique-title secondary">🦆 Le Grand Bain</h1>
      
      <div className="grid-container">
        {catalogueCanards.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="product-link">
            <div className="card_product">
              <img 
                src={p.img_principal} 
                alt={`Produit : ${p.name}`} 
                className="card-img" 
              />
              <div className="card-content">
                <h4 className="card-title">{p.name}</h4>
                <span className="card-price">{p.price} €</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Boutique;