import { configureStore } from "@reduxjs/toolkit"
import listReducer from "./slice"
import { loadState, saveState } from "./persistence"
import { TodoState } from "./types"

type PreloadedState = {
  list?: TodoState
}

const preloadedState: PreloadedState | undefined = loadState()

export const store = configureStore({
  reducer: {
    list: listReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
