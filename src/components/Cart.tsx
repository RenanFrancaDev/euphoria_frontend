import { useSession } from "next-auth/react";
import { Badge } from "./ui/badge";
import { ShoppingCartIcon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/app/providers/cartProvider";
import CartItem from "./Cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="flex h-full flex-col gap-4">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {products.length > 0 ? (
        products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))
      ) : (
        <p>Você ainda não adicionou nenhum produto ao carrinho</p>
      )}
    </div>
  );
};

export default Cart;
