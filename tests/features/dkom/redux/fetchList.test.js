import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DKOM_FETCH_LIST_BEGIN,
  DKOM_FETCH_LIST_SUCCESS,
  DKOM_FETCH_LIST_FAILURE,
  DKOM_FETCH_LIST_DISMISS_ERROR,
} from '../../../../src/features/dkom/redux/constants';

import {
  fetchList,
  dismissFetchListError,
  reducer,
} from '../../../../src/features/dkom/redux/fetchList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('dkom/redux/fetchList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DKOM_FETCH_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', DKOM_FETCH_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DKOM_FETCH_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', DKOM_FETCH_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchListError', () => {
    const expectedAction = {
      type: DKOM_FETCH_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchListError()).toEqual(expectedAction);
  });

  it('handles action type DKOM_FETCH_LIST_BEGIN correctly', () => {
    const prevState = { fetchListPending: false };
    const state = reducer(
      prevState,
      { type: DKOM_FETCH_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchListPending).toBe(true);
  });

  it('handles action type DKOM_FETCH_LIST_SUCCESS correctly', () => {
    const prevState = { fetchListPending: true };
    const state = reducer(
      prevState,
      { type: DKOM_FETCH_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchListPending).toBe(false);
  });

  it('handles action type DKOM_FETCH_LIST_FAILURE correctly', () => {
    const prevState = { fetchListPending: true };
    const state = reducer(
      prevState,
      { type: DKOM_FETCH_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchListPending).toBe(false);
    expect(state.fetchListError).toEqual(expect.anything());
  });

  it('handles action type DKOM_FETCH_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DKOM_FETCH_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchListError).toBe(null);
  });
});

