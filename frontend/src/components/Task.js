import React, {Component} from 'react';
import TaskInformation from './TaskInformation';
import moment from 'moment';
import {Button} from 'reactstrap';


function stringToDate(stringDate){
  return moment(stringDate);
}

class Task extends Component{
  constructor(props) {
        super(props);
      }
  getTaskId = props => {
    return "task-" + props.id;
  }

  isLate = dueDate => {
    return stringToDate(dueDate) < moment() ? true : false;
  }
  addWarningTaskIsLate = (dueDate) => {
    return this.isLate(dueDate) ? 'red':'';
   }


  editTask = () => {
    const taskInfo = new TaskInformation(this.props.id, this.props.title, this.props.description, this.props.completed,
    this.props.status, this.props.due_date);
    this.props.onTaskClick(taskInfo);
  }
  render(){return (
    <li className='card task' onClick={this.editTask}>
    <div className="task" draggable="true" id={this.getTaskId(this.props)}>
    <h3>{this.props.title}</h3>
    <p className="task-description">{this.props.description}</p>
    </div>
    <div className="late-information" style={{background: this.addWarningTaskIsLate(this.props.due_date)}}/>
    </li>
  );}
}
export default Task;
