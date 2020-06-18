import React, {Component} from 'react';
import './App.css';
import Container from './components/Container'
import Modal from './components/Modal';
import axios from "axios";


class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
          modal: false,
          viewCompleted: false,
          activeItem:{
            title: "",
            description: "",
            completed: false,
            status:""
          },
          todoList: [],
        };
        this.createItem = this.createItem.bind(this);
      }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false, status:"t" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  render(){ return(
    <main className="content">
      <button className="button new-task" onClick={this.createItem}>
        <h2>New task</h2>
      </button>

      <div className="containers">
        <Container
        header="todo"
        tasks={this.state.todoList.filter(item => item.status==="t")}
        onTaskClick={this.editItem} />

        <Container
        header="in process"
        tasks={this.state.todoList.filter(item => item.status==="p")}
        onTaskClick={this.editItem}  />

        <Container
        header="blocked"
        tasks={this.state.todoList.filter(item => item.status==="b")}
        onTaskClick={this.editItem} />

        <Container
        header="done"
        tasks={this.state.todoList.filter(item => item.status==="d")}
        onTaskClick={this.editItem} />

      {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}

      </div>
    </main>
  );}
}

export default App;
