import React from 'react';
import { useState,useEffect } from 'react';
import Loader from './components/Loader';
import Todo from './components/TodoComponent';
import './App.css';

function App(){
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState([]);

  const loading = false;

interface Todo{
  id: number;
  title : string;
  completed: boolean;
}

const handleCompleted: any = (index: number) =>{
  const newTodos = [...todos];
  newTodos[index].completed = !newTodos[index].completed;
  setTodos(newTodos);
}

const handleDelete: any = (index: number) =>{
  const newTodos = [...todos];
  newTodos.splice(index,1)
  setTodos(newTodos);
}

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(res => {
        setTodos(res.slice(0,10))
      })
      .catch(err => setErrors(err))
    // return () => {
      
    // }
  }, []);

  //todos.map((todo:Todo) => console.log(todo.title))
  return (
    <div className="App">
     { todos.length > 0 ? todos.map((todo:Todo, index): any => <Todo todo={todo} index={index}  handleCompleted={handleCompleted}   handleDelete={handleDelete}/>) : (<Loader/>) }
    </div>
  );
}

export default App;
