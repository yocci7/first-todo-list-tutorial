import { useState, useRef } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRaf = useRef();

  const handleAddTodo = () => {
    const name = todoNameRaf .current.value;
    if(name === "") return
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}]
    });
    todoNameRaf.current.value = null;
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type='text' ref={todoNameRaf} />
      <button onClick={handleAddTodo}>Add task</button>
      <button onClick={handleClear}>Delete Task</button>
      <div>Remaining tasks:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
