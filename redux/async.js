import axios from 'axios';
import { createReducer, createAction } from '@reduxjs/toolkit';

export default function asyncRedux (namespace, url, method, api) {
  const started = createAction(`ASYNC/${namespace}:STARTED`);
  const succeeded = createAction(`ASYNC/${namespace}:SUCCEEDED`);
  const failed = createAction(`ASYNC/${namespace}:FAILED`);

  return {
    action: payload => async dispatch => {
      dispatch(started(payload));
      try {
        const data = await axios[method](api + url, payload);
        dispatch(succeeded(data.data));
      } catch (error) {
        dispatch(failed(error));
      }
    },
    reducer: createReducer(
      {
        data: null,
        loading: false,
        error: false
      },
      {
        [started]: (state) => {
          state.loading = true;
          state.error = false;
          state.data = null;
        },
        [succeeded]: (state, { payload }) => {
          state.data = payload;
          state.loading = false;
          state.error = false;
        },
        [failed]: (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      }
    )
  };
}
