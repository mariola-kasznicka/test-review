export type Todo = {
  id: number
  title: string
  isDone: boolean
  user?: number
}

export type TodoState = {
  todos: Todo[]
}
