import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithRedux } from "../../../test-utils"
import { ListItem } from "./ListItem"
import { Todo } from "../../../store/types"
import { toggleTodo } from "../../../store/slice"

// Mock UserSelect component
jest.mock("./UserSelect", () => ({
  UserSelect: ({ todo }: { todo: Todo }) => (
    <div data-testid="user-select">UserSelect for todo {todo.id}</div>
  ),
}))

describe("ListItem Component", () => {
  const mockTodo: Todo = {
    id: 1,
    title: "Test Todo",
    isDone: false,
  }

  it("should render todo title", () => {
    renderWithRedux(<ListItem todo={mockTodo} />)
    expect(screen.getByText("Test Todo")).toBeInTheDocument()
  })

  it("should render checkbox with correct checked state", () => {
    renderWithRedux(<ListItem todo={mockTodo} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()
  })

  it("should render checkbox as checked when todo is done", () => {
    const doneTodo: Todo = { ...mockTodo, isDone: true }
    renderWithRedux(<ListItem todo={doneTodo} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeChecked()
  })

  it("should render UserSelect component", () => {
    renderWithRedux(<ListItem todo={mockTodo} />)
    expect(screen.getByTestId("user-select")).toBeInTheDocument()
  })

  it("should dispatch toggleTodo action when checkbox is clicked", async () => {
    const { store } = renderWithRedux(<ListItem todo={mockTodo} />, {
      preloadedState: {
        list: {
          todos: [mockTodo],
        },
      },
    })

    const checkbox = screen.getByRole("checkbox")
    userEvent.click(checkbox)

    await waitFor(() => {
      const state = store.getState()
      const todo = state.list.todos.find((t) => t.id === mockTodo.id)
      expect(todo?.isDone).toBe(true)
    })
  })

  it("should toggle todo from done to not done", async () => {
    const doneTodo: Todo = { ...mockTodo, isDone: true }
    const { store } = renderWithRedux(<ListItem todo={doneTodo} />, {
      preloadedState: {
        list: {
          todos: [doneTodo],
        },
      },
    })

    const checkbox = screen.getByRole("checkbox")
    userEvent.click(checkbox)

    await waitFor(() => {
      const state = store.getState()
      const todo = state.list.todos.find((t) => t.id === doneTodo.id)
      expect(todo?.isDone).toBe(false)
    })
  })

  it("should render todo with user assignment", () => {
    const todoWithUser: Todo = {
      ...mockTodo,
      user: 5,
    }
    renderWithRedux(<ListItem todo={todoWithUser} />)
    expect(screen.getByTestId("user-select")).toBeInTheDocument()
  })
})
