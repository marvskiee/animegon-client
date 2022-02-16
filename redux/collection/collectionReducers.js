import {
  SUCCESS_FETCH_COLLECTION_STORAGE,
  REQUEST_FETCH_COLLECTION_STORAGE,
} from "./collectionTypes";

const initialState = {
  collections: [],
  loading: false,
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FETCH_COLLECTION_STORAGE:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_FETCH_COLLECTION_STORAGE:
      return {
        ...state,
        loading: false,
        collections: action.payload,
      };

    default:
      return state;
  }
};
export default collectionReducer;
