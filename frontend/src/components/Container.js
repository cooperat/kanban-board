import React from 'react';
import Task from './Task'


export default function Container(props){

const tasks = props.tasks.map(task => <Task
  title={task.title}
  description={task.description}
  completed={task.completed}
  onTaskClick={props.onTaskClick}
  key={task.id}
  id={task.id}
  status={task.status}
  due_date={task.due_date}/>);

  return (
    <div className="card container">
      <h2 className="container-header"> {props.header} </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {tasks}
      </ul>
    </div>
  );
}
