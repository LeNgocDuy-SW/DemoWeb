import { FaHeadphones, FaMobileAlt, FaLaptop, FaCamera, FaGamepad, FaClock, FaStar } from "react-icons/fa";

export default function CategoryList({ selectedCategory, onSelectCategory }) {
  const categories = [
    { icon: <FaStar />, label: "Tất cả" },
    { icon: <FaHeadphones />, label: "Tai nghe" },
    { icon: <FaClock />, label: "Đồng hồ" },
    { icon: <FaMobileAlt />, label: "Điện thoại" },
    { icon: <FaLaptop />, label: "Laptop" },
    { icon: <FaCamera />, label: "Máy ảnh" },
    { icon: <FaGamepad />, label: "Gaming" },
  ];

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wider">Danh Mục Sản Phẩm</h2>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-8 justify-items-center">
        {categories.map((cat, index) => {
          const isActive = selectedCategory === cat.label;
          return (
          <div 
            key={index} 
            onClick={() => onSelectCategory(cat.label)}
            className="flex flex-col items-center gap-3 cursor-pointer group w-full"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-2xl md:text-3xl transition-all duration-300
              ${isActive 
                ? "bg-blue-600 text-white shadow-lg scale-110" 
                : "bg-white text-gray-400 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:scale-105"
              }`}
            >
              {cat.icon}
            </div>
            <span className={`font-semibold text-sm md:text-base transition-colors ${isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-500"}`}>
              {cat.label}
            </span>
          </div>
        )})}
      </div>
    </div>
  );
}
