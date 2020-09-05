import React, {Component} from 'react';
import Equity from './EquityComponent';
import styled from 'styled-components';
import {Row, Col, Label, Button, Form, FormGroup, FormText, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Table = styled.div`
  display: table;
  width: 90%;
  margin: 0 auto 5rem auto;
`;

const TableHeading = styled.div`
  display: table-header-group;
  background-color: #ddd;
  font-weight: bold;
`;
const TableHead = styled.div`
  display: table-cell;
  padding: 3px 10px;
  border: 1px solid #999999;
`;

const TableBody = styled.div`
  display: table-row-group;
`;

const FormContainer = styled.div`
  margin: 2rem auto;
  max-width: 400px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.7rem;
  text-align: right;
  margin-bottom: 0;
  height: 1.1rem;
`;

const initialState = {
  equity: {
    symbol: '',
    growth: '',
    futpe: '',
  },
  watchlist: [],
  errors: {
    symbol: '',
    growth: '',
    futpe: '',
  },
};

class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    const input = event.target;
    const newEquity = this.state.equity;
    const field = input.name;
    this.validate(input);
    // make copy of 'Equity' and modify it before updating state
    newEquity[field] = input.value;
    this.setState({equity: newEquity});
  }

  validate(input) {
    let newErrors = this.state.errors;

    switch (input.name) {
      case 'symbol':
        // check if equity already exists in watchlist
        this.state.watchlist.forEach((e) => {
          if (e.symbol === input.value) {
            newErrors[input.name] = 'Equity already exists';
            console.log('equity already exists');
          }
        });
        break;
      case 'futpPe':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid price';
        } else newErrors = {};
        break;
      case 'growth':
        if (isNaN(input.value)) {
          newErrors[input.name] = 'Please enter a valid price';
        } else newErrors = {};
        break;
      default:
        this.setState({errors: initialState.errors});
        newErrors = {};
    }
    this.setState({errors: newErrors});
  }

  handleSubmit(event) {
    event.preventDefault();

    let list = this.state.watchlist.concat(this.state.equity);
    this.setState(
      {
        equity: {
          symbol: '',
          growth: '',
          futPe: '',
        },
        watchlist: list,
        errors: {
          symbol: '',
          growth: '',
          futPe: '',
        },
      },
      () => {
        console.log(this.state);
      }
    );
  }

  handleClear() {
    this.setState({equity: initialState.equity});
  }

  render() {
    return (
      <Container>
        <h1>Wish List</h1>
        <h4>
          <a href="/home">Home</a>
        </h4>
        <h4>
          <a href="/trade-calc">Trade Calculator</a>
        </h4>
        <h6>Easily keep track of you favorite stocks and see when it's time to buy!</h6>
        <Table>
          <TableHeading>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>P/E</TableHead>
            <TableHead>EPS</TableHead>
            <TableHead>Growth</TableHead>
            <TableHead>MOS</TableHead>
          </TableHeading>
          <TableBody>
            {this.state.watchlist.map((equity, i) => {
              return <Equity symbol={equity.symbol} growth={equity.growth} futpe={equity.futPe} key={i} />;
            })}
          </TableBody>
        </Table>

        <FormContainer>
          <Form onSubmit={this.handleSubmit}>
            <FormText m={5}> Add equity to watchlist.</FormText>

            <FormGroup className="mb-0" row>
              <Label for="symbol" xs={6}>
                Symbol
              </Label>
              <InputGroup className="col-6">
                <Input required type="text" name="symbol" value={this.state.symbol} onChange={this.handleChange} step=".01"></Input>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.symbol}</Error>

            <FormGroup className="mb-0" row>
              <Label for="symbol" xs={6}>
                Future P/E
              </Label>
              <InputGroup className="col-6">
                <Input required type="text" name="futPe" value={this.state.futPe} onChange={this.handleChange} step=".01"></Input>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.futPe}</Error>

            <FormGroup className="mb-0" row>
              <Label for="growth" xs={6}>
                Projected Growth
              </Label>
              <InputGroup className="col-6">
                <Input required type="text" name="growth" maxLength="2" value={this.state.growth} onChange={this.handleChange}></Input>
                <InputGroupAddon addonType="append">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.growth}</Error>

            <FormGroup row className="justify-content-center">
              <Button type="submit" className="m-4 btn btn-success" mt={4}>
                Add
              </Button>
              <Button className="m-4 btn btn-secondary" onClick={this.handleClear}>
                Clear Fields
              </Button>
            </FormGroup>
          </Form>
        </FormContainer>
      </Container>
    );
  }
}

export default WishList;
