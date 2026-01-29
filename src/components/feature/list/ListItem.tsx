import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Todo } from "../../../store/types"
import { changeTodos } from "../../../store/slice"
import { RootState } from "../../../store/store"
import { UserSelect } from "./UserSelect"
import styles from "./ListItem.module.scss"

type ListItemProps = {
  todo: Todo
}

export function ListItem(props: ListItemProps) {
  const { todo } = props
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.list.todos)

  const handleToggle = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isDone: !t.isDone } : t,
    )
    dispatch(changeTodos(updatedTodos))
  }

  return (
    <div className={styles.wrapper}>
      <UserSelect todo={todo} />
      <Form.Check
        type="checkbox"
        checked={todo.isDone}
        onChange={handleToggle}
        label={todo.title}
      />
    </div>
  )
}
