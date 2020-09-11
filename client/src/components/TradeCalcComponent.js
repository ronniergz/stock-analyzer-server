import React, { Component } from 'react';
import styled from 'styled-components';
import LinkButton from './LinkButtonComponent';
import { Row, Col, Button, Form, FormGroup, InputGroup, InputGroupText, InputGroupAddon, Label, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { Theme } from './theme';

const LinkColor = '#444444';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  margin: 2rem auto;
  @media (max-width: 767px) {
    max-width: 450px;
  }
  @media (min-width: 768px) {
    width: 700px;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.7rem;
  text-align: right;
  margin-bottom: 0;
  height: 1.1rem;
`;

const initialState = {
  symbol: '',
  shares: '',
  purchasePrice: '',
  amountTraded: '',
  commission: '',
  salePrice: '',
  incomeTax: '',
  capitalGainsTax: '',
  gain: '',
  shortTermGain: '',
  shortTermNet: '',
  longTermGain: '',
  longTermNet: '',
  isModalOpen: false,
  errors: {
    shares: '',
    purchasePrice: '',
    salePrice: '',
    commission: '',
    incomeTax: '',
    capitalGainsTax: '',
  },
};

class TradeCalc extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toNumber = this.toNumber.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const input = event.target;
    const field = input.name;
    this.validate(input);
    this.setState({ [field]: input.value }, () => {
      console.log(JSON.stringify(this.state));
      // Check if we have price and share count to calculate amount traded
      if (this.state.shares !== '' && this.state.purchasePrice !== '') {
        console.log('IF condition validated');
        let traded = (this.state.shares * this.state.purchasePrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.setState({ amountTraded: traded }, () => {
          console.log(JSON.stringify(this.state));
        });
      }
    });
  }

  validate(input) {
    let newErrors = this.state.errors;

    switch (input.name) {
      case 'shares':
        if (isNaN(input.value)) {
          console.log('Input value: ' + input.value);
          newErrors.shares = 'Please enter a valid number';
        } else delete newErrors[input.name];
        break;
      case 'purchasePrice':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid price';
        } else delete newErrors[input.name];
        break;
      case 'salePrice':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid price';
        } else delete newErrors[input.name];
        break;
      case 'commission':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid price';
        } else delete newErrors[input.name];
        break;
      case 'incomeTax':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid tax rate';
        } else delete newErrors[input.name];
        break;
      case 'capitalGainsTax':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid tax rate';
        } else delete newErrors[input.name];
        break;
      default:
        this.setState({ errors: initialState.errors });
        newErrors = {};
    }
    this.setState({ errors: newErrors });
  }

  handleSubmit(event) {
    event.preventDefault();

    let gain = ((this.state.salePrice - this.state.purchasePrice - this.state.commission * 2) * 100) / this.state.purchasePrice;
    let shortTermNet = this.toNumber(this.state.amountTraded) * (gain / 100) * ((100 - this.state.incomeTax) / 100);
    let shortTermGain = (shortTermNet / this.toNumber(this.state.amountTraded)) * 100;
    let longTermNet = this.toNumber(this.state.amountTraded) * (gain / 100) * ((100 - this.state.capitalGainsTax) / 100);
    let longTermGain = (longTermNet / this.toNumber(this.state.amountTraded)) * 100;

    this.setState(
      {
        gain: gain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        shortTermGain: shortTermGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        shortTermNet: shortTermNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        longTermGain: longTermGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        longTermNet: longTermNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      },
      () => {
        this.toggleModal();
        console.log('Form submitted!');
        console.log('New state is: ' + JSON.stringify(this.state));
      }
    );
  }

  toNumber(string) {
    return Number(string.replace(/\D/g, '')) / 100;
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleClear() {
    console.log('Initial state: ' + JSON.stringify(initialState));
    this.setState(initialState);
  }

  render() {
    // check if errors are empty to enable form submission
    const isEnabled = Object.keys(this.state.errors).length === 0;
    return (
      <Container>
        <div>
          <h1>Trade Calculator</h1>
          <LinkButton href="/home" text="Home" color={Theme.textLight} colorBg={Theme.secondary} />
        </div>

        <FormContainer>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup className="mb-0 mx-0" row>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="symbol" xs={6}>
                    Symbol
                  </Label>
                  <InputGroup className="col-6">
                    <Input type="text" name="symbol" value={this.state.symbol} onChange={this.handleChange}></Input>
                  </InputGroup>
                </FormGroup>
                <Error></Error>
              </Col>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="shares" xs={6}>
                    Shares
                  </Label>
                  <InputGroup className="col-6">
                    <Input required type="text" name="shares" value={this.state.shares} onChange={this.handleChange}></Input>
                  </InputGroup>
                </FormGroup>
                <Error>{this.state.errors.shares}</Error>
              </Col>
            </FormGroup>

            <FormGroup className="mb-0 mx-0" row>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="purchasePrice" xs={6}>
                    Purchase Price
                  </Label>
                  <InputGroup className="col-6">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input required type="text" name="purchasePrice" value={this.state.purchasePrice} onChange={this.handleChange} step=".01"></Input>
                  </InputGroup>
                </FormGroup>
                <Error>{this.state.errors.purchasePrice}</Error>
              </Col>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="amountTraded" xs={6}>
                    Amount Traded
                  </Label>
                  <InputGroup className="col-6">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input readOnly type="text" name="amountTraded" value={this.state.amountTraded} onChange={this.handleChange} step=".01"></Input>
                  </InputGroup>
                </FormGroup>
                <Error></Error>
              </Col>
            </FormGroup>

            <FormGroup className="mb-0 mx-0" row>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="salePrice" xs={6}>
                    Sale Price
                  </Label>
                  <InputGroup className="col-6">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input required type="text" name="salePrice" value={this.state.salePrice} onChange={this.handleChange} step=".01"></Input>
                  </InputGroup>
                </FormGroup>
                <Error>{this.state.errors.salePrice}</Error>
              </Col>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="commission" xs={6}>
                    Commission
                  </Label>
                  <InputGroup className="col-6">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input required type="text" name="commission" value={this.state.commission} onChange={this.handleChange} step=".01"></Input>
                  </InputGroup>
                </FormGroup>
                <Error>{this.state.errors.commission}</Error>
              </Col>
            </FormGroup>

            <FormGroup className="mb-0 mx-0" row>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="incomeTax" xs={6}>
                    Income Tax
                  </Label>
                  <InputGroup className="col-6">
                    <Input required type="text" name="incomeTax" value={this.state.incomeTax} maxLength="2" onChange={this.handleChange} step=".1"></Input>
                    <InputGroupAddon addonType="append">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <Error>{this.state.errors.incomeTax}</Error>
              </Col>
              <Col md>
                <FormGroup className="mb-0" row>
                  <Label for="capitalGainsTax" xs={6}>
                    Capital Gains Tax
                  </Label>
                  <InputGroup className="col-6">
                    <Input
                      required
                      type="text"
                      name="capitalGainsTax"
                      value={this.state.capitalGainsTax}
                      maxLength="2"
                      onChange={this.handleChange}
                      step=".1"
                    ></Input>
                    <InputGroupAddon addonType="append">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <Error>{this.state.errors.capitalGainsTax}</Error>
              </Col>
            </FormGroup>

            <FormGroup className="mb-0 mx-0 d-flex justify-content-center" row>
              <Button disabled={!isEnabled} className="m-4 btn btn-success" type="submit">
                Calculate
              </Button>
              <Button className="m-4 btn btn-secondary" onClick={this.handleClear}>
                Clear Fields
              </Button>
            </FormGroup>
          </Form>
        </FormContainer>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal} className="justify-content-center"></ModalHeader>
          <ModalBody>
            <Row>
              <Col m="3">Amount Traded</Col>
              <Col m="3">${this.state.amountTraded}</Col>
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
            <Row className="my-4 d-flex justify-content-center">
              <Button type="submit" value="submit" color="primary" onClick={this.toggleModal}>
                Go Back
              </Button>
            </Row>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default TradeCalc;
