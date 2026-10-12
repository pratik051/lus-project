import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';

const CartContext = createContext();

const CART_STORAGE_KEY = 'luxstore_client_cart_v1';

// Seed default initial items matching Stitch Screen 7 / Screen 12 design
const DEFAULT_CART = [
  {
    itemId: 'minimalist-ceramic-mug-default',
    productId: 'minimalist-ceramic-mug',
    name: 'Minimalist Ceramic Mug',
    price: 28.0,
    quantity: 1,
    variantColor: 'Matte White',
    variantSize: 'Standard',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7jA06VFddnk9z5_RvkKbsXspaYiwNUJomrrRPflIikZp5vhxPHOOwlE-2yCV_FxxhRrkj202NuhDPz-BZWS38MZhSuLXGyjRgzqDXQWP_f-B1wFIKUlhyUBcaWDJzkf9reOkKaP0UhoFDK_-Gx2YnJR40JOHLR9FrupW_8kjX5t0yaeYC8RItp5rkGWAVMb_p_OaYfJMMBZK-sGfJHP_WQOEHIJvK2GigZIh-dA55O22cS-IHUV4OtA'
  },
  {
    itemId: 'brass-desk-lamp-default',
    productId: 'brass-desk-lamp',
    name: 'Brass Desk Lamp',
    price: 120.0,
    quantity: 1,
    variantColor: 'Brushed Brass',
    variantSize: 'Standard',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCBOiGr6RGC5H6Li72YQF53MmF5gfsVphZKfvaZrjqbzWMOJ-QKmhJ8Oohv8GYfHm9iVppCaxrrAWhqNVuFfGA-mw-9qU5LQi_-0nkl6Og4oVmIY6WcLGpWOr59fOuU5NNcZ6ep558zYBwaz29K53Aw39OXg5axWKhfYjEwenCmwFiDkTRc1eQo28sFEq0bWKZ7HfM3H4idxr9SPEuJme601lTWNFVS_NMyli7o7V0QMXCydftC8-Bxw'
  }
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CART;
    } catch {
      return DEFAULT_CART;
    }
  });

  const [promoCode, setPromoCode] = useState(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      cartService.syncCart(cartItems).catch(() => {});
    } catch {
      // ignore
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const colorName = selectedColor?.name || (product.colors?.[0]?.name) || 'Standard';
    const sizeName = selectedSize || (product.sizes?.[0]) || 'Standard';
    const itemId = `${product.id}-${colorName}-${sizeName}`.toLowerCase().replace(/\s+/g, '-');

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemId === itemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            variantColor: colorName,
            variantSize: sizeName,
            image: product.image
          }
        ];
      }
    });
  };

  const updateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.itemId === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.itemId !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
    setPromoDiscountPercent(0);
  };

  const applyPromo = async (code) => {
    const res = await cartService.applyPromoCode(code);
    setPromoCode(res.code);
    setPromoDiscountPercent(res.discountPercentage);
    return res;
  };

  const removePromo = () => {
    setPromoCode(null);
    setPromoDiscountPercent(0);
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Free shipping threshold at $150
  const freeShippingThreshold = 150;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 15.0;
  const discountAmount = (subtotal * promoDiscountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Number((taxableAmount * 0.08).toFixed(2)); // Standard 8% estimated tax
  const total = Number((taxableAmount + shippingFee + tax).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        shippingFee,
        freeShippingThreshold,
        promoCode,
        promoDiscountPercent,
        discountAmount,
        tax,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromo,
        removePromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
