import React from "react"
import { screen } from "@testing-library/react"
import { renderWithRedux } from "../../../test-utils"
import { ListContent } from "./ListContent"
import { Todo } from "../../../store/types"

// Mock ListItem component
jest.mock("./ListItem", () => ({
  ListItem: ({ todo }: { todo: Todo }) => (
    <div data-testid={`todo-item-${todo.id}`}>{todo.title}</div>
  ),
}))

describe("ListContent Component", () => {
  it("should render 'All todos are done!' checkbox", () => {
    const todos: Todo[] = []
    renderWithRedux(<ListContent todos={todos} />)
    expect(screen.getByText("All todos are done!")).toBeInTheDocument()
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("should check 'All todos are done!' when all todos are done", () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo 1", isDone: true },
      { id: 2, title: "Todo 2", isDone: true },
      { id: 3, title: "Todo 3", isDone: true },
    ]
    renderWithRedux(<ListContent todos={todos} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeChecked()
  })

  it("should not check 'All todos are done!' when some todos are not done", () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo 1", isDone: true },
      { id: 2, title: "Todo 2", isDone: false },
      { id: 3, title: "Todo 3", isDone: true },
    ]
    renderWithRedux(<ListContent todos={todos} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()
  })

  it("should not check 'All todos are done!' when no todos are done", () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo 1", isDone: false },
      { id: 2, title: "Todo 2", isDone: false },
    ]
    renderWithRedux(<ListContent todos={todos} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()
  })

  it("should render ListItem for each todo", () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo 1", isDone: false },
      { id: 2, title: "Todo 2", isDone: false },
      { id: 3, title: "Todo 3", isDone: false },
    ]
    renderWithRedux(<ListContent todos={todos} />)

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument()
    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument()
    expect(screen.getByTestId("todo-item-3")).toBeInTheDocument()
  })

  it("should render empty list without errors", () => {
    const todos: Todo[] = []
    renderWithRedux(<ListContent todos={todos} />)
    expect(screen.getByText("All todos are done!")).toBeInTheDocument()
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
    expect(screen.queryByTestId(/todo-item-/)).not.toBeInTheDocument()
  })

  it("should render todos with user assignments", () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo 1", isDone: false, user: 5 },
      { id: 2, title: "Todo 2", isDone: true, user: 10 },
    ]
    renderWithRedux(<ListContent todos={todos} />)

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument()
    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument()
  })
})
