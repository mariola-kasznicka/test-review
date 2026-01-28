import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { EmptyList } from "./EmptyList"
import { ListContent } from "./ListContent"

export function List() {
  const todos = useSelector((state: RootState) => state.list.todos)
  const isEmpty = todos.length === 0

  return <>{isEmpty ? <EmptyList /> : <ListContent todos={todos} />}</>
}
