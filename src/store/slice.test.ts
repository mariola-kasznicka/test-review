import { configureStore } from "@reduxjs/toolkit"
import listReducer, {
  addTodo,
  changeTodo,
  toggleTodo,
  removeTodo,
} from "./slice"
import { Todo } from "./types"

// Helper function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      list: listReducer,
    },
  })
}

describe("Todo Redux Integration Tests", () => {
  describe("Adding todos", () => {
    it("should add a new todo to an empty list", () => {
      const store = createTestStore()
      const newTodo: Todo = {
        id: 1,
        title: "Test todo",
        isDone: false,
      }

      store.dispatch(addTodo(newTodo))

      const state = store.getState()
      expect(state.list.todos).toHaveLength(1)
      expect(state.list.todos[0]).toEqual(newTodo)
    })

    it("should add multiple todos to the list", () => {
      const store = createTestStore()
      const todo1: Todo = {
        id: 1,
        title: "First todo",
        isDone: false,
      }
      const todo2: Todo = {
        id: 2,
        title: "Second todo",
        isDone: true,
      }
      const todo3: Todo = {
        id: 3,
        title: "Third todo",
        isDone: false,
        user: 5,
      }

      store.dispatch(addTodo(todo1))
      store.dispatch(addTodo(todo2))
      store.dispatch(addTodo(todo3))

      const state = store.getState()
      expect(state.list.todos).toHaveLength(3)
      expect(state.list.todos[0]).toEqual(todo1)
      expect(state.list.todos[1]).toEqual(todo2)
      expect(state.list.todos[2]).toEqual(todo3)
    })

    it("should add todo with user assignment", () => {
      const store = createTestStore()
      const todoWithUser: Todo = {
        id: 1,
        title: "Todo with user",
        isDone: false,
        user: 10,
      }

      store.dispatch(addTodo(todoWithUser))

      const state = store.getState()
      expect(state.list.todos[0].user).toBe(10)
    })
  })

  describe("Changing todos", () => {
    it("should update an existing todo", () => {
      const store = createTestStore()
      const initialTodo: Todo = {
        id: 1,
        title: "Original title",
        isDone: false,
      }

      store.dispatch(addTodo(initialTodo))

      const updatedTodo: Todo = {
        id: 1,
        title: "Updated title",
        isDone: false,
      }

      store.dispatch(changeTodo(updatedTodo))

      const state = store.getState()
      expect(state.list.todos).toHaveLength(1)
      expect(state.list.todos[0].title).toBe("Updated title")
      expect(state.list.todos[0].id).toBe(1)
    })

    it("should update todo user assignment", () => {
      const store = createTestStore()
      const todo: Todo = {
        id: 1,
        title: "Test todo",
        isDone: false,
      }

      store.dispatch(addTodo(todo))

      const updatedTodo: Todo = {
        ...todo,
        user: 7,
      }

      store.dispatch(changeTodo(updatedTodo))

      const state = store.getState()
      expect(state.list.todos[0].user).toBe(7)
    })

    it("should update only the specified todo when multiple todos exist", () => {
      const store = createTestStore()
      const todo1: Todo = { id: 1, title: "Todo 1", isDone: false }
      const todo2: Todo = { id: 2, title: "Todo 2", isDone: false }
      const todo3: Todo = { id: 3, title: "Todo 3", isDone: false }

      store.dispatch(addTodo(todo1))
      store.dispatch(addTodo(todo2))
      store.dispatch(addTodo(todo3))

      const updatedTodo2: Todo = {
        id: 2,
        title: "Updated Todo 2",
        isDone: true,
      }

      store.dispatch(changeTodo(updatedTodo2))

      const state = store.getState()
      expect(state.list.todos).toHaveLength(3)
      expect(state.list.todos[0]).toEqual(todo1)
      expect(state.list.todos[1]).toEqual(updatedTodo2)
      expect(state.list.todos[2]).toEqual(todo3)
    })

    it("should not update anything if todo id does not exist", () => {
      const store = createTestStore()
      const todo: Todo = { id: 1, title: "Todo 1", isDone: false }

      store.dispatch(addTodo(todo))

      const nonExistentTodo: Todo = {
        id: 999,
        title: "Non-existent",
        isDone: true,
      }

      store.dispatch(changeTodo(nonExistentTodo))

      const state = store.getState()
      expect(state.list.todos).toHaveLength(1)
      expect(state.list.todos[0]).toEqual(todo)
    })
  })

  describe("Toggling todos", () => {
    it("should toggle todo from false to true", () => {
      const store = createTestStore()
      const todo: Todo = {
        id: 1,
        title: "Test todo",
        isDone: false,
      }

      store.dispatch(addTodo(todo))
      store.dispatch(toggleTodo(1))

      const state = store.getState()
      expect(state.list.todos[0].isDone).toBe(true)
    })

    it("should toggle todo from true to false", () => {
      const store = createTestStore()
      const todo: Todo = {
        id: 1,
        title: "Test todo",
        isDone: true,
      }

      store.dispatch(addTodo(todo))
      store.dispatch(toggleTodo(1))

      const state = store.getState()
      expect(state.list.todos[0].isDone).toBe(false)
    })

    it("should toggle only the specified todo when multiple todos exist", () => {
      const store = createTestStore()
      const todo1: Todo = { id: 1, title: "Todo 1", isDone: false }
      const todo2: Todo = { id: 2, title: "Todo 2", isDone: false }
      const todo3: Todo = { id: 3, title: "Todo 3", isDone: true }

      store.dispatch(addTodo(todo1))
      store.dispatch(addTodo(todo2))
      store.dispatch(addTodo(todo3))

      store.dispatch(toggleTodo(2))

      const state = store.getState()
      expect(state.list.todos[0].isDone).toBe(false)
      expect(state.list.todos[1].isDone).toBe(true)
      expect(state.list.todos[2].isDone).toBe(true)
    })

    it("should not affect state if todo id does not exist", () => {
      const store = createTestStore()
      const todo: Todo = { id: 1, title: "Todo 1", isDone: false }

      store.dispatch(addTodo(todo))
      const initialState = store.getState()

      store.dispatch(toggleTodo(999))

      const state = store.getState()
      expect(state.list.todos).toEqual(initialState.list.todos)
      expect(state.list.todos[0].isDone).toBe(false)
    })

    it("should handle multiple toggle operations on the same todo", () => {
      const store = createTestStore()
      const todo: Todo = { id: 1, title: "Test todo", isDone: false }

      store.dispatch(addTodo(todo))
      store.dispatch(toggleTodo(1))
      store.dispatch(toggleTodo(1))
      store.dispatch(toggleTodo(1))

      const state = store.getState()
      expect(state.list.todos[0].isDone).toBe(true)
    })
  })

  describe("Removing todos", () => {
    it("should remove a todo by id", () => {
      const store = createTestStore()
      const todo1: Todo = { id: 1, title: "Todo 1", isDone: false }
      const todo2: Todo = { id: 2, title: "Todo 2", isDone: false }

      store.dispatch(addTodo(todo1))
      store.dispatch(addTodo(todo2))
      store.dispatch(removeTodo(1))

      const state = store.getState()
      expect(state.list.todos).toHaveLength(1)
      expect(state.list.todos[0].id).toBe(2)
    })

    it("should not remove anything if todo id does not exist", () => {
      const store = createTestStore()
      const todo: Todo = { id: 1, title: "Todo 1", isDone: false }

      store.dispatch(addTodo(todo))
      store.dispatch(removeTodo(999))

      const state = store.getState()
      expect(state.list.todos).toHaveLength(1)
      expect(state.list.todos[0].id).toBe(1)
    })
  })

  describe("Combined operations", () => {
    it("should handle adding, changing, and toggling todos in sequence", () => {
      const store = createTestStore()

      // Add todos
      const todo1: Todo = { id: 1, title: "Todo 1", isDone: false }
      const todo2: Todo = { id: 2, title: "Todo 2", isDone: false }
      store.dispatch(addTodo(todo1))
      store.dispatch(addTodo(todo2))

      // Change todo1
      const updatedTodo1: Todo = {
        id: 1,
        title: "Updated Todo 1",
        isDone: false,
      }
      store.dispatch(changeTodo(updatedTodo1))

      // Toggle todo2
      store.dispatch(toggleTodo(2))

      // Verify final state
      const state = store.getState()
      expect(state.list.todos).toHaveLength(2)
      expect(state.list.todos[0].title).toBe("Updated Todo 1")
      expect(state.list.todos[0].isDone).toBe(false)
      expect(state.list.todos[1].title).toBe("Todo 2")
      expect(state.list.todos[1].isDone).toBe(true)
    })

    it("should handle complex workflow: add -> toggle -> change -> toggle", () => {
      const store = createTestStore()

      // Add todo
      const todo: Todo = { id: 1, title: "Initial", isDone: false }
      store.dispatch(addTodo(todo))

      // Toggle to true
      store.dispatch(toggleTodo(1))
      expect(store.getState().list.todos[0].isDone).toBe(true)

      // Change title and user
      const updatedTodo: Todo = {
        id: 1,
        title: "Updated",
        isDone: true,
        user: 5,
      }
      store.dispatch(changeTodo(updatedTodo))
      expect(store.getState().list.todos[0].title).toBe("Updated")
      expect(store.getState().list.todos[0].user).toBe(5)

      // Toggle back to false
      store.dispatch(toggleTodo(1))
      const finalState = store.getState()
      expect(finalState.list.todos[0].isDone).toBe(false)
      expect(finalState.list.todos[0].title).toBe("Updated")
      expect(finalState.list.todos[0].user).toBe(5)
    })
  })
})
