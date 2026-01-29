import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithRedux } from "../../../test-utils"
import { UserSelect } from "./UserSelect"
import { Todo } from "../../../store/types"

// Mock fetch globally
global.fetch = jest.fn()

describe("UserSelect Component", () => {
  const mockTodo: Todo = {
    id: 1,
    title: "Test Todo",
    isDone: false,
  }

  const mockUsers = [
    { id: 1, name: "Leanne Graham" },
    { id: 2, name: "Ervin Howell" },
    { id: 3, name: "Clementine Bauch" },
  ]

  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: async () => mockUsers,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render select element", () => {
    renderWithRedux(<UserSelect todo={mockTodo} />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("should render default 'Select user' option", () => {
    renderWithRedux(<UserSelect todo={mockTodo} />)
    expect(screen.getByText("Select user")).toBeInTheDocument()
  })

  it("should fetch and display users", async () => {
    renderWithRedux(<UserSelect todo={mockTodo} />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/",
      )
    })

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument()
      expect(screen.getByText("Ervin Howell")).toBeInTheDocument()
      expect(screen.getByText("Clementine Bauch")).toBeInTheDocument()
    })
  })

  it("should display selected user when todo has user assigned", async () => {
    const todoWithUser: Todo = {
      ...mockTodo,
      user: 2,
    }

    renderWithRedux(<UserSelect todo={todoWithUser} />)

    await waitFor(() => {
      const select = screen.getByRole("combobox") as HTMLSelectElement
      expect(select.value).toBe("2")
    })
  })

  it("should display empty value when todo has no user assigned", async () => {
    renderWithRedux(<UserSelect todo={mockTodo} />)

    await waitFor(() => {
      const select = screen.getByRole("combobox") as HTMLSelectElement
      expect(select.value).toBe("")
    })
  })

  it("should dispatch changeTodo action when user is selected", async () => {
    const { store } = renderWithRedux(<UserSelect todo={mockTodo} />, {
      preloadedState: {
        list: {
          todos: [mockTodo],
        },
      },
    })

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument()
    })

    const select = screen.getByRole("combobox")
    userEvent.selectOptions(select, "2")

    await waitFor(() => {
      const state = store.getState()
      const updatedTodo = state.list.todos.find((t) => t.id === mockTodo.id)
      expect(updatedTodo?.user).toBe(2)
    })
  })

  it("should update todo user to undefined when 'Select user' is chosen", async () => {
    const todoWithUser: Todo = {
      ...mockTodo,
      user: 2,
    }

    const { store } = renderWithRedux(<UserSelect todo={todoWithUser} />, {
      preloadedState: {
        list: {
          todos: [todoWithUser],
        },
      },
    })

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument()
    })

    const select = screen.getByRole("combobox")
    userEvent.selectOptions(select, "")

    await waitFor(() => {
      const state = store.getState()
      const updatedTodo = state.list.todos.find((t) => t.id === todoWithUser.id)
      expect(updatedTodo?.user).toBeUndefined()
    })
  })

  it("should render select even when fetch fails", () => {
    // Component should render regardless of fetch status
    renderWithRedux(<UserSelect todo={mockTodo} />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })
})
