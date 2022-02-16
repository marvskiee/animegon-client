import {
  FAILED_SEARCH_HISTORY,
  FAILED_SEARCH_RESULT,
  REQUEST_SEARCH_RESULT,
  SUCCESS_SEARCH_HISTORY,
  SUCCESS_SEARCH_RESULT,
  REQUEST_SEARCH_HISTORY,
  SET_FILTER,
  CLEAR_SEARCH,
  SUCCESS_FETCH_STORAGE,
  ACTIVE_HANDLER,
} from "./searchTypes";

const initialState = {
  active: "history",
  result: [],
  page: 1,
  loading: false,
  keyword: "",
  history: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_HANDLER: {
      return {
        ...state,
        active: action.payload,
      };
    }
    case SUCCESS_FETCH_STORAGE:
      return {
        ...state,
        history: action.payload,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        page: 1,
        keyword: "",
        result: null,
      };
    case SET_FILTER:
      return {
        ...state,
        page: action.payload["page"],
        keyword: action.payload.keyword,
      };
    case REQUEST_SEARCH_RESULT:
      return {
        ...state,
        loading: true,
      };
    case FAILED_SEARCH_RESULT:
      return {
        ...state,
        result: [],
        loading: false,
      };
    case SUCCESS_SEARCH_RESULT:
      return {
        ...state,
        result: action.payload,
        loading: false,
        active: "result",
      };
    default:
      return state;
  }
};
export default searchReducer;
