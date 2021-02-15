import React, {Component} from 'react';
import styled from 'styled-components';
import FormButton from './FormButtonComponent';
import {device} from './device';
import {Theme} from './theme';

const TableRow = styled.div`
  display: table-row;
  height: 3rem;
  background-color: ${(props) => (props.index % 2 === 0 ? Theme.light : 'white')};
`;

const TableCell = styled.div`
  text-align: right;
  display: table-cell;
  padding: 3px 10px;
  border-bottom: 1px solid #999999;
  width: 25%;
  @media ${device.mobileL} {
    font-size: 0.9rem;
  }
  @media ${device.laptop} {
    font-size: 1.1rem;
  }
`;

const TableCellLeft = styled(TableCell)`
  text-align: left;
  width: 15%;
  @media ${device.tablet} {
    border-left: 1px solid #999999;
  }
`;

const TableCellRight = styled(TableCell)`
  width: 15%;
  @media ${device.tablet} {
    border-right: 1px solid #999999;
  }
`;

const SymbolSection = styled.div`
  max-width: 75px;
  margin-right: auto;
`;

const Symbol = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  @media ${device.mobileL} {
    font-size: 0.9rem;
  }
`;

const DataSection = styled.div`
  max-width: 150px;
  margin-left: auto;
`;

const DataLabelGroup = styled.div`
  float: left;
  text-align: left;
`;

const DataLabel = styled.div`
  font-size: 0.6rem;
  @media ${device.mobileL} {
    font-size: 0.7rem;
  }
`;

const Data = styled.div`
  font-size: 0.6rem;
  @media ${device.mobileL} {
    font-size: 0.7rem;
  }
`;

const DataLarge = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  @media ${device.mobileL} {
    font-size: 0.9rem;
  }
`;

const DataMOS = styled(DataLarge)`
  color: ${(props) => (props.mos < 100 ? 'green' : 'red')};
`;

class Equity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      price: '',
      eps: '',
      pe: '',
      futPe: '',
      growth: '',
      sticker: '',
      mos: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.getData = this.getData.bind(this);
    this.getMos = this.getMos.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {symbol: props.symbol.toUpperCase(), futPe: props.futPe, growth: props.growth};
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  getMos() {
    // calculates margin of safety and updates state object
    let x = 1 + parseFloat(this.state.growth) / 100;
    let futEps = this.state.eps * Math.pow(x, 10);
    let stickerPrice = ((futEps * this.state.futPe) / 4).toFixed(2);
    let Mos = ((this.state.price / stickerPrice) * 100).toFixed(2);
    this.setState({
      sticker: stickerPrice,
      mos: Mos,
    });
  }

  getData() {   
    // request current scraped data from server: 
    fetch('http://localhost:5000/api/scrape?symbol=' + this.state.symbol, {
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then((data) => {
          this.setState({
            price: data.Price,
            eps: data.EPS,
            pe: data.PE,
          });
          this.getMos();
        });
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    return (
      <TableRow index={this.props.index}>
        <TableCellLeft>
          <SymbolSection>
            <Symbol>{this.state.symbol}</Symbol>
            <FormButton
              type="button"
              color={Theme.textLight}
              colorBg={Theme.cancel}
              margin="0.5rem 0 0 auto"
              height="0.9rem"
              width="1.8rem"
              fontSize="0.5rem"
              onClick={this.props.edit}
              text="Edit"
            />
          </SymbolSection>
        </TableCellLeft>
        <TableCell>
          <DataSection>
            <DataLabelGroup>
              <DataLabel>P/E:</DataLabel>
              <DataLabel>EPS:</DataLabel>
              <DataLabel>Growth:</DataLabel>
            </DataLabelGroup>
            <div>
              <Data>{this.state.pe}</Data>
              <Data>{this.state.eps}</Data>
              <Data>{this.state.growth}%</Data>
            </div>
          </DataSection>
        </TableCell>
        <TableCell>
          <DataLarge>${this.state.price}</DataLarge>
          <Data>Sticker: ${this.state.sticker}</Data>
        </TableCell>
        <TableCellRight>
          <DataMOS mos={this.state.mos}>{this.state.mos}%</DataMOS>
        </TableCellRight>
      </TableRow>
    );
  }
}

export default Equity;
