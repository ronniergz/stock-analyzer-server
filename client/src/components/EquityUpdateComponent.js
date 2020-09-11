import React, { Component } from 'react';
import styled from 'styled-components';
import { Label, Button, Form, FormGroup, FormText, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const Error = styled.p`
  color: red;
  font-size: 0.7rem;
  text-align: right;
  margin-bottom: 0;
  height: 1.1rem;
`;

const initialState = {
  equity: {},
  errors: {},
};

class EquityUpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return { equity: props.equity };
  }

  handleEditChange(event) {
    const input = event.target;
    const field = input.name;
    const newEquity = this.props.equity;
    this.validate(input);
    // make copy of 'Equity' and modify it before updating state
    newEquity[field] = input.value;
    this.setState({ equity: newEquity }, () => {
      console.log('HandleEditChange');
      console.log(this.state);
    });
  }

  validate(input) {
    let newErrors = this.state.errors;

    switch (input.name) {
      case 'futPe':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid number';
        } else delete newErrors[input.name];
        break;
      case 'growth':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid number';
        } else delete newErrors[input.name];
        break;
      default:
        this.setState({ errors: {} });
        newErrors = {};
    }
    this.setState({ errors: newErrors }, () => {
      console.log(this.state.errors);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onUpdate(this.state.equity);
    console.log('HandleSubmit');
    console.log(this.state.equity);
  }

  render() {
    // check if errors are empty to enable form submission
    const isEnabled = Object.keys(this.state.errors).length === 0;
    return (
      <Modal isOpen={this.props.modalStatus} toggle={this.props.onModal}>
        <ModalHeader className="justify-content-center">{this.props.equity.symbol}</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormText m={5} className="justify-content-center">
              Edit existing equity.
            </FormText>
            <FormGroup className="mb-0" row>
              <Label for="symbol" xs={6}>
                Future P/E
              </Label>
              <InputGroup className="col-6">
                <Input required type="text" name="futPe" value={this.props.equity.futPe} onChange={this.handleEditChange} step=".01"></Input>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.futPe}</Error>

            <FormGroup className="mb-0" row>
              <Label for="growth" xs={6}>
                Projected Growth
              </Label>
              <InputGroup className="col-6">
                <Input required type="text" name="growth" maxLength="2" value={this.props.equity.growth} onChange={this.handleEditChange}></Input>
                <InputGroupAddon addonType="append">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.growth}</Error>

            <FormGroup row className="justify-content-center">
              <Button type="submit" disabled={!isEnabled} className="m-4 btn btn-success" onClick={this.handleSubmit}>
                Update
              </Button>
              <Button className="m-4 btn btn-secondary" onClick={this.props.onCancel}>
                Cancel
              </Button>
              <Button className="m-4 btn btn-danger" onClick={this.props.onDelete}>
                Delete
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default EquityUpdateModal;
