import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
const loggerMiddleware = createLogger();
export function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  return store;
}
