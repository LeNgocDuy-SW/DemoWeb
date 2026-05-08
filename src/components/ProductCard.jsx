/**
 * Khoảng cách (Margin-padding) : m (Margin), p (padding)
 * Thêm hướng : t (top), b (bottom), l (left), r (right), x (trái & phải), y (trên & dưới)
 * Ví dụ : (p-4) padding tất cả các mặt 16px, mt-2 (margin top 8px), px-6 (padding trái phải 24px)
 * 
 * Kích thước (Sizing) : w (width), h (height)
 * Ví dụ : w-full (width: 100%) , h-48 (height: 192px), w-1/2 (width : 50%)
 * 
 * Màu sắc (Colors) : Cấu trúc : Thuộc_tính-màu-độ đậm
 * Ví dụ : text-grey-500 (Chữ màu xám vừa), bg-blue-600 (Nền màu xanh dương đậm)
 * border-red-300 (Viền màu đỏ nhạt)
 * 
 * Chữ cái (Typography) :
 * Kích cỡ : text-sm, text-base, text-lg, text-xl, text-2xl
 * Độ đậm: font-normal, font-semibold, font-bold
 * 
 * Bố cục: 
 * Thay vì viết display: flex, thì chỉ cần flex
 * Căn giữa theo chiều ngang : justify-center
 * Đẩy 2 phầntuwr ra mép : justify-between
 * Căn giữa theo chiều dọc : items-center
 * 
 * 
 * Thực hành :
 */
import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function ProductCard({ product }){
    const { user, toggleFavorite } = useAuth();
    const isFavorite = user?.favorites?.some(p => p.id === product.id);

    return(
        <div
        // w-64: Chiều rộng cố định
        // bg-white, rounded-xl, shadow-md: Nền trắng, bo góc to, đổ bóng vừa
        // overflow-hidden: Giấu những thứ bị tràn ra ngoài góc bo
        // hover:shadow-xl transition: Tăng độ bóng khi di chuột vào một cách mượt mà
        className = "w-64  bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <div className="relative group">
                <img
                // object-cover: cắt ảnh cho vừa khung mà không bị méo 
                src = {product.image}
                alt = {product.label}
                className = "w-full h-48 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-500"></img>
                
                {/* Heart Button */}
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(product);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-90 z-10"
                >
                    {isFavorite ? (
                        <AiFillHeart className="text-red-500 text-2xl animate-pulse" />
                    ) : (
                        <AiOutlineHeart className="text-gray-400 text-2xl hover:text-red-500 transition-colors" />
                    )}
                </button>
            </div>
            <div className = "p-5 text-center">
                {/* Tên sản phẩm */}
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.label}</h3>
                {/* Danh mục */}
                <p className="text-sm text-gray-500 mt-2 justify-center">{product.category}</p>
                {/* 3. KHU VỰC GIÁ TIỀN & NÚT BẤM (Dùng Flexbox) */}
                {/* flex, justify-between, items-center: Xếp giá tiền và nút bấm nằm ngang, cách xa nhau, tự động căn giữa trục dọc */}
                {/* mt-4: Cách phần text bên trên một khoảng */}
                <div className="flex justify-between items-center gap-4 mt-4">
                
                    <span className="text-xl font-bold text-blue-600" >{product.gia}</span>
                    
                    <Link to={`/product/${product.id}`}>
                        <button className="
                            /* 1. Giao diện mặc định */
                            bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-md
                            
                            /* 2. Khi di chuột vào (Hover) - Hơi nổi lên và sáng hơn */
                            hover:bg-blue-500 hover:-translate-y-1 hover:shadow-lg
                            
                            /* 3. KHI BẤM XUỐNG (Active) - Lún xuống, thu nhỏ lại và sẫm màu đi */
                            active:scale-95 active:bg-blue-700 active:shadow-sm active:translate-y-0
                            
                            /* 4. Cấu hình chuyển động */
                            transition-transform duration-150 ease-out
                "
                            >Chi Tiết</button>
                    </Link>
                
                </div>
            </div>
        </div>
        
    )
}