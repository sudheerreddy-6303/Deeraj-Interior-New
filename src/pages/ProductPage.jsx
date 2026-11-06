import { useParams } from 'react-router-dom';
import Shop from '../store/Shop.jsx';

// Full product page: /store/product/:id
// Same cart, checkout and "My orders" as the store; the product list is replaced by the product details.
export default function ProductPage() {
  const { id } = useParams();
  return (
    <div className="page" id="p-product">
      <Shop key={id} productId={Number(id) || -1} />
    </div>
  );
}
