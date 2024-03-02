"use client";
import { ICartContext } from "@/lib/cartContextProps";
import { ICartProduct } from "@/lib/cartProductProps";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductToCart: () => {},
  increaseProductToCart: () => {},
  deleteProductToCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ICartProduct[]>([]);

  useEffect(() => {
    const item = JSON.parse(
      localStorage.getItem("@euphoria-store/cart-products") || "[]"
    );

    setProducts(item);
  }, []);

  console.log("products", products);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(
        "@euphoria-store/cart-products",
        JSON.stringify(products)
      );
    }
  }, [products]);

  // Total without discount
  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  // Total with discount
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subtotal - total;

  const addProductToCart = (product: ICartProduct) => {
    console.log(product);
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          console.log(cartProduct);

          return cartProduct;
        })
      );

      console.log(productIsAlreadyOnCart);

      return;
    }
    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductToCart = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0)
    );
  };

  const increaseProductToCart = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        return cartProduct;
      })
    );
  };

  const deleteProductToCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId)
    );
  };
  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductToCart,
        increaseProductToCart,
        deleteProductToCart,
        total,
        subtotal,
        totalDiscount,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
