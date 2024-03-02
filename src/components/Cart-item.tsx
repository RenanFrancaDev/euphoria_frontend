import { CartContext } from "@/app/providers/cartProvider";
import { ICartProduct } from "@/lib/cartProductProps";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";
import { Button } from "./ui/button";

interface CartItemProps {
  product: ICartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductToCart, increaseProductToCart, deleteProductToCart } =
    useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductToCart(product.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductToCart(product.id);
  };

  const handleDeleteProductClick = () => {
    deleteProductToCart(product.id);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* PARTE DIREITA (FOTO E NOME) */}

        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg border-solid border-2 border-primary">
          <Image
            src={`/fotos/products/${product.id}/${product.imageUrls[0]}`}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%] bg"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.newPrice.toFixed(2)}
            </p>
            {product.discount > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.price).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline" onClick={handleDeleteProductClick}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
