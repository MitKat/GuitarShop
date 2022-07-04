import { addFilterStringCount, addFilterType, changeFilterPriceEnd, changeFilterPriceStart, changeOrderSort, changeTypeSort, deleteFilterStringCount, deleteFilterType, resetFilter, stateFilterAndSort } from './state-filter-and-sort';


describe('Reducer: stateFilterAndSort', () => {
  it('without additional parameters should return initial state', () => {
    expect(stateFilterAndSort.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        filtersState: {
          priceStart: 0,
          priceEnd: 0,
          typeGuitar: [],
          stringCount: [],
        },
        sortState: {
          sort: '',
          order: '',
        },
      });
  });

  const state = {
    filtersState: {
      priceStart: 0,
      priceEnd: 0,
      typeGuitar: [],
      stringCount: [],
    },
    sortState: {
      sort: 'price',
      order: 'asc',
    },
  };

  it('should change price min', () => {
    expect(stateFilterAndSort.reducer(state, changeFilterPriceStart(45)))
      .toEqual({...state,
        filtersState: {
          ...state.filtersState,
          priceStart: 45,
        },
      });
  });
  it('should change price max', () => {
    expect(stateFilterAndSort.reducer(state, changeFilterPriceEnd(54)))
      .toEqual({...state,
        filtersState: {
          ...state.filtersState,
          priceEnd: 54,
        },
      });
  });
  it('should add type Guitar', () => {
    expect(stateFilterAndSort.reducer(state, addFilterType(['ukulele'])))
      .toEqual({...state,
        filtersState: {
          ...state.filtersState,
          typeGuitar: ['ukulele'],
        },
      });
  });
  it('should delete type Guitar', () => {
    expect(stateFilterAndSort.reducer(state, deleteFilterType(['ukulele'])))
      .toEqual({...state,
        filtersState: {
          ...state.filtersState,
          typeGuitar: state.filtersState.typeGuitar.filter((item) => item !== 'ukulele'),
        },
      });
  });
  it('should add string count by Guitar', () => {
    expect(stateFilterAndSort.reducer(state, addFilterStringCount(['4'])))
      .toEqual({...state,
        filtersState: {
          ...state.filtersState,
          stringCount: ['4'],
        },
      });
  });
  it('should delete string count by Guitar', () => {
    expect(stateFilterAndSort.reducer(state, deleteFilterStringCount(['4'])))
      .toEqual({...state,
        filtersState: {
          ...state.filtersState,
          stringCount: state.filtersState.typeGuitar.filter((item) => item !== '4'),
        },
      });
  });
  it('should reset all filter form', () => {
    expect(stateFilterAndSort.reducer(state, resetFilter()))
      .toEqual({...state,
        filtersState: {
          priceStart: 0,
          priceEnd: 0,
          typeGuitar: [],
          stringCount: [],
        },
      });
  });
  it('should change type sort', () => {
    expect(stateFilterAndSort.reducer(state, changeTypeSort('price')))
      .toEqual({...state,
        sortState: {
          ...state.sortState,
          sort: 'price',
        },
      });
  });
  it('should change order sort', () => {
    expect(stateFilterAndSort.reducer(state, changeOrderSort('asc')))
      .toEqual({...state,
        sortState: {
          ...state.sortState,
          order: 'asc',
        },
      });
  });


});
