import { products } from '@/data/products';
import { ProductCard } from '@/products';

export default function ProductsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold my-5">Product Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}
