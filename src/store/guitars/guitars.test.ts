import { mockTestCard, mockTestCards, mockTestComments } from '../../components/mock/mock';
import { InitialProduct } from '../../const';
import { guitars, loadCards, loadComments,
  loadFilteredCards, loadProduct, setGuitarInCart } from './guitars';

describe('Reducer: dataProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitars.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({catalogCards: [],
        product: InitialProduct,
        catalogFilteredCards: [],
        guitarsInCart: [],
        isDataLoaded: false,
        comments: {},
        clickGuitarId: 0,
        discount: 0,
      });
  });
  const state = {
    catalogCards: [],
    catalogFilteredCards: [],
    guitarsInCart: [],
    product: InitialProduct,
    isDataLoaded: false,
    comments: {},
    clickGuitarId: 0,
    discount: 0,
  };

  it('should load cards', () => {
    expect(guitars.reducer(state, loadCards(mockTestCards)))
      .toEqual({...state, catalogCards: mockTestCards,
        isDataLoaded: true,
      });
  });

  it('should load filtered cards', () => {
    expect(guitars.reducer(state, loadFilteredCards(mockTestCards)))
      .toEqual({...state, catalogFilteredCards: mockTestCards,
      });
  });

  it('should load product card', () => {
    expect(guitars.reducer(state, loadProduct(mockTestCard)))
      .toEqual({...state, product: mockTestCard,
      });
  });

  it('should load comments', () => {
    expect(guitars.reducer(state, loadComments({id:2, data:mockTestComments})))
      .toEqual({...state, comments: {2:mockTestComments},
      });
  });

  it('should setGuitarInCart', () => {
    expect(guitars.reducer(state, setGuitarInCart(mockTestCard)))
      .toEqual({...state, guitarsInCart: [{guitar: mockTestCard, quantity: 1}],
      });
  });
});
