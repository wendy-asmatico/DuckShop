import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // 🔄 Se met à jour à chaque changement de page
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    navigate("/auth");
  }

  return (
    <div class="navbar bg-gradient-to-b from-sky-300 via-cyan-200 to-sky-100 shadow-md">
  <div class="flex-1">
    <Link to="/">
      <img src="../img/logo_duckstore.png" alt="logo representant un canard" class="h-24"></img>
    </Link>
  </div>

  <div class="flex-none hidden lg:flex">
    <ul class="menu menu-horizontal px-1 gap-x-6">
        <Link to="/boutique" class="btn_duck">Boutique</Link>
        <Link to="/cart" class="btn_duck" > <img width="26" height="26" src="https://img.icons8.com/pulsar-line/96/ffd700/shopping-cart.png" alt="shopping-cart"/> Panier</Link>
        <div className="navbar-right menu-horizontal gap-x-6 items-center">
        {user ? (
          <>
            <span class="text-xl">
              {user.name}
            </span>
            <button onClick={handleLogout} class="btn"><img width="26" height="26" src="https://img.icons8.com/pulsar-line/96/FA5252/exit.png" alt="exit"/></button>
          </>
        ) : (
          <Link to="/auth" class="btn_duck">S'identifier</Link>
        )}
      </div>
    </ul>
  </div>

  <div class="flex-none lg:hidden">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabindex="0" class="menu-burger-perso menu menu-xl dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-2xl w-52 border-4 border-yellow-400">
        <li><Link to="/boutique">Boutique</Link></li>
        <li><Link to="/cart">Panier</Link></li>
        <li><div className="navbar-right menu-horizontal gap-x-6 items-center">
        {user ? (
          <>
            <span class="lg:text-xl sm:text-12">
              {user.name}
            </span>
            <button onClick={handleLogout} class="btn"><img width="26" height="26" src="https://img.icons8.com/pulsar-line/96/FA5252/exit.png" alt="exit"/></button>
          </>
        ) : (
          <Link to="/login" class="">S'identifier</Link>
        )}
      </div></li>
      </ul>
    </div>
  </div>
</div>
  );
}

export default NavBar;
