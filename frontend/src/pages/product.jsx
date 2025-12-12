import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// Pas besoin de CSS externe, Tailwind + DaisyUI gèrent tout !

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  
  // État pour gérer quelle image est affichée en grand
  const [selectedImage, setSelectedImage] = useState("");
  // État pour simuler la galerie (car tu n'as peut-être qu'une image en base)
  const [gallery, setGallery] = useState([]);
  // État pour l'animation du "Toast" (notification)
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/product/${id}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Produit introuvable");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.img_principal);
        setGallery([
            data.img_principal,
            data.img_profil,
            data.img_3    
          ]);
      })
      .catch((err) => setError(err.toString()));
  }, [id]);

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart.push({
        ...product,
        img_principal: product.img_principal 
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetch(`http://localhost:3001/cart/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
      });
    }

    // Affiche le Toast pendant 3 secondes
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  if (error) return <div className="alert alert-error m-10">{error}</div>;
  if (!product) return <div className="text-center mt-20"><span className="loading loading-dots loading-lg text-primary"></span></div>;

  return (
    <div className="min-h-screen shadow py-10 px-4 font-sans">

      <div className="card lg:card-side bg-base-100 shadow-xl max-w-6xl mx-auto overflow-hidden">
        
        {/* --- COLONNE GAUCHE : IMAGES --- */}
        <div className="w-full lg:w-1/2 p-6 bg-white">
            
            {/* Image Principale */}
            <div className="rounded-2xl overflow-hidden border-4 border-base-200 shadow-inner mb-4 h-96 flex items-center justify-center bg-gray-50">
                <img 
                    src={selectedImage} 
                    alt={product.name} 
                    className="object-contain h-full w-full hover:scale-110 transition-transform duration-500 cursor-zoom-in" 
                />
            </div>

            {/* Galerie de 4 images */}
            <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, index) => (
                    <div 
                        key={index} 
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt="thumbnail" className="w-full h-20 object-cover" />
                    </div>
                ))}
            </div>
        </div>

        {/* --- COLONNE DROITE : INFO --- */}
        <div className="card-body lg:w-1/2 p-8 lg:p-12">
          
            {/* Titre et Badge */}
            <div className="flex justify-between items-start">
                <h1 className="card-title text-4xl font-bold text-secondary mb-2">{product.name}</h1>
                <div className="badge badge-accent text-white p-3 font-bold">En Stock</div>
            </div>

            {/* Note (Étoiles fictives) */}
            <div className="rating rating-sm mb-4">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked disabled />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
            </div>

            {/* Prix */}
            <p className="text-5xl font-bold text-error my-4 drop-shadow-sm">
                {product.price} €
            </p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-lg">
                {product.description || "Ce magnifique canard est le compagnon idéal pour vos bains moussants. Fabriqué avec du plastique de haute qualité, il flotte parfaitement et résiste aux éclaboussures les plus intenses."}
            </p>

            {/* Séparateur */}
            <div className="divider"></div>

            {/* Actions */}
            <div className="card-actions flex-col gap-4 mt-4">
                {/* On pourrait ajouter un sélecteur de quantité ici */}
                
                <button 
                    onClick={addToCart} 
                    className="btn btn_duck btn-lg w-full text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1"
                >
                    🛒 Ajouter au panier
                </button>
                
                <div className="text-center text-xs text-gray-400 mt-2">
                    Livraison gratuite dès 3 canards • Retour sous 30 jours
                </div>
            </div>
        </div>
      </div>

      {/* --- SECTION BASSE : CARACTÉRISTIQUES (Onglets DaisyUI) --- */}
      <div className="max-w-6xl shadow mx-auto mt-10">
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold text-secondary" aria-label="Description" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <h3 className="font-bold text-lg mb-2">Détails du produit</h3>
                <p>Plongez dans l'univers du bain avec ce modèle unique. Sa conception aérodynamique lui permet de naviguer entre les îlots de mousse avec une agilité déconcertante.</p>
            </div>
        </div>
      </div>

      {/* --- TOAST NOTIFICATION (Apparaît quand on clique) --- */}
      {showToast && (
        <div className="toast toast-end toast-bottom z-50">
            <div className="alert alert-success text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Excellent choix ! Ajouté au panier.</span>
            </div>
        </div>
      )}

    </div>
  );
}

export default Product;