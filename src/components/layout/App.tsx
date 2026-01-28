import React from "react"
import styles from "./App.module.scss"
import MainApp from "../MainApp/MainApp"
import { useSelector } from "react-redux"
import { Header } from "./Header"
import { Footer } from "./Footer"

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
