import React, { Component } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input,
  Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

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
      dropdownValue:"Status"
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
          </Form>
        </ModalBody>
        <ModalFooter>
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
