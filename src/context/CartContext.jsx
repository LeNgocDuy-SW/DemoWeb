import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [listcarts, setListCarts] = useState([]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    setListCarts((prevCarts) => {
      const existingProduct = prevCarts.find((item) => item.id === product.id);
      if (existingProduct) {
        // Nếu đã có trong giỏ, tăng số lượng
        return prevCarts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới với số lượng là 1
        return [...prevCarts, { ...product, quantity: 1 }];
      }
    });
    toast.success("Đã thêm vào giỏ hàng!");
  };

  // Giảm số lượng
  const nutGiam = (index) => {
    setListCarts((prevCarts) => {
      const newList = [...prevCarts];
      if (newList[index].quantity > 1) {
        newList[index].quantity -= 1;
      }
      return newList;
    });
  };

  // Tăng số lượng
  const nutTang = (index) => {
    setListCarts((prevCarts) => {
      const newList = [...prevCarts];
      newList[index].quantity += 1;
      return newList;
    });
  };

  // Xoá sản phẩm
  const nutRemove = (index) => {
    setListCarts((prevCarts) => prevCarts.filter((_, i) => i !== index));
  };

  // Tổng số lượng sản phẩm trong giỏ (dành cho Navbar)
  const cartCount = listcarts.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        listcarts,
        cartCount,
        addToCart,
        nutTang,
        nutGiam,
        nutRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
