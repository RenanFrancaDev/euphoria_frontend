import { useSession } from "next-auth/react";
import { Badge } from "./ui/badge";
import { ShoppingCartIcon } from "lucide-react";
import { use, useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/providers/cartProvider";
import CartItem from "./Cart-item";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import axios from "axios";
import { DefaultSession } from "next-auth";
import { IAddress } from "@/lib/addressProps";

// interface ExtendedSession extends DefaultSession {
//   id?: string;
//   iat?: number;
//   exp?: number;
// }

const Cart = () => {
  const { data } = useSession();
  const [address, setAddress] = useState<IAddress[]>([]);
  const [currentAddress, setCurrentAddress] = useState<IAddress>({});

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
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/address/user/${data.user.id}`
        );
        setAddress(response.data.data);
        setCurrentAddress(response.data.data[0]);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (data?.user) {
      fetchAddress();
    }
  }, []);

  const handleSelectChange = (e: any) => {
    const selectedId = parseInt(e.target.value);
    const selectedAddress = address.find((item) => item.id === selectedId);

    setCurrentAddress(selectedAddress);
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto ">
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
          <h6>Endereço de entrega:</h6>
          {address.length > 0 && (
            <select
              onChange={handleSelectChange}
              className="border-2 border-primary"
            >
              {address.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.street}
                </option>
              ))}
            </select>
          )}
          {currentAddress ? (
            <div className="flex flex-col gap-2  justify-between text-xs">
              <p>Rua: {currentAddress.street}</p>
              <p>Bairro: {currentAddress.neighborhood}</p>
              <p>CEP: {currentAddress.cep}</p>
              <p>nº: {currentAddress.number}</p>
              <p>Complemento: {currentAddress.complement}</p>
            </div>
          ) : null}

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
