import Slider from "react-slick";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Content = () => {
  const featureCardsRef = useRef([]);
  const { isDark, loggedIn } = useSelector((state) => state.theme);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carouselItems = [
    {
      image:
        "https://images.unsplash.com/photo-1495570689269-d883b1224443?w=1200&auto=format",
      title: "Fresh Organic Produce",
      description: "Direct from local farms to your table",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format",
      title: "Support Local Farmers",
      description: "Help your community thrive",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&auto=format",
      title: "Quality Guaranteed",
      description: "100% satisfaction guaranteed",
    },
  ];

  useEffect(() => {
    gsap.from(featureCardsRef.current, {
      y: 50,
      duration: 2,
      stagger: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      className={`w-full transition-colors duration-300 ${
        isDark ? "dark: bg-gray-900 text-gray-100" : "bg-gray-300 text-gray"
      }`}
    >
      {/* Hero Section with Carousel */}
      <div className="relative">
        <Slider {...carouselSettings} className="overflow-hidden">
          {carouselItems.map((item, index) => (
            <div key={index} className="relative h-[370px] sm:h-[400px] hover:cursor-grab">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>
              <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                <div className="hero-text">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    {item.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">{item.description}</p>
                  <button
                    className={`bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 ${
                      isDark ? "dark:hover:bg-green-500" : ""
                    }`}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2
          className={`text-3xl font-bold text-center mb-2 text-gray-800 ${
            isDark ? "dark:text-white" : ""
          }`}
        >
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Fair Prices", "Local Support", "Fresh & Organic"].map(
            (title, i) => (
              <div
                key={i}
                ref={(el) => (featureCardsRef.current[i] = el)}
                className={`feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDark ? "dark:text-white" : ""
                }`}
              >
                <div
                  className={`text-green-600 dark:text-green-400 mb-4 ${
                    isDark ? "dark:text-green-300" : ""
                  }`}
                >
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-xl font-bold mb-2 text-gray-800 ${
                    isDark ? "dark:text-white" : ""
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-gray-600 dark:text-gray-300 ${
                    isDark ? "dark:text-gray-200" : ""
                  }`}
                >
                  {i === 0
                    ? "Get the best prices by buying directly from farmers"
                    : i === 1
                    ? "Support your local farming community"
                    : "100% fresh and organic produce"}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div
        className={`bg-green-600 text-white py-16 ${
          isDark ? "dark:bg-green-500" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-3xl font-bold mb-4 text-white ${
              isDark ? "dark:text-green-100" : ""
            }`}
          >
            Ready to Get Started?
          </h2>
          <p
            className={`text-xl mb-8 text-white ${
              isDark ? "dark:text-green-100" : ""
            }`}
          >
            Join our community of farmers and food lovers today!
          </p>
          <button
            className={`bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-all duration-300 ${
              isDark ? "dark:bg-green-100 dark:hover:bg-green-50" : ""
            }`}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
