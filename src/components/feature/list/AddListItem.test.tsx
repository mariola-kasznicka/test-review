import React from "react"
import { screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithRedux } from "../../../test-utils"
import { AddListItem } from "./AddListItem"
import { Todo } from "../../../store/types"

describe("AddListItem Component", () => {
  it("should render input field with placeholder", () => {
    renderWithRedux(<AddListItem />)
    const input = screen.getByPlaceholderText("What needs to be done?")
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("")
  })

  it("should update input value when user types", async () => {
    renderWithRedux(<AddListItem />)

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "New Todo")

    expect(input).toHaveValue("New Todo")
  })

  it("should add todo when Enter key is pressed", async () => {
    const { store } = renderWithRedux(<AddListItem />)

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "New Todo")
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      const state = store.getState()
      expect(state.list.todos).toHaveLength(1)
      expect(state.list.todos[0].title).toBe("New Todo")
      expect(state.list.todos[0].isDone).toBe(false)
    })

    expect(input).toHaveValue("")
  })

  it("should not add todo when input is empty and Enter is pressed", async () => {
    const { store } = renderWithRedux(<AddListItem />)

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "   ")
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    const state = store.getState()
    expect(state.list.todos).toHaveLength(0)
  })

  it("should not add todo when other keys are pressed", async () => {
    const { store } = renderWithRedux(<AddListItem />)

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "New Todo")

    const state = store.getState()
    expect(state.list.todos).toHaveLength(0)
  })

  it("should generate correct id for first todo", async () => {
    const { store } = renderWithRedux(<AddListItem />)

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "First Todo")
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      const state = store.getState()
      expect(state.list.todos[0].id).toBe(1)
    })
  })

  it("should generate incremental ids for multiple todos", async () => {
    const existingTodos: Todo[] = [
      { id: 1, title: "Todo 1", isDone: false },
      { id: 3, title: "Todo 3", isDone: false },
    ]

    const { store } = renderWithRedux(<AddListItem />, {
      preloadedState: {
        list: {
          todos: existingTodos,
        },
      },
    })

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "New Todo")
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      const state = store.getState()
      expect(state.list.todos).toHaveLength(3)
      expect(state.list.todos[2].id).toBe(4) // Max(1, 3) + 1 = 4
    })
  })

  it("should clear input after adding todo", async () => {
    renderWithRedux(<AddListItem />)

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "New Todo")
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      expect(input).toHaveValue("")
    })
  })

  it("should trim whitespace from todo title", async () => {
    const { store } = renderWithRedux(<AddListItem />)

    const input = screen.getByPlaceholderText("What needs to be done?")
    userEvent.type(input, "   Trimmed Todo   ")
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      const state = store.getState()
      expect(state.list.todos[0].title).toBe("Trimmed Todo")
    })
  })
})
