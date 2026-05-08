import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand & Giới thiệu */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-black tracking-widest text-white">Snapcart</h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            Snapcart - Nơi mang đến cho bạn những sản phẩm công nghệ đỉnh cao và trải nghiệm mua sắm tuyệt vời nhất.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Cột 2: Cửa hàng */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg mb-2">Sản Phẩm</h3>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Tai nghe Bluetooth</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Loa Không Dây</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Thiết bị Đeo Thông Minh</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Phụ kiện Audio</a>
        </div>

        {/* Cột 3: Hỗ trợ */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg mb-2">Hỗ Trợ</h3>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Trung tâm Trợ giúp</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Chính sách Bảo hành</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Theo dõi Đơn hàng</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Hoàn trả hàng</a>
        </div>

        {/* Cột 4: Đăng ký */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg mb-2">Nhận Khuyến Mãi</h3>
          <p className="text-gray-400 text-sm">Đăng ký email để nhận ưu đãi mới nhất từ LUXE.</p>
          <div className="flex mt-2">
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              className="bg-gray-800 text-white px-4 py-2 rounded-l-lg outline-none w-full border border-gray-700 focus:border-blue-500"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-lg font-bold hover:bg-blue-500 transition-colors">
              Gửi
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LUXE E-commerce. All rights reserved.</p>
      </div>
    </footer>
  );
}
