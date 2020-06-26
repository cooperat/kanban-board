import React, {Component} from 'react';
import './App.css';
import Container from './components/Container'
import Modal from './components/Modal';
import axios from "axios";
import moment from 'moment';
import Nav from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


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
            status:"",
            due_date: moment('1999-01-01', 'YYYY-MM-dd'),
            isLate:false,
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
          },
          todoList: [],
        };
        this.createItem = this.createItem.bind(this);
      }
  componentDidMount() {
    this.refreshList();
    if (this.state.logged_in) {
      fetch('http://localhost:8000/kanban/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        console.log(json);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      })
      .then(() => this.refreshList());
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/kanban/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  stringToDate = stringDate => {
    return moment(stringDate, 'YYYY-MM-dd');
  }
  dateToString = momentDate => {
    return momentDate.format().slice(0, 10);
  }

  changeItemMomentDateToStringDate = item => {
    let momentDate = item["due_date"];
    item["due_date"] = this.dateToString(momentDate);
    return item;
  }

  handleSubmit = item => {
    this.toggle();
    item = this.changeItemMomentDateToStringDate(item);
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
    this.toggle();
    item = this.changeItemMomentDateToStringDate(item);
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false, status:"t", due_date: moment('1999-01-01') };
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
  render(){
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return(
    <main className="content">
    <Nav
        logged_in={this.state.logged_in}
        display_form={this.display_form}
        handle_logout={this.handle_logout}
      />
      {form}
      <h3>
        {this.state.logged_in
          ? `Hello, ${this.state.username}`
          : 'Please Log In'}
      </h3>
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
                onDelete={this.handleDelete}
              />
            ) : null}

      </div>
    </main>
  );}
}

export default App;
