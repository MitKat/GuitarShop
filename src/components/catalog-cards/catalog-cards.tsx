import { Card } from '../../types/card';
import ProductCard from '../product-card/product-card';

type CatalogCardsProps = {
    catalogCards: Card[];
}

function CatalogCards({catalogCards}: CatalogCardsProps): JSX.Element {

  return (
    <div className="cards catalog__cards" data-testid='catalog-cards'>
      {
        catalogCards.map((card) => (
          <ProductCard key={card.id} card={card} />
        ))
      }
    </div>
  );
}

export default CatalogCards;
