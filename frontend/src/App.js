import React, {Component} from 'react';
import './App.css';
import Container from './components/Container'

const STRUCTURE = ['To do'];
const containers = STRUCTURE.map(header => <Container header={header} />);

const todoItems = [
      {
        id: 1,
        title: "Go to Market",
        description: "Buy ingredients to prepare dinner",
        completed: true,
        status: 't'
      },
      {
        id: 2,
        title: "Study",
        description: "Read Algebra and History textbook for upcoming test",
        completed: false,
        status: 't'
      },
      {
        id: 3,
        title: "Sally's books",
        description: "Go to library to rent sally's books",
        completed: true,
        status: 'd'
      },
      {
        id: 4,
        title: "Article",
        description: "Write article on how to use django with react",
        completed: false,
        status: 't'
      }
    ];

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
          viewCompleted: false,
          todoList: todoItems
        };
      }
  render(){return (
    <main className="content">
      <ul
              role="list"
              className="container"
              aria-labelledby="list-heading"
              id='todo'
            >
            <Container
            header="todo"
            tasks={todoItems.filter(item => item.status=="t")} />
          </ul>

          <ul
              role="list"
              className="container"
              aria-labelledby="list-heading"
              id='inprocess'
            >
            <Container
            header="in process"
            tasks={todoItems.filter(item => item.status=="p")} />
          </ul>

          <ul
              role="list"
              className="container"
              aria-labelledby="list-heading"
              id='blocked'
            >
            <Container
            header="blocked"
            tasks={todoItems.filter(item => item.status=="b")} />
          </ul>

          <ul
              role="list"
              className="container"
              aria-labelledby="list-heading"
              id='done'
            >
            <Container
            header="done"
            tasks={todoItems.filter(item => item.status=="d")} />
          </ul>
    </main>
  );}
}

export default App;
