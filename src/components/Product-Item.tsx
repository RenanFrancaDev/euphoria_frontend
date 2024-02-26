// import { ProductWithnewPrice } from "@/helpers/products";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import DiscountBadge from "./Discount-Badge";
import { ProductListProps } from "@/lib/productProps";

const ProductItem = ({ product }: ProductListProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col gap-4 w-[180px] h-full border rounded-md  hover:cursor-pointer">
        <div className="relative flex w-full items-center justify-center rounded-lg  bg-emerald-100 ">
          <Image
            src={`/fotos/products/${product.id}/${product.imageUrls[0]}`}
            height={0}
            width={0}
            sizes="100vw"
            className="h-full w-full "
            style={{
              objectFit: "contain",
            }}
            alt={product.name}
          />

          {product.discount > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discount}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center gap-2 ">
            {product.discount > 0 ? (
              <>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                  R$ {product.newPrice.toFixed(2)}
                </p>

                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  R$ {Number(product.price).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                R$ {Number(product.price).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
