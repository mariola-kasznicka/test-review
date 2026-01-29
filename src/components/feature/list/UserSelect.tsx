import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import { Todo } from "../../../store/types"
import { changeTodos } from "../../../store/slice"
import { RootState } from "../../../store/store"
import styles from "./UserSelect.module.scss"

type UserSelectProps = {
  todo: Todo
}

export function UserSelect(props: UserSelectProps) {
  const [options, setOptions] = React.useState<
    Array<{ id: number; name: string }>
  >([])
  const { todo } = props

  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.list.todos)

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((users) => setOptions(users))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value ? Number(e.target.value) : undefined
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, user: userId } : t,
    )
    dispatch(changeTodos(updatedTodos))
  }

  return (
    <div className={styles.wrapper}>
      <Form.Select
        name="user"
        aria-label="user"
        value={todo.user || ""}
        onChange={handleChange}
      >
        <option value="">Select user</option>
        {options.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Form.Select>
    </div>
  )
}
