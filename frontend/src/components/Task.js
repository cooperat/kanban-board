import React, {Component} from 'react';
import TaskInformation from './TaskInformation';

function getTaskId(props){
  return "task-" + props.id;
}

class Task extends Component{
  editTask = () => {
    const taskInfo = new TaskInformation(this.props.id, this.props.title, this.props.description, this.props.completed,
    this.props.status);
    this.props.onTaskClick(taskInfo);
  };
  render(){return (
    <li className='card task' onClick={this.editTask}>
    <div className="task" draggable="true" id={getTaskId(this.props)}>
    <h3>{this.props.title}</h3>
    <p className="task-description">{this.props.description}</p>
    </div>
    </li>
  );}
}
export default Task;
