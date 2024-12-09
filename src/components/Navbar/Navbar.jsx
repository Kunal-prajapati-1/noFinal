/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setLoggedIn } from "../../context/slices/themeSlice"; // Import the actions

const Navbar = () => {
  // links
  const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/About" },
    { name: "Products", to: "/Vegi" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, loggedIn } = useSelector((state) => state.theme);
  const nav = useNavigate();
  const dispatch = useDispatch();

  // Handle Theme Toggle
  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the action to toggle the theme
  };

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    farmName: "",
    farmLocation: "",
    deliveryAddress: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (userType === "farmer") {
      if (!formData.farmName.trim()) {
        newErrors.farmName = "Farm name is required";
      }
      if (!formData.farmLocation.trim()) {
        newErrors.farmLocation = "Farm location is required";
      }
    } else {
      if (!formData.deliveryAddress.trim()) {
        newErrors.deliveryAddress = "Delivery address is required";
      }
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      toast.success("Sign up successful!");
      setIsOpen(false);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        farmName: "",
        farmLocation: "",
        deliveryAddress: "",
      });
      dispatch(setLoggedIn(!loggedIn)); // Toggle the login state
      if (userType === "buyer") {
        nav("/Vegi");
      } else if (userType === "farmer") {
        nav("/addItem");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleMobileMenuToggle = (e) => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`bg-white ${
        isDark ? "bg-gray-800" : "bg-slate-50"
      } shadow-lg fixed w-full top-0 z-50 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-farm-400 to-blue-500 bg-clip-text text-transparent transition-all duration-300 hover:from-blue-400 hover:to-green-400 hover:cursor-pointer">
              Farm2Door
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 hover:cursor-pointer">
            {links &&
              links.map((tag, idx) => (
                <NavLink
                  key={idx}
                  to={tag.to}
                  className={`font-sans  ${isDark ? 'text-gray-200' : 'text-gray-700'} hover:text-farm-600 dark:hover:text-farm-400 transition-all duration-300`}
                >
                  {tag.name}
                </NavLink>
              ))}

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  className="w-6 h-6 text-yellow-500 transform transition-transform group-hover:rotate-180 duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700 transform transition-transform group-hover:rotate-180 duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {loggedIn ? (
              <button
                onClick={() => dispatch(setLoggedIn(false))}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-500 font-sans font-medium text-md shadow-md hover:shadow-xl hover:border-none hover:outline-none"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="bg-farm-600 text-white px-5 py-2 rounded-lg hover:bg-fuchsia-500 transform hover:scale-105 transition-all duration-500 font-sans font-medium text-md shadow-md hover:shadow-xl hover:border-none hover:outline-none"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="text-farm-600 dark:text-farm-400 hover:text-farm-700 dark:hover:text-farm-300 p-2 rounded-lg hover:bg-farm-50 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-x-0 top-16 transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-lg ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-4 py-3 space-y-3">
            {links &&
              links.map((tag, id) => (
                <NavLink
                  onClick={handleMobileMenuToggle}
                  key={id}
                  to={tag.to}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-farm-600 dark:hover:text-farm-400 hover:bg-farm-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                >
                  {tag.name}
                </NavLink>
              ))}

            <button
              onClick={() => {
                setIsOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-farm-600 text-white px-4 py-3 rounded-lg hover:bg-farm-700 transition-all duration-300 font-sans font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 md:p-8 shadow-2xl animate-fade-in overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-farm-600 dark:text-farm-400">
                Sign Up
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-5">
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-sans font-medium">
                  I am a
                </label>
                <div className="relative">
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-500 dark:focus:ring-farm-400 focus:border-transparent transition-all duration-300 font-sans appearance-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  >
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-500 dark:focus:ring-farm-400 focus:border-transparent transition-all duration-300 font-sans placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 font-sans animate-slide-in">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-500 dark:focus:ring-farm-400 focus:border-transparent transition-all duration-300 font-sans placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-sans animate-slide-in">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-500 dark:focus:ring-farm-400 focus:border-transparent transition-all duration-300 font-sans placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 font-sans animate-slide-in">
                    {errors.password}
                  </p>
                )}
              </div>

              {userType === "farmer" ? (
                <>
                  <div>
                    <input
                      type="text"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleInputChange}
                      placeholder="Farm Name"
                      className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-500 dark:focus:ring-farm-400 focus:border-transparent transition-all duration-300 font-sans placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    />
                    {errors.farmName && (
                      <p className="text-red-500 text-sm mt-1 font-sans animate-slide-in">
                        {errors.farmName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="farmLocation"
                      value={formData.farmLocation}
                      onChange={handleInputChange}
                      placeholder="Farm Location"
                      className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-500 dark:focus:ring-farm-400 focus:border-transparent transition-all duration-300 font-sans placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    />
                    {errors.farmLocation && (
                      <p className="text-red-500 text-sm mt-1 font-sans animate-slide-in">
                        {errors.farmLocation}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="Delivery Address"
                    className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-500 dark:focus:ring-farm-400 focus:border-transparent transition-all duration-300 font-sans placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-red-500 text-sm mt-1 font-sans animate-slide-in">
                      {errors.deliveryAddress}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-sans font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-farm-600 text-white rounded-lg hover:bg-farm-700 transition-all duration-300 font-sans font-medium shadow-md hover:shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
