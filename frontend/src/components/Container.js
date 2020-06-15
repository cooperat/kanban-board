import React from 'react';
import Task from './Task'




export default function Container(props){

const tasks = props.tasks.map(task => <Task
  title={task.title}
  description={task.description}
  completed={task.completed}/>);

  return (
    <li className="card container">
      <h1> {props.header} </h1>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {tasks}
      </ul>
    </li>
  );
}
