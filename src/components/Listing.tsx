interface ItemProps {
    listing_id: number;
    url?: string;
    MainImage?: {
        url_570xN: string;
    };
    title?: string;
    currency_code?: string;
    price?: string;
    quantity?: number;
}

export default function Listing({ items = [] }: {items?: ItemProps[]}) {

    // Función para formatear el texto (Recorte estricto a 50 caracteres)
    const formatTitle = (title: string = '') => {
        return title.length > 50 ? `${title.slice(0, 50)}…` : title;
    };

    // Función para formatear la moneda (Formateo exacto de precios)
    const formatPrice = (price: string = '0.00', currencyCode: string = 'USD') => {
        switch (currencyCode) {
            case 'USD': return `$${price}`;
            case 'EUR': return `€${price}`;
            case 'GBP': return `£${price}`;
            default: return `${currencyCode} ${price}`;
        }
    };

    // Función para determinar el nivel de stock (Stock badges)
    const getStockClass = (quantity: number = 0) => {
        if (quantity <= 10) return 'stock-low';
        if (quantity <= 20) return 'stock-medium';
        return 'stock-high';
    };

    return (
        <div className="product-grid">
            {items.map((item) => {
                const { listing_id, url = '#', MainImage, title = '', currency_code = 'USD', price = '0.00', quantity = 0 } = item;
                const imageUrl = MainImage?.url_570xN || 'https://placeholder.com';

                return (
                    <a key={listing_id} href={url} target="_blank" rel="noopener noreferrer" className="product-link">
                        <div className="product-card">
                            <img src={imageUrl} alt={formatTitle(title)} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">{formatTitle(title)}</h3>
                                <div className="price-container">
                                    <div className="product-price">{formatPrice(price, currency_code)}</div>
                                    <span className={`stock-badge ${getStockClass(quantity)}`}>
                                        {quantity} left
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
