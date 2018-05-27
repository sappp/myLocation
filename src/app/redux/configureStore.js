import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'


import routerReducer from './router';
import categoriesReducer from './categories';
import locationsReducer from './locations';
import viewLocationReducer from './viewLocation';
import sortFilterReducer from './sortFilter';

export const history = createHistory()

const reducers = combineReducers({
  router: routerReducer,
  categories: categoriesReducer,
  locations: locationsReducer,
  viewLocation: viewLocationReducer,
  sortFilter: sortFilterReducer
})

const middleWare = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(history),
  logger
)

export default (initialState) => createStore(reducers, initialState, middleWare);