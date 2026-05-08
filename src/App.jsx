import React, { useState } from 'react';
// 1. SỬA LẠI IMPORT CHUẨN: Routes và Route (Không có chữ R ở cuối)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import ChiTietSP from "./pages/ChiTietSP.jsx";
import GioHang from "./pages/GioHang.jsx";
import ThanhToan from "./pages/ThanhToan.jsx";
import Profile from "./pages/Profile.jsx";
import AuthModal from "./components/AuthModal.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ChiTietSP />} />
            <Route path="/cart" element={<GioHang />} />
            <Route path="/checkout" element={<ThanhToan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <AuthModal />
        </CartProvider>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}