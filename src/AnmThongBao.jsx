import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function NotificationApp() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="p-10">
      {/* Nút bấm dùng Tailwind để style */}
      <button 
        onClick={() => setIsVisible(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Hiện thông báo
      </button>

      {/* Bao bọc component có hiệu ứng biến mất bằng AnimatePresence */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            // Phần 1: GIAO DIỆN TĨNH (Tailwind CSS)
            // fixed, bottom-5, right-5: Ghim ở góc dưới cùng bên phải
            // bg-gray-800, text-white: Nền tối, chữ trắng
            // px-6, py-4, rounded-xl, shadow-lg: Padding, bo góc và đổ bóng
            // flex, items-center, gap-3: Căn chỉnh icon và text nằm ngang
            className="fixed bottom-5 right-5 bg-gray-800 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
            
            // Phần 2: HIỆU ỨNG (Framer Motion)
            initial={{ opacity: 0, x: 50 }} // Bắt đầu: Mờ và nằm lệch sang phải 50px
            animate={{ opacity: 1, x: 0 }}  // Hiện ra: Rõ nét và trượt về vị trí chuẩn (x: 0)
            
            // Thuộc tính exit CỰC KỲ QUAN TRỌNG: 
            // Chỉ hoạt động khi nằm trong <AnimatePresence>
            exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }} // Khi biến mất: Trượt ngược lại sang phải và mờ đi nhanh chóng
          >
            <span>🚀 Cập nhật dữ liệu thành công!</span>
            
            {/* Nút tắt thông báo */}
            <button 
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white ml-4 font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}