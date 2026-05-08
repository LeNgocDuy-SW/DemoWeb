import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { 
  FaChartLine, FaBox, FaUsers, FaDolly, FaArrowUp, 
  FaSearch, FaFilter, FaEllipsisV, FaBell, FaCheck, FaTimes 
} from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const { user, allOrders, updateOrderStatus } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("revenue");

  const formatPrice = (num) => num.toLocaleString('vi-VN') + "đ";
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;

  // Tính toán doanh thu thực tế từ allOrders (chỉ tính đơn đã giao)
  const totalRevenueNum = allOrders
    .filter(order => order.status === "Đã giao")
    .reduce((acc, order) => acc + parsePrice(order.total), 0);
  
  const totalOrdersCount = allOrders.length;
  const pendingOrdersCount = allOrders.filter(order => order.status === "Chờ duyệt").length;

  // Kiểm tra quyền Admin (giả lập)
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
             <FaTimes />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase">Từ chối truy cập</h1>
          <p className="text-gray-500 mb-8 font-medium">Bạn không có quyền quản trị viên để xem trang này. Vui lòng đăng nhập bằng tài khoản Admin.</p>
          <button 
            onClick={() => navigate("/")}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Doanh Thu (Đã giao)", value: formatPrice(totalRevenueNum), icon: FaChartLine, color: "bg-blue-600", trend: "+12.5%" },
    { label: "Tổng Đơn Hàng", value: totalOrdersCount.toString(), icon: FaBox, color: "bg-purple-600", trend: "+5.2%" },
    { label: "Đơn Chờ Duyệt", value: pendingOrdersCount.toString(), icon: FaBell, color: "bg-orange-600", trend: "Hot" },
    { label: "Sản Phẩm", value: "156", icon: FaDolly, color: "bg-emerald-600", trend: "+2.1%" },
  ];

  const recentOrders = [
    { id: "ORD-9921", customer: "Nguyễn Văn A", product: "Apple Watch S9", date: "Vừa xong", total: "12.500.000đ", status: "Chờ duyệt", method: "MoMo" },
    { id: "ORD-9920", customer: "Trần Thị B", product: "JBL Live 660NC", date: "10 phút trước", total: "4.200.000đ", status: "Đã giao", method: "COD" },
    { id: "ORD-9919", customer: "Lê Văn C", product: "Instax Mini 12", date: "2 giờ trước", total: "2.350.000đ", status: "Đang giao", method: "VNPay" },
    { id: "ORD-9918", customer: "Phạm Văn D", product: "Garmin Venu 3", date: "Hôm qua", total: "10.800.000đ", status: "Đã hủy", method: "Bank Transfer" },
  ];

  const chartData = [45, 60, 40, 85, 70, 95, 80, 55, 90, 100, 75, 85];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6 gap-8">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Chính</p>
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("revenue")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "revenue" ? "bg-gray-900 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
              >
                <FaChartLine /> Doanh thu
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === "orders" ? "bg-gray-900 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
              >
                <FaBox /> Đơn hàng
              </button>
            </nav>
          </div>
          
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Cài đặt hệ thống</p>
            <nav className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50">
                <FaDolly /> Kho hàng
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50">
                <FaUsers /> Khách hàng
              </button>
            </nav>
          </div>

          <div className="mt-auto p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-blue-800 font-bold text-sm mb-2">Hỗ trợ kỹ thuật</p>
            <p className="text-blue-600 text-xs">Liên hệ: support@luxe.com</p>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Admin Dashboard</h1>
              <p className="text-gray-500 font-medium">Chào mừng trở lại, quản trị viên hệ thống.</p>
            </div>
            <div className="flex gap-4">
              <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-600 hover:shadow-md transition-all">
                <FaBell />
              </button>
              <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl border border-gray-100 shadow-sm">
                <img src={user.avatar} className="w-10 h-10 rounded-xl" alt="Admin" />
                <div>
                   <p className="text-sm font-bold text-gray-900">Admin Snapcart</p>
                   <p className="text-[10px] font-bold text-emerald-600 uppercase">Online</p>
                </div>
              </div>
            </div>
          </div>

          {activeTab === "revenue" && (
            <div className="flex flex-col gap-8 animate-fadeIn">
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg shadow-gray-200`}>
                        <stat.icon size={24} />
                      </div>
                      <span className="text-emerald-600 font-black text-sm bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                    </div>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                    <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* REVENUE CHART */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-bold text-gray-900">Biểu đồ doanh thu tháng</h3>
                  <select className="bg-gray-50 border-none rounded-xl font-bold text-sm px-4 py-2">
                    <option>Năm 2026</option>
                    <option>Năm 2025</option>
                  </select>
                </div>
                
                <div className="h-64 flex items-end justify-between gap-2 px-2">
                  {chartData.map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                      <div 
                        className="w-full bg-blue-600 rounded-t-xl group-hover:bg-blue-800 transition-all cursor-pointer relative"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          {height * 10}tr
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">T{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
              <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-xl font-bold text-gray-900">Quản lý đơn hàng mới</h3>
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-gray-200" placeholder="Tìm kiếm đơn hàng..." />
                  </div>
                  <button className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-gray-100">
                    <FaFilter />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Mã đơn</th>
                      <th className="px-4 py-4">Khách hàng</th>
                      <th className="px-4 py-4">Sản phẩm</th>
                      <th className="px-4 py-4 text-right">Tổng tiền</th>
                      <th className="px-4 py-4 text-center">Trạng thái</th>
                      <th className="px-8 py-4 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {allOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6 font-black text-blue-600">{order.id}</td>
                        <td className="px-4 py-6">
                          <p className="font-bold text-gray-900">{order.customer || "Khách ẩn danh"}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{order.method}</p>
                        </td>
                        <td className="px-4 py-6 font-medium text-gray-600">{order.product}</td>
                        <td className="px-4 py-6 text-right font-black text-gray-900">{order.total}</td>
                        <td className="px-4 py-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            order.status === "Đã giao" ? "bg-emerald-100 text-emerald-700" :
                            order.status === "Chờ duyệt" ? "bg-amber-100 text-amber-700" :
                            order.status === "Đang giao" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2">
                             {order.status === "Chờ duyệt" && (
                               <>
                                 <button 
                                   onClick={() => updateOrderStatus(order.id, "Đang giao")}
                                   className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                   title="Duyệt đơn"
                                 >
                                   <FaCheck size={12} />
                                 </button>
                                 <button 
                                   onClick={() => updateOrderStatus(order.id, "Đã hủy")}
                                   className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                   title="Hủy đơn"
                                 >
                                   <FaTimes size={12} />
                                 </button>
                               </>
                             )}
                             {order.status === "Đang giao" && (
                               <button 
                                 onClick={() => updateOrderStatus(order.id, "Đã giao")}
                                 className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 shadow-md"
                               >
                                 XÁC NHẬN GIAO
                               </button>
                             )}
                             <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-200"><FaEllipsisV size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
