import React from 'react';
import Task from './Task'


export default function Container(props){

const tasks = props.tasks.map(task => <Task
  title={task.title}
  description={task.description}
  completed={task.completed}
  onTaskClick={props.onTaskClick}
  key={task.id}
  id={task.id}/>);

  return (
    <div className="card container">
      <h1> {props.header} </h1>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {tasks}
      </ul>
    </div>
  );
}
