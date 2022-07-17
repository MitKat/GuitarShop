import { closeModal, modals, openModalFeedback, openModalSuccess } from './modals';


describe('Reducer: mainProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(modals.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isFeedback: false,
        isSuccess: false,
        isFormSearch: false,
        isAddInCart: false,
        isAddedSuccess: false,
        isDeleteFromCart: false,
      });
  });

  const state = {
    isFeedback: false,
    isSuccess: false,
    isFormSearch: false,
    isAddInCart: false,
    isAddedSuccess: false,
    isDeleteFromCart: false,
  };

  it('should open modal', () => {
    expect(modals.reducer(state, openModalFeedback()))
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
