import { useSession } from "next-auth/react";
import { Badge } from "./ui/badge";
import { ShoppingCartIcon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/app/providers/cartProvider";
import CartItem from "./Cart-item";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import axios from "axios";

const Cart = () => {
  const { data } = useSession();

  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      return alert("Fazer o Login");
    }

    const order = await axios.post("http://localhost:4000/orders", {
      headers: {
        "Content-type": "application/json",
      },
      total_price: subtotal,
      total_discount: totalDiscount,
      total_price_current: total,
      status: "pending",
      products: products,
      user_id: data.user.id,
    });
    console.log(order);
  };

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

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
