import { combineReducers } from "redux";
import searchReducer from "./search/searchReducers";
import collectionReducer from "./collection/collectionReducers";

const rootReducer = combineReducers({
  search: searchReducer,
  collection: collectionReducer,
});

export default rootReducer;
