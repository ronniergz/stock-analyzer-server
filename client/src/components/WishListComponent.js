import React, { Component } from 'react';
import Equity from './EquityComponent';
import EquityUpdateModal from './EquityUpdateComponent';
import styled from 'styled-components';
import ls from 'local-storage';
import { Row, Col, Label, Button, Form, FormGroup, FormText, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, } from 'reactstrap';

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
  equityAdd: {},
  equityEdit: {},
  watchlist: [],
  errors: {},
  isModalOpen: false,
};

class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  // componentDidlMount() {
  //   // get watchlist from local storage
  //   this.setState({ watchlist: JSON.parse(ls.get('watchlist')) || [] });
  // }

  handleAddChange(event) {
    const input = event.target;
    const field = input.name;
    const newEquity = this.state.equityAdd;
    this.validate(input);
    // make copy of 'Equity' and modify it before updating state
    newEquity[field] = input.value;
    this.setState({ equityAdd: newEquity }, () => {
      console.log("HandleAddChange");
      console.log(this.state);
    });
  }

  handleEditChange(event) {
    const input = event.target;
    const field = input.name;
    const newEquity = this.state.equityEdit;
    this.validate(input);
    // make copy of 'Equity' and modify it before updating state
    newEquity[field] = input.value;
    this.setState({ equityAdd: newEquity }, () => {
      console.log("HandleEditChange");
      console.log(this.state);
    });
  }

  validate(input) {
    let newErrors = this.state.errors;

    switch (input.name) {
      case 'symbol':
        input.value = input.value.toUpperCase();
        // check if equity is already in watchlist
        let symbolDuplicates = 0;
        this.state.watchlist.forEach((e) => {
          if (e.symbol == input.value) symbolDuplicates++;
        });
        if (symbolDuplicates > 0) {
          newErrors[input.name] = 'Equity already exists';
        } else delete newErrors[input.name];
        break;
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
        this.setState({ errors: initialState.errors });
        newErrors = {};
    }
    this.setState({ errors: newErrors }, () => { console.log(this.state.errors) });
  }

  handleSubmit(event) {
    event.preventDefault();
    let list = this.state.watchlist.concat(this.state.equityAdd);
    ls.set('watchlist', JSON.stringify(list)); // update localStorage
    this.setState(
      {
        equityAdd: {},
        watchlist: list,
        errors: {},
      }
    );
  }

  handleClear() {
    // copy current state, clear equity, then re-set
    let newState = this.state;
    newState.equity = {
      symbol: '',
      growth: '',
      futPe: '',
    };
    newState.errors = {};
    this.setState(newState);
  }

  handleEdit(equity) {
    this.toggleModal();
    // update equity to edit in state
    this.setState({ equityEdit: equity })
    console.log("Equity Clicked");
  }

  handleUpdate() {
    // find index of equity
    let equityIndex = this.state.watchlist.findIndex((equityItem) => {
      return equityItem.symbol === this.state.equityEdit.symbol
    })
    // update equity in watchlist copy
    let newWatchlist = this.state.watchlist
    newWatchlist[equityIndex].futPe = this.state.equityEdit.futPe;
    newWatchlist[equityIndex].growth = this.state.equityEdit.growth;
    // update state
    this.setState({ watchlist: newWatchlist })
    ls.set('watchlist', JSON.stringify(newWatchlist)); // update localStorage
    this.toggleModal();
  }

  handleDelete() {
    let equity = this.state.equityEdit
    // Filter and remove equity from watchlist
    let newWatchlist = this.state.watchlist.filter((equityItem) => {
      return equityItem.symbol.toUpperCase() !== equity.symbol.toUpperCase();
    });
    this.setState({ watchlist: newWatchlist })
    ls.set('watchlist', JSON.stringify(newWatchlist)); // update localStorage
    this.toggleModal();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    // check if errors are empty to enable form submission
    const isEnabled = Object.keys(this.state.errors).length === 0;
    console.log("Render");
    console.log(this.state.watchlist);
    return (
      <Container>
        <h1>Watch List</h1>
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
            {this.state.watchlist.map((equity) => {
              return (
                <Equity symbol={equity.symbol} growth={equity.growth} futPe={equity.futPe} edit={this.handleEdit.bind(null, equity)} />
              );
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
                <Input required type="text" name="symbol" value={this.state.equityAdd.symbol} onChange={this.handleAddChange} step=".01"></Input>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.symbol}</Error>

            <FormGroup className="mb-0" row>
              <Label for="symbol" xs={6}>
                Future P/E
              </Label>
              <InputGroup className="col-6">
                <Input required type="text" name="futPe" value={this.state.equityAdd.futPe} onChange={this.handleAddChange} step=".01"></Input>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.futPe}</Error>

            <FormGroup className="mb-0" row>
              <Label for="growth" xs={6}>
                Projected Growth
              </Label>
              <InputGroup className="col-6">
                <Input required type="text" name="growth" maxLength="2" value={this.state.equityAdd.growth} onChange={this.handleAddChange}></Input>
                <InputGroupAddon addonType="append">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <Error>{this.state.errors.growth}</Error>

            <FormGroup row className="justify-content-center">
              <Button type="submit" disabled={!isEnabled} className="m-4 btn btn-success" mt={4}>
                Add
              </Button>
              <Button className="m-4 btn btn-secondary" onClick={this.handleClear}>
                Clear Fields
              </Button>
            </FormGroup>
          </Form>
        </FormContainer>

        <EquityUpdateModal
          symbol={this.state.equityEdit.symbol}
          futPe={this.state.equityEdit.futPe}
          growth={this.state.equityEdit.growth}
          onChange={this.handleEditChange}
          onUpdate={this.handleUpdate}
          onDelete={this.handleDelete}
          onModal={this.toggleModal}
          modalStatus={this.state.isModalOpen} />

      </Container>
    );
  }
}

export default WishList;
