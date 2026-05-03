import Navbar from "../components/Navbar";
import { FaTrash } from "react-icons/fa";
import {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate

 } from "react-router-dom";

export default function GioHang() {
  const navigate = useNavigate();
  const [listcarts, setListCarts] = useState([
    {img: './nike1.jpg', price: '$180.000', quantity: 1},
    {img: './nike2.jpg', price: '$240.000', quantity: 1},
    {img: './nike4.jpg', price: '$399.000', quantity: 1},
    {img: './nike5.jpg', price: '$399.000', quantity: 1},
    {img: './nike1.jpg', price: '$180.000', quantity: 1},
    {img: './nike2.jpg', price: '$240.000', quantity: 1},
    {img: './nike4.jpg', price: '$399.000', quantity: 1},
    {img: './nike5.jpg', price: '$399.000', quantity: 1},
  ]);
  const listTotal = [
    {title: "Subtotal", val: "$824.00"},
    {title: "Estimated Shipping", val: "FREE"},
    {title: "Tax", val: "$65.92"},
  ];

  const [count, setCount] = useState(0);
  const nutGiam = (index) => {
    const newList = [...listcarts];
    if(newList[index].quantity > 1){
      newList[index].quantity -=1;
      setListCarts(newList);
    }
  };
  const nutTang = (index) =>{
    const newList = [...listcarts];
    newList[index].quantity += 1;
    setListCarts(newList);
  };
  const nutRemove = (index) =>{
    const newList = listcarts.filter((_, i) => i !== index);
    setListCarts(newList);
  }

  const thanhToan = () =>{
    if(listcarts.length === 0){
      alert("Giỏ hàng đang trống, vui lòng thêm sản phẩm");
      return;
    }
    navigate("/checkout")
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className=" max-w-9xl mx-auto p-10 grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-12 bg-gray-300 shadow-sm border border-gray-100 flex">
        <div className="flex flex-col gap-3">
          <div className ="flex justify-between items-center">
            <h2 className="font-semibold text-[30px]">Your Cart</h2>
            <span className="text-gray-600">3 items</span>
          </div>
          
          <div className ="p-6 bg-white shadow-sm font-sans rounded-lg flex flex-col gap-3">
            {listcarts.map((items, index)=>(
              <div className="flex justify-between items-center border-b  p-3"> 
                <div className="flex items-center gap-6">
                  <img src={items.img} alt="product" className ="w-32 h-32 object-cover bg-gray-100" />
                  <div className="ml-5 flex flex-col gap-2">
                    <span className="font-bold text-gray-800 ">Air Max Catalyst</span>
                    <p className="text-gray-600">Size: US10 | Color: Racing Red</p>
                    <button onClick ={() => nutRemove(index)} className="flex gap-3 items-center hover:scale-105 transiton hover:bg-gray-100 rounded-full p-1 cursor-pointer">
                      <FaTrash className="text-red-500"/>
                      <span className="text-red-500">Remove</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-beween gap-15">
                  <div className="flex h-10 w-28 bg-gray-300 rounded-xl p-1.5 items-center justify-between">
                    <div className="w-9 h-9 rounded-full flex items-center hover:bg-white justify-center ">
                    <button onClick={() => nutGiam(index)} className="w-full h-full rounded-full items-center text-center cursor-pointer">
                      <span className="font-black text-xl">-</span>
                    </button></div>
                    <span className="font-semibold">{items.quantity}</span>
                    <div className="w-9 h-9 rounded-full flex items-center hover:bg-white justify-center ">
                    <button onClick={() => nutTang(index)} className="w-full h-full rounded-full items-center text-center cursor-pointer">
                      <span className="font-black text-xl">+</span>
                    </button></div>
                  </div>
                  <span className="font-bold text-gray-800 text-xl">{items.price}</span>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        {/**Thẻ phải */}
        <div className="sticky top-20 h-fit flex flex-col gap-6 bg-white p-7 rounded-lg">
            <h1 className="font-semibold text-3xl ">Order Summary</h1>
            <div className="flex flex-col gap-3 border-b p-3">
              {listTotal.map((items, index) =>(
              <div key={index} className ="flex justify-between items-center">
                <span className="font-semibold text-gray-500 text-[18px]">{items.title}</span>
                <span className="font-semibold text-gray-500 text-[18px]">{items.val}</span>
              </div>
            ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-semibold text-xl ">Total</span>
                <span className="text-gray-500">VAT Included</span>
              </div>
              <h2 className="font-bold text-[25px]">$889.92</h2>
            </div>

              <button onClick={() => thanhToan()} className="w-full p-3 bg-black rounded-lg hover:scale-105 
               flex justify-center items-center hover:bg-gray-700 transition-all duration-300 cursor-pointer">
                <span className="text-white font-bold text-xl tracking-widest">PROCEED TO CHECKOUT</span>
              </button>
              <button onClick={() => navigate("/")} className="w-full p-2 bg-white rounded-lg border hover:scale-105 transiton
              hover:bg-gray-200 duration-300 cursor-pointer">
                <span className="font-semibold text-xl tracking-widest">CONTINUE SHOPPING</span>
              </button>
        

        </div>
      </main>
    </div>
  );
}