import React from "react"
import { Form } from "react-bootstrap"
import { ListItem } from "./ListItem"
import { Todo } from "../../../../store/types"

type ListContentProps = {
  todos: Todo[]
}

export function ListContent(props: ListContentProps) {
  const { todos } = props
  const isAllDone = todos.every((todo) => todo.isDone === true)

  return (
    <>
      <Form.Check
        type="checkbox"
        label="All todos are done!"
        checked={isAllDone}
        readOnly
      />
      <hr />
      {todos.map((t) => (
        <ListItem key={t.id} todo={t} />
      ))}
    </>
  )
}

// class Index extends React.Component<MainAppProps, MainAppState> {
//   constructor(props: MainAppProps) {
//     super(props)
//     this.state = { todoTitle: "" }
//   }
//   handleTodoTitle = (todoTitle: string) => {
//     this.setState({ todoTitle })
//   }

//   handleSubmitTodo = (todo: any) => {
//     this.props.addTodo(todo)
//   }

//   render() {
//     const { todoTitle } = this.state
//     let allTodosIsDone = true

//     this.props.todos.map((t) => {
//       if (!t.isDone) {
//         allTodosIsDone = false
//       } else {
//         allTodosIsDone = true
//       }
//     })

//     return (
//       <div>
//         <Form.Check
//           type="checkbox"
//           label="all todos is done!"
//           checked={allTodosIsDone}
//         />
//         <hr />
//         <InputNewTodo
//           todoTitle={todoTitle}
//           onChange={this.handleTodoTitle}
//           onSubmit={this.handleSubmitTodo}
//         />
//         {this.props.todos.map((t, idx) => (
//           <div className={styles.todo}>
//             {t.title}
//             <UserSelect user={t.user} idx={idx} />
//             <Form.Check
//               style={{ marginTop: -8, marginLeft: 5 }}
//               type="checkbox"
//               checked={t.isDone}
//               onChange={(e) => {
//                 const changedTodos = this.props.todos.map((t, index) => {
//                   const res = { ...t }
//                   if (index == idx) {
//                     res.isDone = !t.isDone
//                   }
//                   return res
//                 })
//                 this.props.changeTodo(changedTodos)
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     )
//   }
// }

// export default connect(
//   (state) => ({}),
//   (dispatch) => ({
//     addTodo: (todo: any) => {
//       dispatch({ type: "ADD_TODO", payload: todo })
//     },
//     changeTodo: (todos: any) =>
//       dispatch({ type: "CHANGE_TODOS", payload: todos }),
//     removeTodo: (index: number) =>
//       dispatch({ type: "REMOVE_TODOS", payload: index }),
//   }),
// )(Index)
