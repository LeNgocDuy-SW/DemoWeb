import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard"; 
import HeroBanner from "../components/HeroBanner";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import { products } from "../data/products";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredProducts = selectedCategory === "Tất cả" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. Gắn Navbar lên đầu */}
      <Navbar />

      {/* 2. Khu vực nội dung chính */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Banner Chính */}
        <HeroBanner />

        {/* Danh mục */}
        <CategoryList 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {/* 3. LƯỚI SẢN PHẨM (GRID) */}
        <div className="mt-10 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900 uppercase border-l-8 border-blue-600 pl-4">
              Sản Phẩm Nổi Bật
            </h2>
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">Xem tất cả &rarr;</a>
          </div>
        <div className="
          grid gap-8 /* Khoảng cách giữa các thẻ là 32px */
          grid-cols-1 /* Mặc định mobile: 1 cột */
          sm:grid-cols-2 /* Tablet: 2 cột */
          lg:grid-cols-4 /* PC: 4 cột */
          justify-items-center /* Căn giữa các thẻ bên trong ô lưới */
          /*📱 Mobile	1 sản phẩm / hàng
          📱 Tablet	2 sản phẩm / hàng
          💻 PC	4 sản phẩm / hàng*/
        ">
          
          {/* Vòng lặp in ra ProductCard theo danh mục */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500 font-medium text-lg">
              Không tìm thấy sản phẩm nào trong danh mục này.
            </div>
          )}

        </div>
        </div>
      </main>

      {/* Chân trang */}
      <Footer />
    </div>
  );
}