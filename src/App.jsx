/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/Content/Content";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer";
import VegetablesPage from "./components/Buyers/VegetablesPage";
import CartComponent from "./components/CartComponent";
import { useDispatch, useSelector } from "react-redux";
import FarmerPage from "./components/Farmer/farmerPage";

function App() {
  const dispatch = useDispatch();
  const { isDark, loggedIn } = useSelector((state) => state.theme);
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-400 dark:to-gray-800 pt-16 md:pt-20 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route
            path="/Vegi"
            element={loggedIn ? <VegetablesPage /> : <Navigate to="/" />}
          />
          <Route
            path="/cart"
            element={loggedIn ? <CartComponent /> : <Navigate to="/" />}
          />
          <Route
            path="/addItem"
            element={<FarmerPage/>}
          />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
        />
      </div>
    </Router>
  );
}

export default App;
