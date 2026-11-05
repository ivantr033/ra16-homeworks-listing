import ProductsDB from './data/etsy.json';
import Listing from './components/Listing';
import './App.css';

interface Product {
  listing_id: number;
  state?: string;
  url?: string;
  MainImage?: {
    url_570xN: string;
  };
  title?: string;
  currency_code?: string;
  price?: string;
  quantity?: number;
}

// Filtramos los productos que no tengan imagen o estén inactivos de forma segura
const activeProducts = (ProductsDB as Product[]).filter(
  (item) => item.state === "active" && item.MainImage
);

function App() {
  return (
    <div className="container">
      <Listing items={activeProducts} />
    </div>
  );
}

export default App;
