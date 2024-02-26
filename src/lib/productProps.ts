export interface ProductListProps {
  product: {
    id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    newPrice: number;
    discount: number;
    imageUrls: [string];
    quantity_stock: number;
    created_at: Date;
    updated_at: Date;
  };
}
