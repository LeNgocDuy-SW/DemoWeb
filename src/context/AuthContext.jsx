import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allOrders, setAllOrders] = useState([
    { id: "ORD-9921", customer: "Nguyễn Văn A", product: "Apple Watch S9", date: "Vừa xong", total: "12.500.000đ", status: "Chờ duyệt", method: "MoMo" },
    { id: "ORD-9920", customer: "Trần Thị B", product: "JBL Live 660NC", date: "10 phút trước", total: "4.200.000đ", status: "Đã giao", method: "COD" },
  ]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Thử lấy thông tin đăng nhập từ localStorage khi khởi chạy
  useEffect(() => {
    const savedUser = localStorage.getItem("snapcart_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Đảm bảo các trường mới tồn tại để tránh crash
      if (!parsedUser.favorites) parsedUser.favorites = [];
      if (!parsedUser.orders) parsedUser.orders = [];
      setUser(parsedUser);
    }
  }, []);

  const login = (email, password) => {
    // Fake login: cứ nhập là thành công
    const role = email.toLowerCase() === "admin@luxe.com" ? "admin" : "user";
    const fakeUser = {
      name: role === "admin" ? "Administrator" : (email.split("@")[0] || "Khách hàng"),
      email: email,
      role: role,
      avatar: role === "admin" 
        ? "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" 
        : "https://i.pravatar.cc/150?u=" + email,
      points: role === "admin" ? 0 : Math.floor(Math.random() * 500) + 100,
      favorites: [],
      orders: role === "admin" ? [] : [
        { id: "ORD-1234", date: "07/05/2026", status: "Đang giao hàng", total: "15.000.000đ", items: "Apple Watch Series 9" },
        { id: "ORD-5678", date: "12/04/2026", status: "Đã giao", total: "5.690.000đ", items: "JBL Live 660NC" },
      ]
    };
    setUser(fakeUser);
    localStorage.setItem("snapcart_user", JSON.stringify(fakeUser));
    setIsAuthModalOpen(false);
    toast.success("Đăng nhập thành công!");
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: "ORD-" + Math.floor(Math.random() * 10000),
      date: "Vừa xong",
      status: "Chờ duyệt"
    };
    setAllOrders(prev => [newOrder, ...prev]);
    
    // Nếu là user đang đăng nhập, thêm vào lịch sử của họ
    if (user) {
      const updatedUser = { ...user, orders: [newOrder, ...(user.orders || [])] };
      setUser(updatedUser);
      localStorage.setItem("snapcart_user", JSON.stringify(updatedUser));
    }
  };

  const updateOrderStatus = (orderId, status) => {
    setAllOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: status } : order
    ));
    toast.success(`Cập nhật đơn hàng ${orderId} thành ${status}`);
  };

  const toggleFavorite = (product) => {
    if (!user) {
      setIsAuthModalOpen(true);
      toast.error("Vui lòng đăng nhập để lưu sản phẩm yêu thích");
      return;
    }

    const isFavorite = user.favorites.find(p => p.id === product.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = user.favorites.filter(p => p.id !== product.id);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } else {
      updatedFavorites = [...user.favorites, product];
      toast.success("Đã thêm vào danh sách yêu thích ❤️");
    }

    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem("snapcart_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("snapcart_user");
    toast.success("Đã đăng xuất");
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        toggleFavorite,
        allOrders,
        addOrder,
        updateOrderStatus,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
