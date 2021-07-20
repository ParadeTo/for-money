import { combineReducers } from "redux";
function getRepos(state = { data: [], isFetching: true }, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isFetching: true
      };
    case "success":
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  repos: getRepos
});
export default rootReducer;
