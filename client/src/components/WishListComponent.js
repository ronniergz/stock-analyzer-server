import React, {Component} from 'react';
import Equity from './EquityComponent';
import EquityUpdateModal from './EquityUpdateComponent';
import LinkButton from './LinkButtonComponent';
import FormButton from './FormButtonComponent';
import styled from 'styled-components';
import ls from 'local-storage';
import {Label, Button, Form, FormGroup, FormText, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import {size} from './device';
import {Theme} from './theme';

const Container = styled.div`
  color: ${Theme.textDark};
  max-width: ${size.tablet};
  margin: 0 auto;
`;

const Table = styled.div`
  display: table;
  width: 100%;
  margin: 0 auto 5rem auto;
`;

const TableHeading = styled.div`
  display: table-header-group;
  font-weight: bold;
`;

const TableHead = styled.div`
  font-size: 0.8rem;
  display: table-cell;
  padding: 10px 10px;
  text-align: right;
  border-bottom: 1px solid #999999;
`;

const TableHeadLeft = styled(TableHead)`
  text-align: left;
`;

const TableBody = styled.div`
  display: table-row-group;
`;

const FormContainer = styled.div`
  margin: 2rem auto;
  max-width: 300px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.7rem;
  text-align: right;
  margin-bottom: 0;
  height: 1.1rem;
`;

const initialState = {
  equityAdd: {
    symbol: '',
    futPe: '',
    growth: '',

    pe: '',
    eps: ``,
    price: ``,
    sticker: ``,
    mos: ``,
  },
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
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  history() {}

  componentDidMount() {
    // get watchlist from local storage
    this.setState({watchlist: JSON.parse(ls.get('watchlist')) || []});
  }

  handleAddChange(event) {
    const input = event.target;
    const field = input.name;
    const newEquity = this.state.equityAdd;
    this.validate(input);
    // make copy of 'Equity' and modify it before updating state
    newEquity[field] = input.value;
    this.setState({equityAdd: newEquity}, () => {
      console.log('HandleAddChange');
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
          if (e.symbol === input.value) symbolDuplicates++;
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
        this.setState({errors: initialState.errors});
        newErrors = {};
    }
    this.setState({errors: newErrors}, () => {
      console.log(this.state.errors);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let newEquity = this.state.equityAdd;
    let list = this.state.watchlist.concat(this.state.equityAdd);
    ls.set('watchlist', JSON.stringify(list)); // update localStorage
    newEquity = {};
    this.setState(
      {
        equityAdd: newEquity,
        watchlist: list,
        errors: {},
      },
      () => {
        console.log(this.state);
      }
    );
  }

  handleClear() {
    // copy current state, clear equity, then re-set
    let newState = this.state;
    newState.equityAdd = {
      symbol: '',
      growth: '',
      futPe: '',
    };
    newState.errors = {};
    this.setState(newState);
  }

  handleEditClick(equity) {
    // open equity update modal
    this.toggleModal();
    this.setState({equityEdit: equity});
    console.log('Equity Clicked');
  }

  handleUpdate(equity) {
    console.log('Equity');
    console.log(equity);
    // find index of equity
    let equityIndex = this.state.watchlist.findIndex((equityItem) => {
      return equityItem.symbol === equity.symbol;
    });
    // update equity in watchlist copy
    let newWatchlist = this.state.watchlist;
    //console.log(newWatchlist[equityIndex].futPe);
    console.log(newWatchlist);
    newWatchlist[equityIndex].futPe = equity.futPe;
    newWatchlist[equityIndex].growth = equity.growth;
    // update state
    this.setState({watchlist: newWatchlist});
    ls.set('watchlist', JSON.stringify(newWatchlist)); // update localStorage
    this.toggleModal();
  }

  handleDelete() {
    let equity = this.state.equityEdit;
    // Filter and remove equity from watchlist
    let newWatchlist = this.state.watchlist.filter((equityItem) => {
      return equityItem.symbol.toUpperCase() !== equity.symbol.toUpperCase();
    });
    this.setState({watchlist: newWatchlist});
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
    return (
      <Container>
        <LinkButton href="/home" text="< Home" color={Theme.textLight} colorBg={Theme.secondary} margin="1rem" height="38px" width="80px" fontSize="1rem" />
        <h3>Watch List</h3>
        <Table>
          <TableHeading>
            <TableHeadLeft>List</TableHeadLeft>
            <TableHead>Data</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>M.O.S.</TableHead>
          </TableHeading>
          <TableBody>
            {this.state.watchlist.map((equity, i) => {
              return (
                <Equity symbol={equity.symbol} growth={equity.growth} futPe={equity.futPe} edit={this.handleEditClick.bind(null, equity)} key={i} index={i} />
              );
            })}
          </TableBody>
        </Table>

        <FormContainer>
          <Form onSubmit={this.handleSubmit}>
            <FormText className="m-3"> Add a new equity to the watchlist.</FormText>

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
              <FormButton
                type="submit"
                disabled={!isEnabled}
                margin="2rem"
                padding="0 1rem"
                color={Theme.textLight}
                colorBg={Theme.secondary}
                height="3rem"
                text="Add"
              />
              <FormButton
                onClick={this.handleClear}
                disabled={!isEnabled}
                margin="2rem"
                padding="0 1rem"
                color={Theme.textLight}
                colorBg={Theme.cancel}
                height="3rem"
                text="Clear Fields"
              />
            </FormGroup>
          </Form>
        </FormContainer>

        <EquityUpdateModal
          equity={this.state.equityEdit}
          onUpdate={this.handleUpdate}
          onDelete={this.handleDelete} // works
          onCancel={this.toggleModal} // works
          modalStatus={this.state.isModalOpen} // works
        />
      </Container>
    );
  }
}

export default WishList;
