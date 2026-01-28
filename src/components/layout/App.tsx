import React from "react"
import { useSelector } from "react-redux"
import { Header } from "./Header"
import { Footer } from "./Footer"
import MainApp from "../feature/list/MainApp/MainApp"
import styles from "./App.module.scss"

export function App() {
  const todos = useSelector(
    (state: { list: { todos: any[] } }) => state.list.todos,
  )
  return (
    <div className={styles.wrapper}>
      <Header />
      <MainApp todos={todos} />
      <Footer />
    </div>
  )
}
