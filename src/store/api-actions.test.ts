import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import thunk from 'redux-thunk';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { fetchCardsAction, fetchCommentsAction, fetchFilteredCardsAction, fetchProductAction, sendComment } from './api-actions';
import { loadCards, loadComments, loadFilteredCards, loadProduct } from './data-process/data-process';
import { mockCommentData, mockTestCard, mockTestCards, mockTestComments } from '../components/mock/mock';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


  it('should dispatch loadCards when GET /guitars', async () => {
    const fakeCards = mockTestCards;
    mockAPI
      .onGet(APIRoute.Cards)
      .reply(200, fakeCards);

    const store = mockStore();
    await store.dispatch(fetchCardsAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadCards.toString());
  });

  it('should dispatch loadFilteredCards when GET ?stringCount', async () => {
    const fakeCards = mockTestCards;
    const state = {
      filtersState: {
        priceStart: 0,
        priceEnd: 0,
        typeGuitar: [],
        stringCount: '6',
      },
      sortState: {
        sort: 'price',
        order: 'asc',
      },
    };
    mockAPI
      .onGet(`${APIRoute.Cards}?stringCount=6`)
      .reply(200, fakeCards);

    const store = mockStore();
    await store.dispatch(fetchFilteredCardsAction(state));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFilteredCards.toString());
  });

  it('should dispatch loadProduct when GET /guitars/id', async () => {
    const fakeCard = mockTestCard;
    mockAPI
      .onGet(`${APIRoute.Cards}/1`)
      .reply(200, fakeCard);

    const store = mockStore();
    await store.dispatch(fetchProductAction('1'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadProduct.toString());
  });

  it('should dispatch loadComments when GET /guitars/id/comments', async () => {
    const fakeComments = mockTestComments;
    mockAPI
      .onGet(`${APIRoute.Cards}/1${APIRoute.Comments}`)
      .reply(200, fakeComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(1));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadComments.toString());
  });

  it('should dispatch loadComments when add Comment when POST', async () => {
    const fakeComment = mockCommentData;
    mockAPI
      .onPost(APIRoute.Comments)
      .reply(200, fakeComment);

    const store = mockStore();
    await store.dispatch(sendComment(fakeComment));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadComments.toString());
  });

});


