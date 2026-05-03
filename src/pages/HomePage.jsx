import Navbar from "../components/Navbar";
import ProductCard from "../components/Taiwwindd"; // Đảm bảo import file thẻ sản phẩm của bạn

export default function HomePage() {
  // Tạo mảng ảo 8 sản phẩm để vẽ ra màn hình cho nhanh
  const mockProducts = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. Gắn Navbar lên đầu */}
      <Navbar />

      {/* 2. Khu vực nội dung chính */}
      <main className="
      /*Giới hạn chiều rộng tối đa (≈ 1280px)
      👉 Tránh bị kéo giãn full màn hình trên PC*/
      max-w-7xl mx-auto px-4 py-10">
        
        

        {/* 3. LƯỚI SẢN PHẨM (GRID) */}
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
          
          {/* Vòng lặp in ra 8 cái ProductCard */}
          {mockProducts.map((item, index) => (
            <ProductCard key={index} />
          ))}

        </div>

      </main>
    </div>
  );
}