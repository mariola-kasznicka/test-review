import React from "react"
import { Form } from "react-bootstrap"
import { Todo } from "../../../../store/types"
import styles from "./ListItem.module.scss"

type ListItemProps = {
  todo: Todo
}

export function ListItem(props: ListItemProps) {
  const { todo } = props

  return (
    <div className={styles.wrapper}>
      <Form.Check type="checkbox" checked={todo.isDone} onChange={() => null} />
    </div>
  )
}
