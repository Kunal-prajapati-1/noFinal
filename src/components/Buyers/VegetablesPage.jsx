import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../context/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const VegetablesPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));  // Dispatch add to cart action
    nav("/cart")
  };
  const { isDark, loggedIn } = useSelector((state) => state.theme);
  // Redirect if not logged in
  if (!loggedIn) {
    return (
      <div
        className={`text-center py-20 ${
          isDark ? "bg-darkBlue text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-bold">Please log in to view this page.</h2>
      </div>
    );
  }

  // Dummy vegetable data
  const vegetablesData = [
    {
      id: 1,
      name: "Tomato",
      price: "3/kg",
      image: "https://i.pinimg.com/736x/33/eb/a5/33eba579d76a096f19e4e20630daeb28.jpg",
    },
    {
      id: 2,
      name: "Carrot",
      price: "2/kg",
      image: "https://i.pinimg.com/736x/b6/c7/5d/b6c75de307bcf0075896a0c03a7a20f4.jpg",
    },
    {
      id: 3,
      name: "Potato",
      price: "1.5/kg",
      image: "https://i.pinimg.com/736x/13/59/20/135920a3d52a64ec51b5d0de9bf8bf8c.jpg",
    },
    {
      id: 4,
      name: "Spinach",
      price: "4/kg",
      image: "https://i.pinimg.com/736x/09/2b/28/092b28de2906261662f0a9d9e294f452.jpg",
    },
    {
      id: 5,
      name: "Broccoli",
      price: "3/kg",
      image: "https://i.pinimg.com/736x/fe/e3/6f/fee36ffeea5e01306c10d1d6531d9251.jpg",
    },
    {
      id: 6,
      name: "Cherry",
      price: "2/kg",
      image: "https://i.pinimg.com/736x/91/83/62/918362d304ad7cf841e8d33ecef033dd.jpg",
    },
    {
      id: 7,
      name: "PineApple",
      price: "1.5/kg",
      image: "https://i.pinimg.com/736x/3c/40/e2/3c40e20417508808959a9432e7464c8f.jpg",
    },
    {
      id: 8,
      name: "Bannana",
      price: "4/kg",
      image: "https://i.pinimg.com/736x/3e/ef/5d/3eef5dec44fcd07a3cadf8355bf846b3.jpg",
    },
    {
      id: 9,
      name: "Corn",
      price: "3/kg",
      image: "https://i.pinimg.com/736x/1c/36/3f/1c363f0bef4621df6ac7c5c40f267c6c.jpg",
    },
    {
      id: 10,
      name: "Onion",
      price: "2/kg",
      image: "https://i.pinimg.com/736x/c1/f2/41/c1f241d44b6e38c9a2a9df7dec8666a7.jpg",
    },
    {
      id: 11,
      name: "Cucumber",
      price: "1.5/kg",
      image: "https://i.pinimg.com/736x/3b/c9/d9/3bc9d9dde7f2df41a0699f7e8c8439db.jpg",
    },
    {
      id: 12,
      name: "Capsicum",
      price: "4/kg",
      image: "https://i.pinimg.com/736x/8f/7c/43/8f7c43a3ae4929cec7ba5d95751b32ad.jpg",
    },
  ];

  return (
    <div
      className={`min-h-screen py-10 ${
        isDark ? "bg-darkBlue text-white" : "bg-gray-100 text-gray-800"
      } select-none`}
    >
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Available Vegetables</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vegetablesData.map((item) => (
            <div
              key={item.id}
              className={` rounded-lg p-4 ${
                isDark ? "bg-white/35 backdrop-blur-xl " : "bg-white "
              } shadow-md hover:scale-95 transition-all duration-500 ease-in-out`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 sm:h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{item.name}</h2>
              <p className="text-sm mb-4">{item.price}</p>
              <button
               onClick={() => handleAddToCart(item)}
                className={`w-full py-2 rounded-md ${
                  isDark
                    ? "bg-green-500 hover:bg--500 text-white"
                    : "bg-green-400 hover:bg-green-500 text-gray-900"
                }`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VegetablesPage;
