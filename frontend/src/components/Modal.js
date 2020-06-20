import React, { Component } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input,
  Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

let STATUS = {
  "To do": "t",
  "In process": "p",
  "Blocked": "b",
  "Done": "d"
}

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      dropdownOpen: false,
      dropdownValue:"Status",
      date:this.props.activeItem.due_date,
      focused:false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  changeDropdownState = ()=> {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  handleDropdownChange = () => {
    let statusValue = STATUS[this.state.dropdownValue];
    const activeItem = { ...this.state.activeItem, ["status"]: statusValue };
    this.setState({ activeItem });
  };

  handleDateChange = due_date => {
    this.setState({date: due_date});
    const activeItem = { ...this.state.activeItem, ["due_date"]: due_date };
    this.setState({ activeItem });
  }
  changeDropdownValue = (e) => {
    this.setState({dropdownValue: e.currentTarget.textContent}, function(){
      this.handleDropdownChange();
    });
  }

  render() {
    const { toggle, onSave, onDelete } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.changeDropdownState}>
            <DropdownToggle caret>
              {this.state.dropdownValue}
              </DropdownToggle>
            <DropdownMenu>
              <DropdownItem name="status" onClick={this.changeDropdownValue}>To do</DropdownItem>
              <DropdownItem name="status" onClick={this.changeDropdownValue}>In process</DropdownItem>
              <DropdownItem name="status" onClick={this.changeDropdownValue}>Blocked</DropdownItem>
              <DropdownItem name="status" onClick={this.changeDropdownValue}>Done</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={date => this.handleDateChange(date)}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            id="date-picker"
          />
          </Form>
        </ModalBody>
        <ModalFooter className="toggle-buttons">
          <Button color="danger" onClick={() => onDelete(this.state.activeItem)}>
            Delete
          </Button>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
