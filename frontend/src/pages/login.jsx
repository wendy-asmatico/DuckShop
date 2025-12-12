import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  // --- ÉTATS (LOGIQUE) ---
  const [isLogin, setIsLogin] = useState(true); // Pour basculer entre Login et Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nouveau state pour le nom (Inscription)
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- GESTION DU SUBMIT ---
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIQUE DE CONNEXION (Celle que tu as fournie) ---
        const res = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.message || "Erreur de connexion");
        }

        // Récupération du panier
        const cartRes = await fetch(`http://localhost:3001/cart/${data.user.id}`);
        const cartData = await cartRes.json();
        
        // Stockage
        localStorage.setItem("cart", JSON.stringify(cartData.cart));
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirection
        navigate("/");

      } else {
        
        console.log("Tentative d'inscription avec :", name, email, password);
        const res = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Note : On envoie 'name' ici car c'est une inscription
          body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.message || "Erreur lors de l'inscription");
        }

        // --- SUCCÈS : AUTO-LOGIN ---
        // Une fois inscrit, le backend doit idéalement renvoyer l'utilisateur créé (data.user)
        // On le stocke pour connecter la personne directement sans repasser par le login.
        
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Pour un nouvel inscrit, le panier est vide par défaut
        localStorage.setItem("cart", JSON.stringify([]));

        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // --- RENDU UI (DESIGN) ---
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      
    
      {/* LA CARTE */}
      <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-3xl z-10 relative mt-10">
        
        {/* IMAGE DU CANARD (Mascotte) */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20 pointer-events-none">
            <img 
              src="/img/canard.png" 
              alt="Mascotte" 
              className="w-full h-full object-contain drop-shadow-lg"
            />
        </div>

        <div className="card-body items-center text-center pt-16">
          
          <h2 className="card-title text-3xl font-black text-sky-950 mb-2">
            {isLogin ? 'Bon retour !' : 'Bienvenue !'}
          </h2>
          
          {/* AFFICHAGE DES ERREURS */}
          {error && (
            <div className="alert alert-error text-sm py-2 shadow-lg mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-2">
            
            {/* CHAMP NOM (Uniquement si Inscription) */}
            {!isLogin && (
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-bold text-sky-900">Nom de Codeur</span>
                </label>
                <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ex: DuckVador" 
                      className="input input-bordered w-full pl-10 bg-sky-50 focus:border-yellow-400 focus:outline-none rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-sky-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
              </div>
            )}

            {/* CHAMP EMAIL */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-sky-900">Email</span>
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="dev@bain.com" 
                  className="input input-bordered w-full pl-10 bg-sky-50 focus:border-yellow-400 focus:outline-none rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-sky-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              </div>
            </div>

            {/* CHAMP MOT DE PASSE */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-sky-900">Mot de passe</span>
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input input-bordered w-full pl-10 bg-sky-50 focus:border-yellow-400 focus:outline-none rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-sky-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              </div>
            </div>

            {/* BOUTON D'ACTION AVEC LOADING */}
            <button 
              type="submit" 
              className="btn_duck w-full mt-4 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                isLogin ? 'Plonger (Connexion)' : 'Créer mon compte'
              )}
            </button>
          
          </form>

          <div className="divider text-sky-900/50 text-sm my-4">OU</div>

          {/* TOGGLE LIEN */}
          <div className="text-sm text-center">
            <p className="text-sky-800">
              {isLogin ? "Pas encore de canard ?" : "Déjà membre du club ?"}
              <button 
                type="button" // Important pour ne pas soumettre le formulaire
                onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null); // On efface les erreurs quand on change de mode
                }}
                className="ml-2 font-bold text-yellow-500 hover:text-yellow-600 underline decoration-2 underline-offset-2 bg-transparent border-none cursor-pointer p-0"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;