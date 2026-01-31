import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState, useRef} from "react";
import { CartContext } from "../store/CartContextProvider";
import { AuthContext } from "../store/AuthContextProvider";
import { LogOut, Menu, X } from "lucide-react";
import { logout } from '../apis/apiCall';

const Navbar = () => {
  const [itemCount, setItemCount] = useState(0);
  const { getItemCount } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropDownRef = useRef(null);
  const navigate = useNavigate();



  useEffect(() => {
    setItemCount(getItemCount());
  }, [getItemCount]);

  useEffect(()=>{
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  },[dropdownOpen])


  function handleShowDropdown() {
    setDropdownOpen(!dropdownOpen);
  }
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  function handleLogout() {
    if (logout()) {
      setUser(null);
      setMobileMenuOpen(false);
      setDropdownOpen(false);
      navigate('/');

    }
  }


  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <div
        onClick={() => navigate('/')}
        className="flex items-center cursor-pointer group"
      >
        <h1 className="text-2xl font-black tracking-tighter text-gray-900 transition-colors">
          C<span className="text-[#d9b99b] group-hover:text-indigo-500 transition-colors">SLAYY</span>
        </h1>
        <div className="ml-1 w-2 h-2 rounded-full bg-[#d9b99b] group-hover:animate-ping" />
      </div>

      <div className="hidden lg:flex md:flex gap-10 items-center">

        <NavLink
          className={({ isActive }) =>
            `flex gap-4 text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-600" : ""
            }`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-600" : ""
            }`
          }
          to="/men"
        >
          Men
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 ${isActive ? "font-bold text-blue-600" : ""
            }`
          }
          to="/women"
        >
          Women
        </NavLink>

      </div>

      <div className="flex gap-6">
        <Link className="relative flex items-center text-gray-700 hover:text-blue-600" to="/cart">
          <FaShoppingCart className="h-7 w-7" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
        <div className="hidden md:block">
          {user ? (
            <div className="relative" ref={dropDownRef}>
              <span onClick={handleShowDropdown} className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
                Hello, {user.name}
              </span>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <Link to="/orders" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Orders</Link>
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 border-t">
                    <div className="flex justify-between items-center text-red-600">Logout <LogOut size={16} /></div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to='/auth/login' className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to='/auth/signup' className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">SignUp</Link>
            </div>
          )}

        </div>
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-700">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-xl z-50 flex flex-col p-6 gap-4 animate-in slide-in-from-top duration-300">
          <NavLink to="/" onClick={toggleMobileMenu} className="text-lg font-medium text-gray-800 border-b pb-2">Home</NavLink>
          <NavLink to="/men" onClick={toggleMobileMenu} className="text-lg font-medium text-gray-800 border-b pb-2">Men</NavLink>
          <NavLink to="/women" onClick={toggleMobileMenu} className="text-lg font-medium text-gray-800 border-b pb-2">Women</NavLink>

          {user ? (
            <>
              <Link to="/orders" onClick={toggleMobileMenu} className="text-lg font-medium text-gray-800 border-b pb-2">My Orders</Link>
              <button onClick={handleLogout} className="text-left text-lg font-medium text-red-600">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link to='/auth/login' onClick={toggleMobileMenu} className="text-center py-2 border border-gray-300 rounded-lg">Login</Link>
              <Link to='/auth/signup' onClick={toggleMobileMenu} className="text-center py-2 bg-blue-600 text-white rounded-lg">SignUp</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
