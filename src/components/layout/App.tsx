import React from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { List } from "../feature/list/List/List"
import styles from "./App.module.scss"

export function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <List />
      <Footer />
    </div>
  )
}
