import { useEffect, useState } from 'react'
import './App.css'

// 1. create a settodos array where we will store everything
// 2. create a todo where we will make it so that the input value changes when something is typed
// 3 we need to add a form, with an input and a button

//4 on submit to form  8:00
//5 make sure it doesn't refrest on submit
//6 create the function it makes an object needs to have a unique id, the todo and completed value of false
// 7. make it so that set todos has the previous value plus the new todo 
// 8. make it so that the todo value resets
// 9. map tru the todos array make it appear in the page

//10. make the key error go away
//11. make a button next to the todo we just made on click delete the todo
// 12 create the delete todo funtion make update the state to not include the todo we clicked

// 13 

function App() {
const [todo, setTodo] = useState('')
const [todos, setTodos] = useState([])
const [todoEditing, setTodoEditing] = useState(null)
const [editingText, setEditingText] = useState('')

// use effect the funtion will run once when the page is loaded. if we pass a state or a props variable in the array 
// then it will run every time the variable or state changes
useEffect(()=>{
 const temp = localStorage.getItem('todos')
 const loadedTodos = JSON.parse(temp)

 if(loadedTodos){
  setTodos(loadedTodos)
 }
 
},[])

useEffect(() => {

  const temp = JSON.stringify(todos)
localStorage.setItem('todos', temp)
},[todos])


function handleSubmit(e){
  e.preventDefault()

  const newtodo = {
    id: new Date().getTime(),
    text: todo,
    completed: false
  }

  setTodos([...todos].concat(newtodo))
  setTodo('')
}
function deleteTodo(id){
const updatedTodos = [...todos].filter((todo) => todo.id !== id )

setTodos(updatedTodos)

}

function editTodo (id){
  const updatedTodoss = [...todos].map((todo)=>{
    if(todo.id ===  id){
      todo.text = editingText
    }
    return todo
  })
  setTodos(updatedTodoss)
  setTodoEditing(null)
  setEditingText('')
}

function toggleComplete(id){
const updatedTodos = [...todos].map((todo)=>{
  if(todo.id === id){
    todo.completed = !todo.completed
  } 
  return todo
})
setTodos(updatedTodos)

}
  return (
    <div className="App">
   <form onSubmit={handleSubmit} >
  <input type="text" onChange={(e)=> setTodo(e.target.value) } value={todo} />
<button type='submit'>add todo</button>

   </form>
<div>
  {todos.map((todo)=> <div key={todo.id} > 
    {todoEditing == todo.id ? (<input type='text' onChange={(e)=>setEditingText(e.target.value)} value={editingText} />):(<div>{todo.text} </div>)}
  
    <button onClick={()=> deleteTodo(todo.id)} >delete</button>
    <input type="checkbox" onChange={() => toggleComplete(todo.id)} checked= {todo.completed} />

    {todoEditing === todo.id ? (<button onClick={() => editTodo(todo.id)} >submit edits</button>): (<button onClick={()=> setTodoEditing(todo.id)} >Edit Todo</button>)}

   
    </div> )}
</div>
    </div>
  )
}

export default App
