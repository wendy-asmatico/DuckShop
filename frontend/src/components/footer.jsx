import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="relative mt-0">
      
<div className="absolute right-5 transform -translate-x-1/2 -top-24 z-30 pointer-events-none">
        <img
          // REMPLACE PAR LE CHEMIN DE TON IMAGE PNG TRANSPARENTE
          src="/img/canard.png" 
          alt="Canard posé tranquillement"
          className="w-40 md:w-56 drop-shadow-2xl"
        />
      </div>

      {/* Bordure d'eau (inchangée, z-10 est derrière le canard z-30) */}
      <div className="h-4 w-full bg-sky-300/50 blur-sm absolute top-0 z-10"></div>


      <footer className="footer p-10 bg-gradient-to-b from-sky-100 via-cyan-200 to-sky-300 text-sky-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
        
        {/* COLONNE 1 : La Marque */}
        <aside className="flex flex-col gap-12">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/img/logo_duckstore.png" alt="Logo DuckStore" className="h-20 w-auto object-contain" />
          </Link>
          <p className="max-w-xs text-sm font-medium text-sky-800">
            Le seul endroit où les bugs se transforment en bulles de savon.<br/>
            <span className="italic opacity-70 mt-1 block">Compilé avec ❤️ et de l'eau tiède.</span>
          </p>
        </aside> 
        
        
        {/* COLONNE 3 */}
        <nav>
          <header className="footer-title text-sky-950 opacity-100 font-black">Légal & Fun</header> 
          <Link to="/cgv" className="link link-hover hover:text-cyan-700">Conditions de Flottabilité</Link>
          <Link to="/privacy" className="link link-hover hover:text-cyan-700">Politique de Mousse</Link>
          <Link to="/cookies" className="link link-hover hover:text-cyan-700">Cookies (imperméables)</Link>
        </nav> 
        
        {/* COLONNE 4 : Newsletter */}
        <form className="w-full">
          <header className="footer-title text-sky-950 opacity-100 font-black">Newsletter du Bain</header> 
          <fieldset className="form-control w-full">
            <label className="label">
              <span className="label-text text-sky-800 font-medium">Recevez nos meilleures astuces.</span>
            </label> 
            <div className="join shadow-sm w-full">
              <input 
                type="text" 
                placeholder="dev@bain.com" 
                className="input input-bordered join-item bg-white/80 text-black focus:outline-none focus:border-yellow-400 placeholder-gray-500 w-full min-w-0" 
              /> 
              <button className="btn bg-yellow-400 border-yellow-400 hover:bg-yellow-500 text-black join-item font-bold border-none p-3">
                Plouf
              </button>
            </div>
          </fieldset>
        </form>
      </footer>

      {/* --- BARRE DE COPYRIGHT --- */}
      <footer className="footer px-10 py-6 bg-sky-400 text-sky-950 border-t border-sky-500/30 flex flex-col md:flex-row justify-between items-center">
        <aside className="items-center grid-flow-col">
          <p className="font-semibold">© 2025 - DuckStore. Aucun vrai canard n'a été maltraité.</p>
        </aside> 
        <nav className="md:place-self-center justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a className="hover:text-white cursor-pointer transition-transform hover:scale-110" aria-label="Github">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a className="hover:text-white cursor-pointer transition-transform hover:scale-110" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;