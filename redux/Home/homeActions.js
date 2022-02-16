import {
  SUCCESS_FETCH_COLLECTION_STORAGE,
  REQUEST_FETCH_COLLECTION_STORAGE,
} from "./collectionTypes";

export const successFetchCollectionStorage = (data) => {
  return {
    type: SUCCESS_FETCH_COLLECTION_STORAGE,
    payload: data,
  };
};

export const requestFetchCollectionStorage = (data) => {
  return {
    type: REQUEST_FETCH_COLLECTION_STORAGE,
    payload: data,
  };
};
export const setCollectionMany = (data) => (dispatch) => {
  dispatch(requestFetchCollectionStorage());
  dispatch(successFetchCollectionStorage(data));
};
