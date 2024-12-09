import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { addItem, removeItem } from "../../context/slices/farmerSlice";
import { toast } from "react-toastify";

const FarmerPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [photo, setPhoto] = useState(null);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.farmer.items);
  const [filteredItems, setFilteredItems] = useState(items);

  // Sync filteredItems with Redux items
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        (item) =>
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [items, searchQuery]);

  const handleAddItem = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newItem = {
      id: new Date().getTime(),
      category,
      itemName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      timePeriod: parseInt(timePeriod),
      photo,
    };

    dispatch(addItem(newItem));

    gsap.fromTo(
      ".add-btn",
      { scale: 1 },
      { scale: 1.3, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }
    );

    setCategory("");
    setItemName("");
    setQuantity("");
    setPrice("");
    setTimePeriod("");
    setPhoto(null);
    setFormErrors({});
    toast.success("Item added 🙌");

    // close form
    setShowForm(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!category) errors.category = "Category is required";
    if (!itemName) errors.itemName = "Item name is required";
    if (!quantity || quantity <= 0)
      errors.quantity = "Quantity must be greater than 0";
    if (!price || price <= 0) errors.price = "Price must be greater than 0";
    if (!timePeriod || timePeriod <= 0)
      errors.timePeriod = "Time period must be greater than 0";
    return errors;
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.info("Item removed 👋");
  };

  const transform = showForm
    ? "translate-x-[0%] transition-all duration-200 "
    : "-translate-x-[120%] transition-all duration-200";

  return (
    <div className="container mx-auto p-6 select-none">
      <h1 className="text-center text-3xl font-extrabold text-green-700 mb-8">
        Farmer&apos;s Marketplace
      </h1>
      <div className="bar bg-gray-700 sm:w-[35%] p-2 rounded-lg flex items-center justify-between">
        <button
        content="add item"
          onClick={() => setShowForm((prev) => !prev)}
          className={`text-3xl text-gray-100 flex items-center justify-center rounded-full overflow-hidden ${
            showForm ? `rotate-45 bg-red-500 transition-all duration-200` : `rotate-0 bg-black transition-all duration-200`
          }`}
        >
          <i className="ri-add-circle-fill"></i>
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 ml-4 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
          placeholder="Search items..."
        />
      </div>
      <div
        className={`max-w-xl absolute z-10 top-[33%] bg-white shadow-xl rounded-lg p-8 ${transform}`}
      >
        {/* Add Item Form */}
        {/* ... (existing form code) */}
        <div
          className={`max-w-xl bg-white shadow-xl rounded-lg p-8 ${transform}`}
        >
          <div className="space-y-6">
            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 mb-2">
                Choose Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`form-select p-3 rounded-lg border ${
                  formErrors.category ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="">Select Category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
              </select>
              {formErrors.category && (
                <p className="text-red-500 text-sm">{formErrors.category}</p>
              )}
            </div>

            {/* Item Name */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 mb-2">
                Item Name:
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className={`p-3 rounded-lg border ${
                  formErrors.itemName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter the item name"
              />
              {formErrors.itemName && (
                <p className="text-red-500 text-sm">{formErrors.itemName}</p>
              )}
            </div>

            {/* Available Quantity */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 mb-2">
                Available Quantity:
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={`p-3 rounded-lg border ${
                  formErrors.quantity ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter quantity"
              />
              {formErrors.quantity && (
                <p className="text-red-500 text-sm">{formErrors.quantity}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 mb-2">
                Price (per unit):
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`p-3 rounded-lg border ${
                  formErrors.price ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter price"
              />
              {formErrors.price && (
                <p className="text-red-500 text-sm">{formErrors.price}</p>
              )}
            </div>

            {/* Time Period */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700 mb-2">
                Time Period (in days):
              </label>
              <input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className={`p-3 rounded-lg border ${
                  formErrors.timePeriod ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter the time period"
              />
              {formErrors.timePeriod && (
                <p className="text-red-500 text-sm">{formErrors.timePeriod}</p>
              )}
            </div>
            {/* File Input for Photo */}
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-lg font-semibold text-gray-700"
              >
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleFileChange}
              />
              {photo && (
                <img
                  src={photo}
                  alt="Uploaded"
                  className="mt-4 w-32 h-32 object-cover"
                />
              )}
            </div>
            {/* Add Button with animation */}
            <div className="flex justify-center">
              <button
                onClick={handleAddItem}
                className="add-btn py-3 px-6 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-md transform transition duration-200 hover:scale-105 focus:outline-none"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Display Filtered Items */}
      {filteredItems?.length > 0 ? (
        <div className="item-list mt-8">
          <h2 className="text-2xl font-bold text-green-700">Items for Sale:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="item-card bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                {item.photo && (
                  <img
                    src={item.photo}
                    alt="Item"
                    className="mt-2 w-full h-32 object-cover"
                  />
                )}
                <p className="text-lg font-medium text-green-700">
                  Category: {item.category}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  Item: {item.itemName}
                </p>
                <p className="text-md text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-md text-gray-600">Price: ${item.price}</p>
                <p className="text-md text-gray-600">
                  Available for: {item.timePeriod} days
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="py-1 px-3 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-500">No items found.</p>
      )}
    </div>
  );
};

export default FarmerPage;
