import { combineReducers, configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { LOGIN, unsplashReducer } from '../features/user/userSlice';
import { loginSaga } from '../features/user/userSaga';

export const rootReducer = combineReducers({
  [LOGIN]: unsplashReducer,
});

const sagaMiddleware = createSagaMiddleware();
export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<void>, void, unknown>>, void, unknown> {
  yield all([loginSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
