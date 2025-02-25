import { createSlice } from '@reduxjs/toolkit';

// Load todos from localStorage
const loadTodosFromStorage = () => {
  try {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : { items: [] };
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return { items: [] };
  }
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: loadTodosFromStorage(),
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        text: action.payload,
        completed: false
      });
      // Save to localStorage
      localStorage.setItem('todos', JSON.stringify(state));
    },
    toggleComplete: (state, action) => {
      const todo = state.items[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
        // Save to localStorage
        localStorage.setItem('todos', JSON.stringify(state));
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
      // Save to localStorage
      localStorage.setItem('todos', JSON.stringify(state));
    }
  }
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer; 