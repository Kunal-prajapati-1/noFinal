import { useSelector } from "react-redux";

const Footer = () => {
  const { isDark, loggedIn } = useSelector((state) => state.theme);

  return (
    <footer
      className={`py-8 ${
        isDark ? "bg-darkBlue text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Farm2Door</h3>
            <p className="text-sm">
              Farm2Door connects local farmers to consumers, providing fresh
              organic produce straight to your table.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="#"
                  className={`hover:${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">Email: support@farm2door.com</p>
            <p className="text-sm mb-2">Phone: +1 234 567 890</p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Links */}
              <a
                href="#"
                className={`hover:${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="#"
                className={`hover:${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="#"
                className={`hover:${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className={`border-t mt-6 pt-6 text-center text-sm ${
            isDark ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <p>&copy; 2024 Farm2Door. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
