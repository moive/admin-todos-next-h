import { products, type Product } from '@/data/products';
import { ItemCard } from '@/shopping-cart/components/ItemCart';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Shopping cart',
  description: 'Shopping cart',
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default async function CartPage() {
  const cookiesStore = await cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {
    [id: string]: number;
  };
  const productInCart = getProductInCart(cart);

  return (
    <div>
      <h1>Cart Page</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productInCart.map((item) => (
            <ItemCard key={item.product.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
