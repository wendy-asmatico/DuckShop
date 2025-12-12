import React from 'react';

const Bulle = () => {

const bubblesData = [
    // delay: '-15s' = L'animation a "commencé" il y a 15s, donc la bulle est déjà en haut !
    { left: '5%',  width: 'w-16', duration: '18s', delay: '-15s' },
    { left: '20%', width: 'w-24', duration: '22s', delay: '-5s' }, 
    { left: '35%', width: 'w-12', duration: '15s', delay: '-10s' },
    { left: '50%', width: 'w-28', duration: '25s', delay: '-20s' }, // Celle-ci sera tout en haut
    { left: '65%', width: 'w-20', duration: '19s', delay: '-2s' },  // Celle-ci vient de partir du bas
    { left: '85%', width: 'w-32', duration: '28s', delay: '-12s' },
    { left: '95%', width: 'w-14', duration: '17s', delay: '-8s' },
    { left: '15%', width: 'w-10', duration: '20s', delay: '-18s' },
    { left: '75%', width: 'w-24', duration: '24s', delay: '-6s' },
  ];

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
      
      {/* Les bulles */}
      {bubblesData.map((item, index) => (
        <img 
          key={index}
          src="../img/bulle.png" // Assure-toi que l'image est bien dans public/
          alt="" 
          className={`absolute bottom-[-100px] opacity-60 animate-floatUp ${item.width}`}
          style={{
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay
          }}
        />
      ))}
    </div>

  );


};

export default Bulle;