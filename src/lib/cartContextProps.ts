import { ICartProduct } from "./cartProductProps";

export interface ICartContext {
  products: ICartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subtotal: number;
  totalDiscount: number;
  addProductToCart: (product: ICartProduct) => void;
  decreaseProductToCart: (productId: string) => void;
  increaseProductToCart: (productId: string) => void;
  deleteProductToCart: (productId: string) => void;
}
