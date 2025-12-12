const express = require('express');
const cors = require('cors');
const fs = require('fs'); //lecture écriture des fichiers JSON
const path = require('path');
const bcrypt = require("bcrypt");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const SECRET_KEY = "canard_vador_super_secret_key";

// Chemin vers le fichier JSON des produits
const PRODUCTS_FILE = path.join(__dirname, 'product.json');
const USERS_FILE = path.join(__dirname, 'users.json');


// 🔹 Lire les produits depuis le fichier à chaque requête
function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture product.json :', err);
    return [];
  }
}

// 🔹 Écrire les produits dans le fichier (si tu veux ajouter / modifier plus tard)
function writeProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture product.json :', err);
  }
}

function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture users.json :', err);
    return [];
  }
}

// 🔹 Écrire les utilisateurs dans le fichier JSON
function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture users.json :', err);
  }
}

// =======================
//   ROUTES PRODUITS
// =======================

// ➜ Tous les produits
app.get('/product', (req, res) => {
  // On demande au navigateur de NE PAS mettre en cache
  res.set('Cache-Control', 'no-store');

  const products = readProducts();
  res.json(products);
});

// ➜ Un seul produit par id (utile si tu veux l’utiliser plus tard)
app.get('/product/:id', (req, res) => {
  res.set('Cache-Control', 'no-store');

  const products = readProducts();
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Produit non trouvé' });
  }

  res.json(product);
});

// ➜ Ajouter un produit (pour plus tard si tu veux tester l’écriture)
app.post('/product', (req, res) => {
  const products = readProducts();
  const newProduct = req.body;

  if (!newProduct.name || typeof newProduct.price !== 'number') {
    return res.status(400).json({ error: 'name (string) et price (number) sont obligatoires' });
  }

  // Génération d’un nouvel id
  newProduct.id = products.length
    ? Math.max(...products.map(p => p.id)) + 1
    : 1;

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

// =======================
//   ROUTES LOGIN
// =======================

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "email et password sont obligatoires" });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ ok: false, message: "Email ou mot de passe invalide" });
  }

  // Vérifie le mot de passe hashé
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ ok: false, message: "Email ou mot de passe invalide" });
  }

  return res.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

// =======================
//   ROUTES PANIER
// =======================

app.post('/cart/:userId', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === Number(req.params.userId));

  if (!user) {
    return res.status(404).json({ ok: false, message: "Utilisateur non trouvé" });
  }

  // Mise à jour du panier
  user.cart = req.body.cart || [];

  // On réécrit le fichier users.json avec le panier mis à jour
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ ok: true, cart: user.cart });
});

app.get("/cart/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const users = readUsers();

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ ok: false, message: "Utilisateur introuvable" });
  }

  res.json({ ok: true, cart: user.cart || [] });
});

// ➜ Sauvegarder le panier d'un utilisateur
app.post("/cart/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const { cart } = req.body;

  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ ok: false, message: "Utilisateur introuvable" });
  }

  users[userIndex].cart = cart;
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ ok: true, cart });
});

app.listen(port, () => {
  console.log("API running on http://localhost:" + port);
});

// =======================
//   ROUTES AUTH (INSCRIPTION)
// =======================

app.post('/register', async (req, res) => {
  // 1. Récupérer les données envoyées par le React (le Frontend)
  const { email, password, name } = req.body;

  // 2. Validation basique : est-ce qu'il manque des infos ?
  if (!email || !password || !name) {
    return res.status(400).json({ ok: false, message: "Tous les champs sont obligatoires" });
  }

  // 3. Lire la liste actuelle des utilisateurs
  const users = readUsers();

  // 4. Vérifier si l'email existe déjà (On ne veut pas de doublons !)
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ ok: false, message: "Cet email est déjà utilisé" });
  }

  // 5. HACHAGE DU MOT DE PASSE (Sécurité)
  // On utilise bcrypt pour transformer "secret" en quelque chose comme "$2b$10$X8f..."
  // Le "10" est le "salt rounds" (la complexité du cryptage)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6. Créer le nouvel objet utilisateur
  const newUser = {
    id: Date.now(), // On utilise l'heure exacte comme ID unique simple
    email: email,
    name: name,
    password: hashedPassword, // On stocke la version cryptée !
    cart: [] // Le panier commence vide
  };

  // 7. Ajouter à la liste et sauvegarder dans le fichier
  users.push(newUser);
  writeUsers(users); // On utilise notre nouvelle fonction helper

  // 8. Répondre au Frontend que tout est OK
  // On renvoie l'utilisateur créé (sans le mot de passe pour la sécurité)
  res.status(201).json({ 
    ok: true, 
    message: "Utilisateur créé avec succès",
    user: { id: newUser.id, email: newUser.email, name: newUser.name }
  });
});