import { fork, take, select, put, call, ForkEffect } from 'redux-saga/effects';
import * as Api from '../../api';
import { loginActions, userState } from './userSlice';

function* loginWorkflow() {
  while (true) {
    const auth = yield select((state: userState) => state.isLoggedIn);
    let waitLogin = !auth;

    while (waitLogin) {
      try {
        const {
          payload: { email, password },
        } = yield take(loginActions.requestLogin);

        // console.log('authenticationWorkflow: ', username, password);
        const result = yield call(Api.requestLogin, email, password);
        console.log('authenticationWorkflow: ', result);

        waitLogin = false;
      } catch (e) {
        if (e instanceof Api.ApiError) {
          // yield put(Actions.addNotification({ type: 'error', msg: e.errorMessage }));
          console.error(e);
        } else {
          console.error(e);
        }
      }
    }
  }
}

function* authWorkflow() {
  while (true) {
    try {
      yield take(loginActions.requestMe);
      const userInfo = yield call(Api.me);
      console.log('authWorkflow', userInfo);

      yield put(loginActions.successMe({ ...userInfo }));
    } catch (e) {
      if (e instanceof Api.ApiError) {
        // yield put(Actions.addNotification({ type: 'error', msg: e.errorMessage }));
        console.error(e);
      } else {
        console.error(e);
      }
    }
  }
}

export function* loginSaga(): Generator<ForkEffect<void>, void, unknown> {
  yield fork(loginWorkflow);
  yield fork(authWorkflow);
}
