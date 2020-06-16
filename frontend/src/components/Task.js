import React, {Component} from 'react';

function getTaskId(props){
  return "task-" + props.id;
}


class Task extends Component{
  editTask = () => {
    this.props.onTaskClick(this);
  };
  render(){return (
    <li className='card task' onClick={this.editTask}>
    <div className="task" draggable="true" id={getTaskId(this.props)}>
    <h2>{this.props.title}</h2>
    <p>{this.props.description}</p>
    </div>
    </li>
  );}
}
export default Task;
