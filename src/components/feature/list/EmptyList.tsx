import styles from "./EmptyList.module.scss"

export function EmptyList() {
  return (
    <div className={styles.wrapper}>
      <p>Sorry, the list is empty</p>
    </div>
  )
}
