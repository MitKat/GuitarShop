import { closeModal, modals, openModal, openModalSuccess } from './modals';


describe('Reducer: mainProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(modals.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isVisible: false,
        isSuccess: false,
        isFormSearch: false,
      });
  });

  const state = {
    isVisible: false,
    isSuccess: false,
    isFormSearch: false,
  };

  it('should open modal', () => {
    expect(modals.reducer(state, openModal()))
      .toEqual({...state, isVisible: true,
      });
  });

  it('should open modal success', () => {
    expect(modals.reducer(state, openModalSuccess()))
      .toEqual({...state, isSuccess: true,
      });
  });

  it('should close all modal', () => {
    expect(modals.reducer(state, closeModal()))
      .toEqual({
        isVisible: false,
        isSuccess: false,
      });
  });
});
