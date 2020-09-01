import React, {Component} from 'react';
import styled from 'styled-components';
import {Row, Col, Button, Form, FormGroup, FormText, Label, Modal, ModalHeader, ModalBody, Input} from 'reactstrap';

const Container = styled.div`
  font-size: 0.8rem;
  width: 80%;
  margin: 0 auto;
  @media (min-width: 600px) {
    font-size: 1rem;
  
`;

class TradeCalc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '', // input
      purchasePrice: '', // input
      shares: '', // input
      commission: '', // input
      salePrice: '', // input
      incomeTax: '', // input
      capitalGainsTax: '', // input
      amountTraded: '', //
      gain: '', //
      shortTermGain: '',
      shortTermNet: '',
      longTermGain: '',
      longTermNet: '',
      isModalOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleChange(event) {
    const input = event.target;
    const newState = this.state;
    const field = input.name;
    // make copy of state and modify it before updating state
    newState[field] = input.value;
    this.setState({newState});
    // console.log('Input Changed!');
    // setTimeout(() => console.log('New state is: ' + JSON.stringify(this.state)), 1000);
  }

  handleSubmit(event) {
    event.preventDefault();

    let amountTraded = this.state.shares * this.state.purchasePrice;
    let gain = ((this.state.salePrice - this.state.purchasePrice) * 100) / this.state.purchasePrice;
    let shortTermNet = amountTraded * (gain / 100) * (1 - this.state.incomeTax);
    let shortTermGain = (shortTermNet / amountTraded) * 100;
    let longTermNet = amountTraded * (gain / 100) * (1 - this.state.capitalGainsTax);
    let longTermGain = (longTermNet / amountTraded) * 100;

    this.setState({
      amountTraded: amountTraded,
      gain: gain.toFixed(2),
      shortTermGain: shortTermGain.toFixed(2),
      shortTermNet: shortTermNet.toFixed(2),
      longTermGain: longTermGain.toFixed(2),
      longTermNet: longTermNet.toFixed(2),
    });
    console.log('Form submitted!');
    this.toggleModal();
    setTimeout(() => console.log('New state is: ' + JSON.stringify(this.state)), 1000);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <Container>
        <div>
          <h1>Trade Calculator</h1>
          <h4>
            <a href="/home">Home</a>
          </h4>
          <h4>
            <a href="/wish-list">Wish List</a>
          </h4>
        </div>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="symbol">Symbol</Label>
            <Input type="text" name="symbol" onChange={this.handleChange}></Input>
          </FormGroup>
          <FormGroup row>
            <Label for="purchasePrice">Purchase Price</Label>
            <Input type="number" name="purchasePrice" onChange={this.handleChange} step=".01"></Input>
          </FormGroup>
          <FormGroup row>
            <Label for="shares">Shares</Label>
            <Input type="number" name="shares" onChange={this.handleChange}></Input>
          </FormGroup>
          <FormGroup row>
            <Label for="salePrice">Sale Price</Label>
            <Input type="number" name="salePrice" onChange={this.handleChange} step=".01"></Input>
          </FormGroup>
          <FormGroup row>
            <Label for="commission">Commission</Label>
            <Input type="number" name="commission" onChange={this.handleChange} step=".01"></Input>
          </FormGroup>
          <FormGroup row>
            <Label for="incomeTax">Income Tax Rate</Label>
            <Input type="number" name="incomeTax" onChange={this.handleChange} step=".01"></Input>
          </FormGroup>
          <FormGroup row>
            <Label for="capitalGainsTax">Capital Gains Tax Rate</Label>
            <Input type="number" name="capitalGainsTax" onChange={this.handleChange} step=".01"></Input>
          </FormGroup>
          <FormGroup row>
            <Button type="submit">Calculate</Button>
          </FormGroup>
        </Form>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal} className="justify-content-center">
            Trade
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>Amount Traded</Col>
              <Col>${this.state.amountTraded}</Col>
            </Row>
            <Row>
              <Col>Pre-Tax Gain</Col>
              <Col>{this.state.gain}%</Col>
            </Row>
            <Row>
              <Col>Short Term Gain</Col>
              <Col>{this.state.shortTermGain}%</Col>
            </Row>
            <Row>
              <Col>Short Term Net</Col>
              <Col>${this.state.shortTermNet}</Col>
            </Row>
            <Row>
              <Col>Long Term Gain</Col>
              <Col>{this.state.longTermGain}%</Col>
            </Row>
            <Row>
              <Col>Long Term Net</Col>
              <Col>${this.state.longTermNet}</Col>
            </Row>
            <Button type="submit" value="submit" color="primary" onClick={this.toggleModal}>
              Go Back
            </Button>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default TradeCalc;
