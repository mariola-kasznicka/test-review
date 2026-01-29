import React from "react"
import { useDispatch } from "react-redux"
import { Form } from "react-bootstrap"
import { Todo } from "../../../store/types"
import { changeTodo } from "../../../store/slice"
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

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((users) => setOptions(users))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value ? Number(e.target.value) : undefined
    const updatedTodo: Todo = { ...todo, user: userId }
    dispatch(changeTodo(updatedTodo))
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
