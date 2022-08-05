import s from './App.module.css';
import ToDoList from "./components/ToDoList/ToDoList";
import React from "react";


function App() {
  return (
    <div className={s.root}>
      <h1>TodoInput</h1>
      <ToDoList/>
    </div>
  );
}

export default App;
