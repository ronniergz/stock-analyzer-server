import React, {Component} from 'react';

const Heading = styled.div`
  display: inline;
  &:hover {
    cursor: pointer;
  }
`;

class TableHeading extends Component {
  constructor(props) {
    super(props);

    this.state = {sortDirection: ''};

    this.handleClear = this.handleClear.bind(this);
  }

  handleClick() {
    if ((this.state.sortDirection = 'asc')) {
      // sort descending
      this.setState({sortDirection: 'desc'});
    }
  }

  render() {
    return (
      <Heading onClick={this.handleClick}>
        {this.props.name}
        <FontAwesomeIcon icon={faCaretUp} />
      </Heading>
    );
  }
}

export default TableHeading;
