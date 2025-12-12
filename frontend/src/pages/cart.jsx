import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, [location]); 

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  function clearCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
        fetch(`http://localhost:3001/cart/${user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: [] }) 
        });
    }
    localStorage.removeItem("cart");
    setCart([]);
  }

  return (
    <div className="min-h-screen p-4 md:p-10 font-sans">
      
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête */}
        <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold text-jaune">🛁 Mon Panier</h1>
            <span className="badge badge-lg badge-primary text-white font-bold">
                {cart.length} Articles
            </span>
        </div>

        {/* --- CAS 1 : PANIER VIDE --- */}
        {cart.length === 0 && (
            <div className="alert alert-warning shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 className="font-bold">Votre baignoire est vide !</h3>
                    <div className="text-xs">Allez vite pêcher quelques canards.</div>
                </div>
                <Link to="/boutique" className="btn btn-sm btn-ghost">Retourner à la boutique</Link>
            </div>
        )}

        {/* --- CAS 2 : PANIER REMPLI --- */}
        {cart.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* TABLEAU DES ARTICLES */}
                <div className="lg:col-span-2 overflow-x-auto bg-blanc rounded-box shadow-xl">
                    <table className="table w-full">
                        <thead className="bg-cyan text-white text-2xl">
                            <tr>
                                <th>#</th>
                                <th>Produit</th>
                                <th className="text-right">Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="hover">
                                    
                                    {/* COLONNE 1 : INDEX */}
                                    <th>{index + 1}</th>

                                    {/* COLONNE 2 : IMAGE + NOM (Correction ici : Un seul TD) */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            {/* Avatar Image */}
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16 bg-white"> 
                                                    <img 
                                                        src={item.img_principal} 
                                                        alt={item.name} 
                                                        className="object-cover" 
                                                    />
                                                </div>
                                            </div>
                                            {/* Nom du produit */}
                                            <div>
                                                <div className="font-bold text-lg text-warning">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* COLONNE 3 : PRIX */}
                                    <td className="text-right font-mono text-lg text-neutral">
                                        {item.price} €
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* RÉSUMÉ */}
                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body">       
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500">Total à payer</span>
                            <span className="text-3xl font-bold text-error">
                                {total.toFixed(2)} €
                            </span>
                        </div>

                        <div className="card-actions flex-col gap-3 mt-4">
                            <button className="btn btn_duck btn-block text-white text-lg rounded-full">
                                Valider la commande
                            </button>
                            
                            <button 
                                onClick={clearCart}
                                className="btn btn-outline bg-error text-white btn-sm btn-block rounded-full hover:bg-cyan"
                            >
                                Vider le panier
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        )}
      </div>
    </div>
  );
}

export default Cart;