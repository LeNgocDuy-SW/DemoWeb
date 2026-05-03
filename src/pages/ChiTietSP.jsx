import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import GioHang from "./GioHang.jsx";
import SPLienQuan from "../components/SanPhamLienQuan.jsx";
export default function ChiTietSP() {
  const images = ["/video_sp4.mp4", "/nike4.jpg", "/video_sp2.mp4", "/video_sp3.mp4"];
  const sizes = [37, 38, 39, 40, 41];
  const colors = ["bg-black", "bg-red-400", "bg-blue-400"];

  const [activeImg, setActiveImg] = useState(images[0]);
  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [count, setCount] = useState(0);
  const nutTang = () =>{
    setCount(prev => prev + 1)
  };
  const nutGiam = () =>{
    if(count > 1){
      setCount(count - 1)
    }
  };
  const isVideo = (url) => url.endsWith(".mp4") || url.endsWith(".webm");
  const [cartCount, setCartCount] = useState(0);
  const nutThemCart = ()=>{
    setCartCount(prev => prev + 1);
  };

  const [flyingStyle, setFlyingStyle] = useState(null);
  const handleAddToCart = () =>{
    const productImg = document.getElementById("main-product-image");
    const cartIcon = document.getElementById("cart-icon");
    if(productImg && cartIcon){
      const startRect = productImg.getBoundingClientRect();
      const endRect = cartIcon.getBoundingClientRect();

      // Bước 2.1: Đặt ảnh clone ở vị trí xuất phát (đè lên ảnh gốc)
      setFlyingStyle({
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        opacity: 1,
      });
      setTimeout(() => {
        setFlyingStyle({
          top: endRect.top + 10, // Cộng nhẹ 10px để bay vào giữa tâm icon
          left: endRect.left + 10,
          width: 30, // Thu nhỏ lại còn 30px
          height: 30,
          opacity: 0.5, // Mờ dần khi tới đích
        });
      }, 10);
      // Bước 2.3: Đợi 600ms (thời gian bay xong), xóa ảnh clone và cộng số giỏ hàng
      setTimeout(() => {
        setFlyingStyle(null);
        setCartCount(prev => prev + 1);
      }, 600);
    } else {
      // Trường hợp lỗi không tìm thấy phần tử, vẫn cộng giỏ hàng bình thường
      setCartCount(prev => prev + 1);
    }
  };

  
  return (
    <div>
      <Navbar cartCount={cartCount}/> 
      {flyingStyle && (
        <img
          // Nếu ảnh gốc là video, ta dùng ảnh số 2 làm ảnh bay cho mượt
          src={isVideo(activeImg) ? images[1] : activeImg} 
          className="fixed z-[9999] object-cover rounded-2xl pointer-events-none transition-all duration-[600ms] ease-in-out"
          style={{
            top: flyingStyle.top,
            left: flyingStyle.left,
            width: flyingStyle.width,
            height: flyingStyle.height,
            opacity: flyingStyle.opacity,
          }}
          alt="flying"
        />
      )}

      <main className=" flex flex-col gap-3 max-w-7xl mx-auto mt-10 py-3 px-8 bg-white rounded-3xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT: INFO (GALLERY) */}
        <div className="flex flex-col gap-4">
          {/* Cố định tỷ lệ khung hình vuông cho ảnh chính */}
          <div id ="main-product-image"
           className="w-full aspect-square bg-black  rounded-2xl overflow-hidden relative">
            {isVideo(activeImg) ? (
              // Nếu là video thì dùng thẻ <video>
              <video 
                src={activeImg} 
                className="w-full h-full object-containt"
                autoPlay // Tự động chạy
                loop     // Lặp lại liên tục
                muted    // Tắt tiếng (Bắt buộc phải có để trình duyệt cho phép tự động chạy)
                playsInline 
              />
            ) : (
              // Nếu là ảnh thì dùng thẻ <img> như cũ
              <img 
                src={activeImg} 
                className="w-full h-full object-cover transition-all duration-300" 
                alt="Product" 
              />
            )}
          </div>

          {/* THUMBNAIL */}
          <div className="grid grid-cols-4 gap-4 mt-2">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImg(img)}
                className={` w-full h-1/2 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200
                ${activeImg === img ? "border-blue-600 opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                {isVideo(img) ? (
                  <>
                    <video src={img} className="w-full h-full object-cover" muted />
                    {/* Lớp phủ thêm nút Play màu đen mờ để người dùng biết đây là video */}
                    
                  </>
                ) : (
                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: OPTIONS */}
        <div className="flex flex-col gap-8 pt-8 ">

          {/* BỔ SUNG: TITLE & DESCRIPTION */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">SNEAKER PRO X</h1>
            <p className="text-gray-500 mt-3 leading-relaxed">
              Giày thể thao nam cao cấp với thiết kế khí động học, đế đệm trợ lực siêu nhẹ giúp bạn thoải mái di chuyển suốt cả ngày dài.
            </p>
          </div>

          {/* SIZE */}
          <div>
            <span className="font-bold text-gray-900 uppercase text-sm tracking-wider">Chọn Size</span>
            <div className="flex flex-wrap gap-3 mt-3">
              {sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => setActiveSize(size)}
                  className={`w-14 h-12 flex items-center justify-center rounded-xl border-2 cursor-pointer font-semibold transition-all duration-200
                  ${activeSize === size ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* COLOR */}
          <div>
              <span className="font-bold text-gray-900 uppercase text-sm tracking-wider">Chọn Màu</span>
              <div className="flex gap-4 mt-3">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveColor(index)}
                    className={`w-10 h-10 rounded-full cursor-pointer shadow-sm ${color} transition-transform duration-200
                    ${activeColor === index ? "scale-110 ring-4 ring-offset-2 ring-blue-200" : "hover:scale-110"}`}
                  />
                ))}
                <div className="bg-gray-100 border border-gray-200 h-10 w-32 rounded-full ml-20 px-1 flex items-center justify-between">
                  <button onClick ={()=> nutGiam()} className="w-8 h-8 pb-1 flex items-center justify-center text-2xl hover:bg-gray-200 rounded-full transition-colors">-</button>
                  <span>{count}</span>
                  <button onClick = {() => nutTang()} className="w-8 h-8 pb-1 flex items-center justify-center text-2xl hover:bg-gray-200 rounded-full transition-colors">+</button>

                </div>
              </div>
             
      
            
          </div>
          {/**So luong */}
          
          {/* CHÂN TRANG: PRICE & BUTTON */}
          <div className="flex  flex-col items-center gap-6 mt-4 pt-8 border-t border-gray-100">
            <div className="flex w-full items-center justify-between">
              <span className="text-xl text-gray-500 font-bold uppercase">Tổng tiền</span>
              <span className="text-3xl font-black text-blue-600">$450</span>
            </div>
            
            <button onClick= {nutThemCart}
            onClick ={handleAddToCart}
             className="flex-1 w-full bg-gray-900 text-white text-lg font-bold py-4 rounded-2xl 
             shadow-lg hover:bg-gray-700 hover:shadow-gray-700 
             hover:scale-105 active:scale-95 transition-all duration-200">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div></div>

        <SPLienQuan/>
      </main>
    </div>
  );
}