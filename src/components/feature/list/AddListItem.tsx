import { useState, KeyboardEvent, ChangeEvent } from "react"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addTodo } from "../../../store/slice"
import { RootState } from "../../../store/store"
import { Todo } from "../../../store/types"

export function AddListItem() {
  const [value, setValue] = useState<string>("")
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.list.todos)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()
    const val = value.trim()

    if (!val) {
      return
    }

    const nextId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1

    const newTodo: Todo = {
      id: nextId,
      title: val,
      isDone: false,
    }

    dispatch(addTodo(newTodo))
    setValue("")
  }

  return (
    <>
      <Form.Control
        value={value}
        type="text"
        placeholder="What needs to be done?"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}
