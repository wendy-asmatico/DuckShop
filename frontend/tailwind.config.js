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
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
    ],
  },
}