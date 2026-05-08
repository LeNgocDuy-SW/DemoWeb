import Navbar from "../components/Navbar";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { FaShippingFast, FaWallet, FaArrowRight, FaUniversity, FaMobileAlt, FaMoneyBillWave } from "react-icons/fa";

export default function ThanhToan() {
 
  const info_ct =[
    {label: "Full Name", place: "Nhập tên của bạn..."},
    {label: "Phone Number", place: "Nhập số điện thoại..."},
  ];
  const info_ar = [
    {label: "City", name: "city", type: "select", options: ["Hà Nội", "TP.HCM", "Đà Nẵng"]},
    {label: "Postal Code", name: "postalCode", type: "input", placeholder: "Nhập mã bưu chính..."},
  ];
  const pay_method =[
    {id: "momo", icon: FaMobileAlt, label: "Ví MoMo", color: "text-pink-600"},
    {id: "vnpay", icon: FaMobileAlt, label: "VNPay", color: "text-blue-500"},
    {id: "cod", icon: FaMoneyBillWave, label: "Nhận khi giao hàng", color: "text-green-600"},
    {id: "bank", icon: FaUniversity, label: "Chuyển khoản", color: "text-blue-800"},
  ];

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const { listcarts, clearCart } = useCart();
  const { user, addOrder } = useAuth();

  const subtotal = listcarts.reduce((acc, item) => {
    const priceNum = parseInt(item.gia.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + (priceNum * item.quantity);
  }, 0);
  const tax = subtotal * 0.08;
  const totalPrice = subtotal + tax;

  const formatPrice = (num) => num.toLocaleString('vi-VN') + "đ";

  const total = [
    {label: "Subtotal", value: formatPrice(subtotal)},
    {label: "Shipping", value: "FREE"},
    {label: "Tax (8%)", value: formatPrice(tax)},
  ];
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className={"max-w-7xl mx-auto px-10 py-5 grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-12 bg-white shadow-sm border border-gray-100 flex"}>
        
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Secure Checkout</h1>
          {/**Delivery Infomation */}
          <div className ="bg-white p-4 rounded-lg flex flex-col gap-3 border border-gray-200">
            <div className="flex items-center gap-4">
              <FaShippingFast className="text-xl text-blue-600" />
              <h2 className="text-2xl ">Delivery Infomation</h2>
            </div>

            <div className="flex justify-between gap-5">
              {info_ct.map((item, index) => (
                <div className="flex flex-col w-1/2 gap-2">
                <span className="font-bold">{item.label}</span>
                <input placeholder={item.place}
                 className="h-10 w-full border border-gray-200 rounded-lg p-1">
                </input>
              </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="font-bold">Shipping Address</span>
              <input 
              placeholder={"Nhập địa chỉ nhận hàng..."}
              className="h-10 w-full border border-gray-200 p-1 rounded-lg">
              </input>
            </div>

            <div className ="flex justify-between gap-4">
              {info_ar.map((item) => (
                <div key={item.name} className="flex flex-col gap-2 w-full">
                  <span className="font-bold">{item.label}</span>
                  {item.type ==="select" ? (
                    <select className = "h-10 w-full border border-gray-200 rounded-lg p-1">
                      <option value ="">Chọn</option>
                      {item.options.map((opt, i)=> (

                        <option key={i} value={opt} >
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) :(
                    <input placeholder={item.placeholder} className ={"h-10 border border-gray-200 rounded-lg p-1"}></input>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/**Payment Method */}
          <div className="bg-white flex flex-col gap-3 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <FaWallet className="text-xl text-blue-600" />
                <h2 className="text-2xl">Phương thức thanh toán</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {pay_method.map((item)=>(
                  <div 
                    key={item.id}
                    onClick={() => setSelectedPayment(item.id)}
                    className={`p-4 border-2 flex flex-col justify-center items-center gap-2 rounded-xl transition-all duration-200 cursor-pointer
                    ${selectedPayment === item.id 
                      ? "border-blue-600 bg-blue-50 shadow-md scale-105" 
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                  >
                    <item.icon className={`text-3xl ${item.color}`} />
                    <span className="font-bold text-gray-800">{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
                {selectedPayment === "momo" && "Bạn sẽ được chuyển hướng tới ứng dụng MoMo để thanh toán an toàn."}
                {selectedPayment === "vnpay" && "Quét mã QR qua ứng dụng ngân hàng hoặc ví điện tử có hỗ trợ VNPay."}
                {selectedPayment === "cod" && "Thanh toán bằng tiền mặt khi shipper giao hàng tới địa chỉ của bạn."}
                {selectedPayment === "bank" && "Quét mã QR SePay ở phần Tóm tắt Đơn hàng bên phải để chuyển khoản."}
              </div>
          </div>
        </div>
        {/**Thẻ phải */}
        <div className="w-full flex flex-col p-5 bg-white rounded-lg gap-3 border border-gray-200">
          <span className="font-semibold text-2xl">Order Summary</span>
          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {listcarts.map((item, index) => (
              <div key={index} className="flex">
                <img src={item.image} alt={item.label} className ="w-20 h-20 object-contain bg-gray-50 rounded-md" />
                <div className="ml-5 flex flex-col justify-center gap-1">
                    <span className="font-bold text-gray-800 text-[15px]">{item.label}</span>
                    <p className="text-gray-600 text-sm">Số lượng: {item.quantity}</p>
                    <span className="font-semibold text-[15px]">{item.gia}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="h-0 w-full border border-gray-300 mt-2"></div>
          {total.map((i, index)=>(
            <div key={index} className="flex justify-between">
              <span className="font-semibold text-gray-600">{i.label}</span>
              <span className="font-semibold">{i.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-semibold">Total</span>
            <span className="font-semibold text-xl text-red-600">{formatPrice(totalPrice)}</span>
          </div>

          {selectedPayment === "bank" && (
            <div className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 animate-fadeIn">
              <p className="font-bold text-blue-800 text-sm">Quét mã để chuyển khoản</p>
              <img 
                src={`https://qr.sepay.vn/img?bank=Vietcombank&acc=9339582134&template=compact&amount=${Math.round(totalPrice)}&des=LUXE${Math.floor(Math.random() * 10000)}`} 
                alt="QR Code" 
                className="w-48 h-48 object-contain rounded-lg shadow-md border-4 border-white"
              />
              <p className="text-[10px] text-gray-500 italic text-center">Tự động cập nhật: {formatPrice(totalPrice)}</p>
            </div>
          )}

          <button 
            onClick={() => {
              if (listcarts.length === 0) return;
              
              const orderData = {
                customer: user?.name || "Khách ẩn danh",
                product: listcarts[0].label + (listcarts.length > 1 ? ` (+${listcarts.length - 1})` : ""),
                total: formatPrice(totalPrice),
                method: pay_method.find(m => m.id === selectedPayment)?.label || "N/A"
              };
              
              addOrder(orderData);
              clearCart();
              alert("Đơn hàng của bạn đã được ghi nhận! Cảm ơn bạn đã mua sắm tại Snapcart.");
            }}
            className="flex items-center justify-center gap-2 p-4 bg-gray-900 text-white rounded-2xl hover:bg-black hover:scale-[1.02] shadow-xl active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
            disabled={listcarts.length === 0}
          >
            <span className="font-black text-lg tracking-widest">PLACE ORDER</span>
            <FaArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}