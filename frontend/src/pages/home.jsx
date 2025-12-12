import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
<div className="min-h-screen overflow-hidden relative isolate">

      {/* --- HERO SECTION --- */}
      <div className="hero min-h-[90vh] relative z-10">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-20 px-4 sm:px-8">
          
          {/* --- ZONE IMAGE --- */}
          <div className="flex-1 relative group">
            {/* Effet d'ombre colorée derrière l'image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-sky-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="../img/home.png" 
              className="relative w-full max-w-lg rounded-3xl shadow-2xl border-4 border-white rotate-2 group-hover:rotate-0 transition-transform duration-500 ease-in-out object-cover mx-auto"
              alt="Canard codeur dans son bain" 
            />
          </div>
          
          {/* --- ZONE TEXTE (À gauche sur PC) --- */}
          <div className="flex-1 text-center lg:text-left space-y-8">

            {/* LE TITRE PRINCIPAL "DUALITÉ" */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-sky-950 leading-tight drop-shadow-sm">
              Votre partenaire de <br />
              {/* Style "CODE" */}
              <span className="inline-block bg-sky-500 text-yellow-400 font-mono px-3 py-1 my-2 rounded-lg text-4xl sm:text-5xl lg:text-6xl border-b-4 border-sky-900 transform -rotate-2">
                &lt;Code/&gt;
              </span>
              <br />
              et de {/* Style "BAIN" */} <span className="text-sky-500 font-extrabold underline decoration-yellow-400 decoration-wavy decoration-4">Détente</span>.
            </h1>
            
            {/* Le sous-texte explicatif */}
            <p className="py-4 text-lg sm:text-xl text-sky-900/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Bloqué sur un bug complexe ? Racontez-lui, il écoute sans juger. 
              Besoin de décompresser ? Il flotte dans la mousse.
              <br />
              <span className="block mt-4 text-base italic font-semibold text-sky-700">
                "Le seul assistant technique qui supporte l'eau chaude."
              </span>
            </p>
            
            {/* Les boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
              {/* TON BOUTON PERSONNALISÉ */}
              <Link to="/boutique" className="btn_duck px-10 py-4 h-auto text-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all w-full sm:w-auto">
                Adopter un Canard
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      
 

    </div>
  );
};

export default Home;