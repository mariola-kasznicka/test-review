import { TodoState } from "./types"

const STORAGE_KEY = "redux-todo-state"

type PersistedState = {
  list: TodoState
}

export const loadState = (): Partial<PersistedState> | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return undefined
  }
}

export const saveState = (state: PersistedState): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (err) {
    console.error("Error saving state to localStorage:", err)
  }
}
