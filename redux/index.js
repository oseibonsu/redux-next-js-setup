import { configureStore } from '@reduxjs/toolkit';
import asyncRedux from './async';

const employees = asyncRedux('EMPLOYEES', 'employees', 'get', 'https://dummy.restapiexample.com/api/v1/');

const options = {
    reducer: {
        employees: employees.reducer
    }
};

const store = configureStore(options);
export default store;

export const Actions = {
    getEmployees: employees.action
  };
  