import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { FaUserEdit, FaBoxOpen, FaHeart, FaCog, FaSignOutAlt, FaTrophy, FaChevronRight } from "react-icons/fa";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { id: "info", icon: FaUserEdit, label: "Thông tin cá nhân" },
    { id: "orders", icon: FaBoxOpen, label: "Quản lý đơn hàng" },
    { id: "favorites", icon: FaHeart, label: "Sản phẩm yêu thích" },
    { id: "settings", icon: FaCog, label: "Cài đặt tài khoản" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* SIDEBAR */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div className="flex flex-col items-center pb-6 border-b border-gray-100">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 shadow-md mb-4">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <div className="flex items-center gap-1 mt-3 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
              <FaTrophy /> {user.points} Điểm Luxe
            </div>
          </div>

          <nav className="flex flex-col gap-2 mt-6">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 
                ${activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                  : "text-gray-600 hover:bg-gray-50"}`}
              >
                <item.icon /> {item.label}
              </button>
            ))}
            
            <div className="h-px bg-gray-100 my-2"></div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-colors"
            >
              <FaSignOutAlt /> Đăng xuất
            </button>
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-3">
          {activeTab === "info" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Họ và tên</label>
                  <p className="text-lg font-semibold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email</label>
                  <p className="text-lg font-semibold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Số điện thoại</label>
                  <p className="text-lg font-semibold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">0987 *** 321</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Hạng thành viên</label>
                  <p className="text-lg font-semibold text-blue-600 bg-blue-50 p-3 rounded-xl border border-blue-100">Gold Member</p>
                </div>
              </div>
              <button className="mt-8 px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-95">
                Chỉnh sửa hồ sơ
              </button>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử đơn hàng</h3>
              <div className="space-y-4">
                {(user?.orders || []).map((order, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors bg-white hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                        #{i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{order.items}</p>
                        <p className="text-gray-500 text-sm">Mã đơn: <span className="font-semibold">{order.id}</span> | {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0">
                      <div className="text-right">
                        <p className="text-blue-600 font-black text-lg">{order.total}</p>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                          order.status === "Đã giao" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <FaChevronRight className="text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm yêu thích ({(user?.favorites || []).length})</h3>
              {(user?.favorites || []).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(user?.favorites || []).map((product) => (
                    <div key={product.id} className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                      <div className="relative h-48 bg-gray-50 overflow-hidden">
                        <img src={product.image} alt={product.label} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        <Link to={`/product/${product.id}`} className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                          Xem chi tiết
                        </Link>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-bold text-gray-900 line-clamp-1">{product.label}</h4>
                        <p className="text-blue-600 font-black mt-2">{product.gia}</p>
                        <button className="mt-auto w-full py-2 bg-gray-100 text-gray-600 rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors mt-4">
                          Mua lại
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <FaHeart className="text-gray-200 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Bạn chưa có sản phẩm yêu thích nào.</p>
                  <Link to="/" className="text-blue-600 font-bold hover:underline mt-2 inline-block">Khám phá ngay</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt tài khoản</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-900">Thông báo qua Email</p>
                    <p className="text-gray-500 text-sm">Nhận thông tin về khuyến mãi và đơn hàng</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-900">Xác thực 2 lớp</p>
                    <p className="text-gray-500 text-sm">Tăng cường bảo mật cho tài khoản của bạn</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <button className="text-red-600 font-bold hover:underline text-sm">Xóa tài khoản vĩnh viễn</button>
              </div>
            </div>
          )}
        </div>

      </main>

      <Footer />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
