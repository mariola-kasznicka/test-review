import React from "react"
import styles from "./Footer.module.scss"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://example.org"
        target="_blank"
        className={styles.link}
        rel="noopener noreferrer"
      >
        All rights reserved
      </a>
    </footer>
  )
}
