import { closeModal, mainProcess, openModal, openModalSuccess } from './main-process';


describe('Reducer: mainProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(mainProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isVisible: false,
        isSuccess: false,
      });
  });

  const state = {
    isVisible: false,
    isSuccess: false,
  };

  it('should open modal', () => {
    expect(mainProcess.reducer(state, openModal()))
      .toEqual({...state, isVisible: true,
      });
  });

  it('should open modal success', () => {
    expect(mainProcess.reducer(state, openModalSuccess()))
      .toEqual({...state, isSuccess: true,
      });
  });

  it('should close all modal', () => {
    expect(mainProcess.reducer(state, closeModal()))
      .toEqual({
        isVisible: false,
        isSuccess: false,
      });
  });
});
