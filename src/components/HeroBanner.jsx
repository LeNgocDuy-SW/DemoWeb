import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroBanner() {
  const slides = [
    {
      id: 1,
      title: "Âm Thanh Đỉnh Cao",
      subtitle: "Giảm tới 30% cho tai nghe cao cấp",
      image: "/tainghe5.png",
      bg: "bg-gradient-to-r from-blue-900 to-indigo-800",
    },
    {
      id: 2,
      title: "Phong Cách Mới",
      subtitle: "Khám phá bộ sưu tập JBL mới nhất",
      image: "/tainghe1.png",
      bg: "bg-gradient-to-r from-red-800 to-orange-600",
    },
    {
      id: 3,
      title: "Chống Ồn Chủ Động",
      subtitle: "Tận hưởng không gian của riêng bạn",
      image: "/tainghe6.png",
      bg: "bg-gradient-to-r from-gray-900 to-gray-700",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full ${slides[current].bg} flex flex-col md:flex-row items-center justify-between p-10 md:p-20`}
        >
          <div className="text-white z-10 flex flex-col gap-4 max-w-lg">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tight"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-2xl font-medium opacity-90"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 w-fit bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Khám Phá Ngay
            </motion.button>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            src={slides[current].image}
            className="w-48 h-48 md:w-96 md:h-96 object-contain z-10 mt-8 md:mt-0 drop-shadow-2xl"
            alt="Banner Image"
          />
          
          {/* Vòng tròn trang trí mờ phía sau */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        </motion.div>
      </AnimatePresence>

      {/* Dots (Chấm điều hướng) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === idx ? "bg-white scale-150" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
