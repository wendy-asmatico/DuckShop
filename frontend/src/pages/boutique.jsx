import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Boutique() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/product", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err.toString()));
  }, []);

  // --- LOGIQUE DE TRI ---
  // On suppose que les produits sont reçus dans l'ordre (ID 1, 2, 3...).
  // On prend les 5 derniers pour le carousel (slice(-5)) et on inverse pour voir le plus récent en premier
  const nouveauxCanards = products.slice(-5).reverse();
  // On prend tout le reste (du début jusqu'aux 5 derniers) pour le catalogue
  const catalogueCanards = products.slice(0, -5);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      
      {/* --- SECTION 1 : LE CAROUSEL (NOUVEAUTÉS) --- */}
      <h1>🔥 Les Derniers Arrivés</h1>
      
      <div style={{ 
          display: "flex", 
          overflowX: "scroll", // Permet de scroller horizontalement
          gap: "20px", 
          paddingBottom: "20px",
          marginBottom: "40px",
          borderBottom: "2px solid #eee"
      }}>
        {nouveauxCanards.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ minWidth: "250px", border: "1px solid #ddd", borderRadius: "10px", padding: "10px" }}>
               {/* Image mise en avant */}
              <img 
                src={p.img_principal} 
                alt={`Nouveauté : ${p.name}`} 
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} 
              />
              <h3>{p.name}</h3>
              <strong style={{ color: "green" }}>Nouveau ! {p.price} €</strong>
            </div>
          </Link>
        ))}
      </div>


      {/* --- SECTION 2 : LE CATALOGUE (LE RESTE) --- */}
      <h1>Le Reste de la Mare</h1>
      
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {products.length === 0 && !error && <p>Chargement...</p>}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
        gap: "20px" 
      }}>
        {catalogueCanards.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
              <img 
                src={p.img_principal} 
                alt={`Produit : ${p.name}`} 
                style={{ width: "100%", height: "150px", objectFit: "cover" }} 
              />
              <div style={{ padding: "10px" }}>
                <h4>{p.name}</h4>
                <span>{p.price} €</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Boutique;