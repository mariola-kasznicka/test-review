import { Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Todo } from "../../../store/types"
import { toggleTodo } from "../../../store/slice"
import { UserSelect } from "./UserSelect"
import styles from "./ListItem.module.scss"

type ListItemProps = {
  todo: Todo
}

export function ListItem(props: ListItemProps) {
  const { todo } = props
  const dispatch = useDispatch()

  const handleToggle = (todo: Todo) => {
    dispatch(toggleTodo(todo.id))
  }

  return (
    <div className={styles.wrapper}>
      <UserSelect todo={todo} />
      <Form.Check
        type="checkbox"
        checked={todo.isDone}
        onChange={() => handleToggle(todo)}
        label={todo.title}
      />
    </div>
  )
}
