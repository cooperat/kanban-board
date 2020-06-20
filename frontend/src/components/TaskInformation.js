import moment from 'moment';

function stringToDate(stringDate){
  return moment(stringDate);
}

class TaskInformation{
  constructor(id, title, description, completed, status, due_date){
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.status = status;
    this.due_date = stringToDate(due_date);
  }
}

export default TaskInformation;
