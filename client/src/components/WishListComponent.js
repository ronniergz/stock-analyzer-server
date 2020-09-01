import React, {Component} from 'react';
import Equity from './EquityComponent';
import styled from 'styled-components';
import {Row, Col, Button, Form, FormGroup, FormText, Label, Input} from 'reactstrap';

const Container = styled.div`
  font-size: 0.8rem;
  @media (min-width: 600px) {
    font-size: 1rem;
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
  width: 80%;
  margin: 0 auto;
  font-weight: 400;
`;

class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      equity: {
        symbol: '',
        growth: '',
        futpe: '',
      },
      watchlist: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const input = event.target;
    const newEquity = this.state.equity;
    const field = input.name;
    // make copy of 'Equity' and modify it before updating state
    newEquity[field] = input.value;
    this.setState({equity: newEquity});
    console.log('Field Changed!');
    console.log('New state is: ' + JSON.stringify(this.state));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Current Watchlist');
    console.log(this.state.watchlist);
    let list = this.state.watchlist.concat(this.state.equity);
    console.log('New list');
    console.log(list);
    this.setState({
      equity: {
        symbol: '',
        growth: '',
        futpe: '',
      },
      watchlist: list,
    });
    console.log('Form Submitted!');
    setTimeout(() => console.log('New state is: ' + JSON.stringify(this.state)), 1000);
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
              return <Equity symbol={equity.symbol} growth={equity.growth} futpe={equity.futpe} key={i} />;
            })}
          </TableBody>
        </Table>
        <FormContainer>
          <Form onSubmit={this.handleSubmit}>
            <FormText m={5}> Add equity to watchlist.</FormText>
            <FormGroup row>
              <Label for="symbol" sm={3}>
                Symbol
              </Label>
              <Col sm={4}>
                <Input type="text" name="symbol" value={this.state.equity.symbol} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="growth" sm={3}>
                Growth
              </Label>
              <Col sm={4}>
                <Input type="number" name="growth" step=".01" value={this.state.equity.growth} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="growth" sm={3}>
                Future P/E
              </Label>
              <Col sm={4}>
                <Input type="number" name="futpe" step=".01" value={this.state.equity.futpe} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Button type="submit" mt={4}>
                Add
              </Button>
            </FormGroup>
          </Form>
        </FormContainer>
      </Container>
    );
  }
}

export default WishList;
