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
      <h1 className='title'>First Todo List tutorial</h1>
      <div className='main'>
        <input className='addInput' type='text' ref={todoNameRaf} />
        <button className='addTask' onClick={handleAddTodo}>Add task</button>
        <button className='delTask' onClick={handleClear}>Delete Task</button>
        <p className='remainingTask'>Remaining tasks:{todos.filter((todo) => !todo.completed).length}</p>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
}

export default App;
