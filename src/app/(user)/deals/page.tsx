import { ProductService } from "@/app/api/product";
import ProductItem from "@/components/Product-Item";
import { Badge } from "@/components/ui/badge";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const deals = (await ProductService.getProductsWithDiscount()).data.data;

  return (
    <div className="flex flex-col gap-8 p-3">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PercentIcon size={16} />
        Ofertas
      </Badge>

      <div className="flex flex-row flex-wrap items-center justify-between w-full gap-2">
        {deals.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
