import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">QuickHire</Link>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
            <Link to="/register" className="hover:text-gray-400">Register</Link>
          </>
        ) : (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            {user.role === "admin" && (
              <Link to="/post" className="hover:text-green-400">Post Job</Link>
            )}
            <button onClick={logout} className="text-red-400 hover:underline">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
