import React from "react"
import logo from "../../logo.svg"
import styles from "./Header.module.scss"

export function Header() {
  return (
    <header className={styles.header}>
      <h1>TODO list with users:</h1>
      <img src={logo} className={styles.logo} alt="logo" />
    </header>
  )
}
