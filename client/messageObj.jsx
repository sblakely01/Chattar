import React from 'react';

class messageObj extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.words}
      </div>
    )
  }
}