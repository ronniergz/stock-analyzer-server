import React, {Component} from 'react';
import Equity from './EquityComponent';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.8rem;
  @media (min-width: 600px) {
    font-size: 1rem;
`;

const Table = styled.div`
  display: table;
  width: 90%;
  margin: 0 auto;
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

class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      watchlist: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const input = event.target;
    this.setState({[input.name]: input.value});
  };

  handleSubmit = (values) => {
    console.log('Form Submitted!');
    this.setState((state) => {
      const list = state.watchList.concat(state.value);
    });
  };

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
        <div>
          <form onSubmit={(values) => this.handleSubmit(values)}>
            <input type="text" name="symbol" value={this.state.value.symbol} onChange={this.handleChange} />
            <input type="number" name="growth" step=".01" value={this.state.value.growth} onChange={this.handleChange} />
            <input type="number" name="futpe" step=".1" value={this.state.value.futpe} onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </Container>
    );
  }
}

export default WishList;
