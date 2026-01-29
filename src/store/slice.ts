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
      state.todos = state.todos.filter((item) => item.id !== action.payload)
    },
    changeTodo(state, action: PayloadAction<Todo>) {
      const todoIndex = state.todos.findIndex(
        (item) => item.id === action.payload.id,
      )
      if (todoIndex !== -1) {
        state.todos[todoIndex] = action.payload
      }
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find((item) => item.id === action.payload)
      if (todo) {
        todo.isDone = !todo.isDone
      }
    },
  },
})

export const { addTodo, removeTodo, changeTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer
