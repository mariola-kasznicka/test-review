import React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import listReducer from "./store/slice"
import { TodoState } from "./store/types"

type PreloadedState = {
  list?: TodoState
}

const createTestStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: {
      list: listReducer,
    },
    preloadedState,
  })
}

type CustomRenderOptions = Omit<RenderOptions, "wrapper"> & {
  preloadedState?: PreloadedState
  store?: ReturnType<typeof createTestStore>
}

export const renderWithRedux = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from "@testing-library/react"
export { renderWithRedux as render }
