import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hotspotsData = [
  { id: 1, top: '15%', left: '50%', title: 'Âm thanh LDAC', icon: '🎵' },
  { id: 2, top: '45%', left: '85%', title: 'Mic khử ồn', icon: '🎤' },
  { id: 3, top: '70%', left: '20%', title: 'Đệm tai da', icon: '👂' },
  { id: 4, top: '85%', left: '60%', title: 'Pin 30h', icon: '🔋' }
];

export default function ProductShowcaseImageRotate() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* --- KHUNG KÍCH HOẠT (TRIGGER FRAME) --- */}
      {!isVisible && (
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setIsVisible(true)}
        >
          <img 
            src="https://i.pinimg.com/1200x/91/6c/69/916c69aa379209b8e60a8cb7f80f8a81.jpg" 
            alt="Thumbnail" 
            style={{ width: '150px', borderRadius: '10px', marginBottom: '20px' }}
          />
          <h3 style={{ margin: '0 0 10px 0' }}>Sony WH-1000XM4</h3>
          <button style={{
            padding: '10px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Khám phá ngay
          </button>
        </motion.div>
      )}

      {/* --- GIAO DIỆN SẢN PHẨM CHÍNH --- */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 1, scale: 0.5 }}
            exit={{ opacity: 1, scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ position: 'relative', width: '600px' }}
          >
            {/* Nút quay lại */}
            <button 
              onClick={() => setIsVisible(false)}
              style={{
                position: 'absolute', top: '-40px', right: 0,
                background: 'none', border: 'none', color: '#666', cursor: 'pointer',
                zIndex: 10
              }}
            >
              ✕ Đóng lại
            </button>

            {/* [ĐÃ SỬA] Ảnh sản phẩm chính: Dùng motion.img và whileHover */}
            <motion.img 
              src="https://i.pinimg.com/1200x/91/6c/69/916c69aa379209b8e60a8cb7f80f8a81.jpg" 
              alt="Sony Headphone" 
              style={{ width: '100%', display: 'block', borderRadius: '20px', cursor: 'pointer' }} 
              draggable="false"
              
              // Tự động xoay nhẹ 5 độ và phóng to xíu xiu khi đưa chuột vào
              whileHover={{ rotateZ: 5, scale: 1.02 }}
              
              // Cấu hình độ nảy của chuyển động
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />

            {/* Render TẤT CẢ các khung thông tin cùng lúc (Đứng im tại chỗ) */}
            {hotspotsData.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.2) }} 
                style={{
                  position: 'absolute',
                  top: spot.top,
                  left: spot.left,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                  zIndex: 2,
                  pointerEvents: 'none' // Để chuột xuyên qua khung chữ, tác động thẳng vào ảnh
                }}
              >
                <span style={{ fontSize: '18px' }}>{spot.icon}</span>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>{spot.title}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}