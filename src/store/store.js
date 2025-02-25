import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: persistedState
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
}); 