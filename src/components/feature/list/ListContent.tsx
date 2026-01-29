import { Form } from "react-bootstrap"
import { ListItem } from "./ListItem"
import { Todo } from "../../../store/types"
import styles from "./ListContent.module.scss"

type ListContentProps = {
  todos: Todo[]
}

export function ListContent(props: ListContentProps) {
  const { todos } = props
  const isAllDone = todos.every((todo) => todo.isDone === true)

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkbox}>
        <Form.Check
          type="checkbox"
          label="All todos are done!"
          checked={isAllDone}
          readOnly
        />
      </div>
      <hr />
      {todos.map((t) => (
        <ListItem key={t.id} todo={t} />
      ))}
    </div>
  )
}
