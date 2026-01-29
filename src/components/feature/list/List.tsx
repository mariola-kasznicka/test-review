import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { EmptyList } from "./EmptyList"
import { AddListItem } from "./AddListItem"
import { ListContent } from "./ListContent"
import styles from "./List.module.scss"

export function List() {
  const todos = useSelector((state: RootState) => state.list.todos)
  const isEmpty = todos.length === 0

  return (
    <div className={styles.wrapper}>
      <AddListItem />
      {isEmpty ? <EmptyList /> : <ListContent todos={todos} />}
    </div>
  )
}
