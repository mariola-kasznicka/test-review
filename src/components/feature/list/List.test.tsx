import React from "react"
import { screen } from "@testing-library/react"
import { renderWithRedux } from "../../../test-utils"
import { List } from "./List"
import { Todo } from "../../../store/types"

// Mock child components
jest.mock("./AddListItem", () => ({
  AddListItem: () => <div data-testid="add-list-item">AddListItem</div>,
}))

jest.mock("./EmptyList", () => ({
  EmptyList: () => <div data-testid="empty-list">EmptyList</div>,
}))

jest.mock("./ListContent", () => ({
  ListContent: ({ todos }: { todos: Todo[] }) => (
    <div data-testid="list-content">
      ListContent with {todos.length} todos
    </div>
  ),
}))

describe("List Component", () => {
  it("should render AddListItem component", () => {
    renderWithRedux(<List />)
    expect(screen.getByTestId("add-list-item")).toBeInTheDocument()
  })

  it("should render EmptyList when todos array is empty", () => {
    renderWithRedux(<List />, {
      preloadedState: {
        list: {
          todos: [],
        },
      },
    })

    expect(screen.getByTestId("empty-list")).toBeInTheDocument()
    expect(screen.queryByTestId("list-content")).not.toBeInTheDocument()
  })

  it("should render ListContent when todos array has items", () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo 1", isDone: false },
      { id: 2, title: "Todo 2", isDone: false },
    ]

    renderWithRedux(<List />, {
      preloadedState: {
        list: {
          todos,
        },
      },
    })

    expect(screen.getByTestId("list-content")).toBeInTheDocument()
    expect(screen.getByText("ListContent with 2 todos")).toBeInTheDocument()
    expect(screen.queryByTestId("empty-list")).not.toBeInTheDocument()
  })

  it("should switch from EmptyList to ListContent when todos are added", () => {
    const { store } = renderWithRedux(<List />, {
      preloadedState: {
        list: {
          todos: [],
        },
      },
    })

    expect(screen.getByTestId("empty-list")).toBeInTheDocument()

    // Add a todo
    store.dispatch({
      type: "list/addTodo",
      payload: { id: 1, title: "New Todo", isDone: false },
    })

    expect(screen.getByTestId("list-content")).toBeInTheDocument()
    expect(screen.queryByTestId("empty-list")).not.toBeInTheDocument()
  })

  it("should switch from ListContent to EmptyList when all todos are removed", () => {
    const todos: Todo[] = [{ id: 1, title: "Todo 1", isDone: false }]

    const { store } = renderWithRedux(<List />, {
      preloadedState: {
        list: {
          todos,
        },
      },
    })

    expect(screen.getByTestId("list-content")).toBeInTheDocument()

    // Remove the todo
    store.dispatch({
      type: "list/removeTodo",
      payload: 1,
    })

    expect(screen.getByTestId("empty-list")).toBeInTheDocument()
    expect(screen.queryByTestId("list-content")).not.toBeInTheDocument()
  })
})
