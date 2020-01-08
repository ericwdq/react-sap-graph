import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DKOM_FETCH_LIST_BEGIN,
  DKOM_FETCH_LIST_SUCCESS,
  DKOM_FETCH_LIST_FAILURE,
  DKOM_FETCH_LIST_DISMISS_ERROR,
} from './constants';

export function fetchList(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: DKOM_FETCH_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios({
        url: 'https://api.graph.sap/b1/Products',
        method: 'get',
        // withCredentials: true,
        timeout: 900000,
        // data: {
        //   query,
        // },
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkZW1vLmFwaS5ncmFwaC5zYXAiLCJzdWIiOiJkZW1vQGdyYXBoLnNhcCIsImF1ZCI6ImRlbW8uYXBpLmdyYXBoLnNhcCIsImlhdCI6MTU2MzgwMjEyMCwiZXhwIjo0Njg4MDA0NTIwLCJqdGkiOiI5OGMxM2E4MC0xNTQwLTQ3MDUtODg3MC0wYzM1NmQ2MjE0MDMifQ.JohYTPz1_CX0Q79ubkqyIC8NNOZF9cPSS0G89TUKQiDs0P407H6L0rlS6bijOkzek1h7JWno0jOBGoUQSAmSR0WX2abCwh26T3np2UxBkOx6ROkm_mpr-MtsGyOXM_9JPuZYv1nOnuuBYIOg-0zduO5ePuyWN29iEpmaCw1I6XxDp1_hzFAjS8GcKOmV8ilTrPTy_2UFc39qRLnur_bKtQb8-NleYHcv9uXChK3WEvEx7-NbCofKdkf_VVzuKpsDzzn2CvG2pKo3fFU_FLV56PA2D5kiprRz8FJyEUjslWPZCht0awQMRs7ml_e-srP3XykuXWMBBBV15yHNP8HdVA',
          Landscape: 'Development',
        },
      });
      doRequest.then(
        res => {
          dispatch({
            type: DKOM_FETCH_LIST_SUCCESS,
            data: res.value,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: DKOM_FETCH_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchListError() {
  return {
    type: DKOM_FETCH_LIST_DISMISS_ERROR,
  };
}

export function useFetchList(params) {
  const dispatch = useDispatch();

  const { fetchListPending, fetchListError } = useSelector(
    state => ({
      list: state.dkom.list,
      fetchListPending: state.dkom.fetchListPending,
      fetchListError: state.dkom.fetchListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(fetchList(...args));
    },
    [dispatch],
  );

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchListError());
  }, [dispatch]);

  return {
    fetchList: boundAction,
    fetchListPending,
    fetchListError,
    dismissFetchListError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DKOM_FETCH_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchListPending: true,
        fetchListError: null,
      };

    case DKOM_FETCH_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        list: action.data,
        fetchListPending: false,
        fetchListError: null,
      };

    case DKOM_FETCH_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchListPending: false,
        fetchListError: action.data.error,
      };

    case DKOM_FETCH_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchListError: null,
      };

    default:
      return state;
  }
}
