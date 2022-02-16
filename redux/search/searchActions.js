import {
  FAILED_SEARCH_HISTORY,
  FAILED_SEARCH_RESULT,
  REQUEST_SEARCH_RESULT,
  SUCCESS_SEARCH_HISTORY,
  SUCCESS_SEARCH_RESULT,
  REQUEST_SEARCH_HISTORY,
  SET_FILTER,
  SUCCESS_FETCH_STORAGE,
  ACTIVE_HANDLER,
} from "./searchTypes";
import config from "../../config/axios_config";

export const requestSearchHistory = () => {
  return {
    type: REQUEST_SEARCH_HISTORY,
  };
};
export const failedSearchHistory = () => {
  return {
    type: FAILED_SEARCH_HISTORY,
  };
};
export const successSearchHisory = (data) => {
  return {
    type: SUCCESS_SEARCH_HISTORY,
    payload: data,
  };
};

export const requestSearchResult = () => {
  return {
    type: REQUEST_SEARCH_RESULT,
  };
};
export const failedSearchResult = () => {
  return {
    type: FAILED_SEARCH_RESULT,
  };
};
export const successSearchResult = (data) => {
  return {
    type: SUCCESS_SEARCH_RESULT,
    payload: data,
  };
};

export const setFilter = (data) => {
  return {
    type: SET_FILTER,
    payload: data,
  };
};
export const successFetchStorage = (data) => {
  return {
    type: SUCCESS_FETCH_STORAGE,
    payload: data,
  };
};

export const setHistoryMany = (data) => (dispatch, getState) => {
  dispatch(successFetchStorage(data));
};

export const setHistoryOne = (data) => (dispatch, getState) => {
  let prevHistory = getState().search.history;
  if (prevHistory.length >= 5) {
    prevHistory.pop();
  }
  prevHistory.unshift(data);
  dispatch(successFetchStorage(prevHistory));
};
export const activeHandler = (data) => {
  return {
    type: ACTIVE_HANDLER,
    payload: data,
  };
};
export const searchResult = (text, page) => (dispatch) => {
  dispatch(requestSearchResult());
  config
    .get(`/search/${text}/${page}`)
    .then((res) => {
      dispatch(setFilter({ keyword: text, page }));
      dispatch(successSearchResult(res.data));
    })
    .catch((err) => dispatch(failedSearchResult()));
};
