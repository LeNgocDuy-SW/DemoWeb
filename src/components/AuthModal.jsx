import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { FaTimes, FaEnvelope, FaLock, FaGoogle, FaFacebookF } from "react-icons/fa";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
  };

  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Close button */}
          <button 
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10 text-gray-500"
          >
            <FaTimes />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-black text-center text-gray-900 mb-2">
              {isLogin ? "Đăng Nhập" : "Tạo Tài Khoản"}
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Trải nghiệm mua sắm công nghệ đỉnh cao cùng Snapcart
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  required
                  placeholder="Địa chỉ Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  required
                  placeholder="Mật khẩu" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-blue-600 font-semibold hover:underline">Quên mật khẩu?</a>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 mt-2"
              >
                {isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-sm text-gray-400 font-medium">HOẶC</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-2 border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <FaGoogle className="text-red-500" />
                <span className="font-semibold text-gray-600 text-sm">Google</span>
              </button>
              <button className="flex-1 py-2 border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <FaFacebookF className="text-blue-600" />
                <span className="font-semibold text-gray-600 text-sm">Facebook</span>
              </button>
            </div>

            <p className="text-center mt-8 text-sm text-gray-600">
              {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-bold hover:underline"
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
