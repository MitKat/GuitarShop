import { closeModal, modals, openFormSearch, openModalAddedSucces, openModalAddInCart, openModalDeleteGuitar, openModalFeedback, openModalSuccess } from './modals';


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
      .toEqual({...state, isFeedback: true,
      });
  });

  it('should open modal success', () => {
    expect(modals.reducer(state, openModalSuccess()))
      .toEqual({...state, isSuccess: true,
      });
  });
  it('should open form search', () => {
    expect(modals.reducer(state, openFormSearch()))
      .toEqual({...state, isFormSearch: true,
      });
  });
  it('should open modal add in cart', () => {
    expect(modals.reducer(state, openModalAddInCart()))
      .toEqual({...state, isAddInCart: true,
      });
  });
  it('should open modal added success', () => {
    expect(modals.reducer(state, openModalAddedSucces()))
      .toEqual({...state, isAddedSuccess: true,
      });
  });
  it('should open modal delete guitar', () => {
    expect(modals.reducer(state, openModalDeleteGuitar()))
      .toEqual({...state, isDeleteFromCart: true,
      });
  });

  it('should close all modal', () => {
    expect(modals.reducer(state, closeModal()))
      .toEqual({
        isFeedback: false,
        isSuccess: false,
        isFormSearch: false,
        isAddInCart: false,
        isAddedSuccess: false,
        isDeleteFromCart: false,
      });
  });
});
