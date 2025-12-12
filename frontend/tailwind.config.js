/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Si tu veux VRAIMENT utiliser "bg-jaune" en plus de "bg-primary",
      // tu dois le rajouter ici, en dehors de la config DaisyUI :
      colors: {
        jaune: "#FFD700",
        cyan: "#00C2FF",
        blanc: "#ffffff",
        neutral: "#005678",
        error: "#cd3737ff",
        sombre: "#cd3737ff",

      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-120vh) scale(1.2)', opacity: '0' }, // -120vh = monte plus haut que l'écran
        }
      },
      animation: {
        floatUp: 'floatUp linear infinite', // J'ai enlevé la durée ici pour la gérer dans le JSX
      }

    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00C2FF",  // Ton cyan
          "secondary": "#005678", // Ton neutral
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "warning": "#FFD700", 
        },
      },
    ],
  },
}