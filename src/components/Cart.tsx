import { useSession } from "next-auth/react";
import { Badge } from "./ui/badge";
import { ShoppingCartIcon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/app/providers/cartProvider";

const Cart = () => {
  const { products } = useContext(CartContext);
  console.log("123", products);
  return (
    <div className="flex h-full flex-col gap-4">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
