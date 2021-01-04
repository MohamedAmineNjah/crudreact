import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer, { IRootState } from '../affichage/index';

const defaultMiddlewares = [
  thunkMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),

];

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
  trace: true,
});
const composedMiddlewares = (middlewares: any[]) =>
  process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(...defaultMiddlewares, ...middlewares))
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
