import { mockTestCard, mockTestCards, mockTestComments } from '../../components/mock/mock';
import { InitialProduct } from '../../const';
import { dataProcess, loadCards, loadComments, loadFilteredCards, loadProduct } from './data-process';

describe('Reducer: dataProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({catalogCards: [],
        product: InitialProduct,
        catalogFilteredCards: [],
        isDataLoaded: false,
        comments: {},
      });
  });
  const state = {
    catalogCards: [],
    catalogFilteredCards: [],
    product: InitialProduct,
    isDataLoaded: false,
    comments: {},
  };

  it('should load cards', () => {
    expect(dataProcess.reducer(state, loadCards(mockTestCards)))
      .toEqual({...state, catalogCards: mockTestCards,
        isDataLoaded: true,
      });
  });

  it('should load filtered cards', () => {
    expect(dataProcess.reducer(state, loadFilteredCards(mockTestCards)))
      .toEqual({...state, catalogFilteredCards: mockTestCards,
      });
  });

  it('should load product card', () => {
    expect(dataProcess.reducer(state, loadProduct(mockTestCard)))
      .toEqual({...state, product: mockTestCard,
      });
  });

  it('should load comments', () => {
    expect(dataProcess.reducer(state, loadComments({id:2, data:mockTestComments})))
      .toEqual({...state, comments: {2:mockTestComments},
      });
  });
});
