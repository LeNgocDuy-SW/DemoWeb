import React, { useState } from 'react';
// 1. SỬA LẠI IMPORT CHUẨN: Routes và Route (Không có chữ R ở cuối)
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductShowcaseImageRotate from './An1.jsx';
import NotificationApp from "./AnmThongBao.jsx";
import AnimeTruot from "./AnmTruot.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductCart from "./components/Taiwwindd.jsx";
import Navbar from "./components/Navbar.jsx";
import ChiTietSP from "./pages/ChiTietSP.jsx";
import GioHang from "./pages/GioHang.jsx";
import ThanhToan from './pages/ThanhToan.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChiTietSP />} />
        <Route path="/cart" element={<GioHang />} />
        <Route path="/checkout" element={<ThanhToan />} />
      </Routes>
    </BrowserRouter>
  );
}