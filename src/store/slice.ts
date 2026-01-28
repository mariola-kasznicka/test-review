import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Todo, TodoState } from "./types"

const initialState: TodoState = {
  todos: [],
}

const todoSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload)
    },
    removeTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((_, idx) => idx !== action.payload)
    },
    changeTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos[action.payload]
      if (todo) {
        todo.isDone = !todo.isDone
      }
    },
  },
})

export const { addTodo, removeTodo, changeTodos, toggleTodo } =
  todoSlice.actions

export default todoSlice.reducer
